export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Product = {
  id: string;
  name: string;
  price: string;
  priceId: string;
};

type SiteConfig = {
  id: "desk2" | "desk3";
  label: string;
  domain: string;
  siteUrl: string;
  apiKey: string;
  products: Product[];
};

type LinkSession = {
  siteId?: SiteConfig["id"];
  productId?: string;
  email?: string;
  country?: string;
  step: "site" | "product" | "email" | "country" | "postal";
};

const linkSessions = new Map<string, LinkSession>();
let commandsConfigured = false;
const TELEGRAM_TIMEOUT_MS = 2500;

const HOLYTIME_PRODUCTS: Product[] = [
  { id: "product161", name: "Professional Learning Pack", price: "161 EUR", priceId: "pri_01ksg1ychgaeytf7yfftmrs99r" },
  { id: "product199", name: "Elite Learning Pack", price: "199 EUR", priceId: "pri_01ksg1v9wq5gv0fkekpnk1r3sy" },
  { id: "starter", name: "Starter Learning Pack", price: "219 EUR", priceId: "pri_01kqstdk4f4h6xm4nf0eqjqhms" },
  { id: "product245", name: "Ultimate Learning Pack", price: "245 EUR", priceId: "pri_01ksg4aqbr9743eq2ez4fday8g" },
  { id: "product159", name: "Essential Learning Pack", price: "249 EUR", priceId: "pri_01ksg242d7grz69xsaf7999hd5" },
  { id: "advanced", name: "Advanced Learning Pack", price: "250 EUR", priceId: "pri_01kqstetc9k2t3jnpm7py0r4pt" },
  { id: "product255", name: "Master Resource Pack", price: "255 EUR", priceId: "pri_01ksg4fk56b63x123tnqegtr9q" },
  { id: "premium", name: "Premium Resource Bundle", price: "500 EUR", priceId: "pri_01ktrx34ezebz7kw9jgdgqyz9w" },
];

const JOLLIES_PRODUCTS: Product[] = [
  { id: "product161", name: "Focus Method Kit", price: "161 EUR", priceId: "pri_01kw95x7spfj4pr7y1wedehjy3" },
  { id: "product199", name: "Market Notes Studio", price: "199 EUR", priceId: "pri_01kw95x89njakzc8qjj7j1qq24" },
  { id: "starter", name: "Daily Study Starter", price: "219 EUR", priceId: "pri_01kw95x8rqyghfdb9wxzrajwmm" },
  { id: "product245", name: "Workflow Builder Pack", price: "245 EUR", priceId: "pri_01kw95x97txkercpypmgb5g2e0" },
  { id: "product159", name: "Core Resource Set", price: "249 EUR", priceId: "pri_01kw95x9r1tzwehmtcnh9vh9ye" },
  { id: "advanced", name: "Advanced Practice Vault", price: "250 EUR", priceId: "pri_01kw95xadsy7fxq0by8286w7j5" },
  { id: "product255", name: "Mastery Archive", price: "255 EUR", priceId: "pri_01kw95xawn9txaw0k4fsfxb766" },
  { id: "premium", name: "Complete Jollies Library", price: "500 EUR", priceId: "pri_01kw95xbcehntz9y5vcrw02nwa" },
];

function sites(): SiteConfig[] {
  return [
    {
      id: "desk2",
      label: "Desk 2 - holytime.dev",
      domain: "holytime.dev",
      siteUrl: (process.env.DESK2_SITE_URL || process.env.HOLYTIME_SITE_URL || "https://holytime.dev").replace(/\/+$/, ""),
      apiKey: process.env.PADDLE_DESK2_API_KEY || process.env.HOLYTIME_PADDLE_API_KEY || process.env.PADDLE_API_KEY || "",
      products: HOLYTIME_PRODUCTS,
    },
    {
      id: "desk3",
      label: "Desk 3 - jolliestime.space",
      domain: "jolliestime.space",
      siteUrl: (process.env.DESK3_SITE_URL || process.env.JOLLIESTIME_SITE_URL || "https://jolliestime.space").replace(/\/+$/, ""),
      apiKey: process.env.PADDLE_DESK3_API_KEY || process.env.JOLLIESTIME_PADDLE_API_KEY || process.env.PADDLE_API_KEY || "",
      products: JOLLIES_PRODUCTS,
    },
  ];
}

function getBotToken() {
  return (
    process.env.TELEGRAM_BOT_TOKEN ||
    process.env.TELEGRAM_DESK1_BOT_TOKEN ||
    process.env.TELEGRAM_DESK2_BOT_TOKEN ||
    process.env.TELEGRAM_DESK3_BOT_TOKEN ||
    ""
  );
}

function tg(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isEmail(value: unknown) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function normalizeCountry(value: unknown) {
  const country = String(value || "").trim().toUpperCase();
  return /^[A-Z]{2}$/.test(country) ? country : "";
}

function siteById(siteId: unknown) {
  return sites().find((site) => site.id === siteId);
}

function productById(site: SiteConfig, productId: unknown) {
  return site.products.find((product) => product.id === productId);
}

function mainMenuKeyboard() {
  return {
    inline_keyboard: [[{ text: "Create payment link", callback_data: "menu_create_link" }]],
  };
}

function siteKeyboard() {
  return {
    inline_keyboard: sites().map((site) => [
      { text: site.label, callback_data: `site:${site.id}` },
    ]),
  };
}

function productKeyboard(site: SiteConfig) {
  return {
    inline_keyboard: [
      ...site.products.map((product) => [
        { text: `${product.name} - ${product.price}`, callback_data: `product:${product.id}` },
      ]),
      [{ text: "Back to site choice", callback_data: "menu_create_link" }],
    ],
  };
}

function countryKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "Germany", callback_data: "country:DE" },
        { text: "Spain", callback_data: "country:ES" },
      ],
      [
        { text: "France", callback_data: "country:FR" },
        { text: "Italy", callback_data: "country:IT" },
      ],
      [
        { text: "Netherlands", callback_data: "country:NL" },
        { text: "United Kingdom", callback_data: "country:GB" },
      ],
      [
        { text: "United States", callback_data: "country:US" },
        { text: "Other country code", callback_data: "country:OTHER" },
      ],
    ],
  };
}

async function telegram(method: string, body: unknown) {
  const botToken = getBotToken();
  if (!botToken) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TELEGRAM_TIMEOUT_MS);

  try {
    return await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    console.error(`Telegram ${method} failed`, error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function quickTelegram(method: string, body: unknown) {
  const botToken = getBotToken();
  if (!botToken) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 900);

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch {
    // Callback acknowledgements are best-effort; the real menu is sent separately.
  } finally {
    clearTimeout(timeout);
  }
}

async function configureTelegramCommands() {
  if (commandsConfigured) return;
  commandsConfigured = true;

  await telegram("setMyCommands", {
    commands: [{ command: "start", description: "Open payment link menu" }],
  });
}

async function sendTelegram(chatId: string | number, text: string, replyMarkup?: unknown) {
  await telegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
  });
}

async function answerCallback(callbackId: string, text = "") {
  if (!callbackId) return;

  await quickTelegram("answerCallbackQuery", {
    callback_query_id: callbackId,
    text,
  });
}

async function paddlePost(apiKey: string, path: string, body: unknown) {
  const res = await fetch(`https://api.paddle.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error?.detail || data?.error?.message || `Paddle API error ${res.status}`);
  }

  return data;
}

async function createCustomerAddress(site: SiteConfig, email: string, country: string, postalCode: string) {
  if (!country) return {};

  const customer = await paddlePost(site.apiKey, "/customers", { email });
  const customerId = customer.data?.id;

  if (!customerId) throw new Error("Paddle customer was not created");

  const addressPayload: Record<string, string> = { country_code: country };
  if (postalCode) addressPayload.postal_code = postalCode;

  const address = await paddlePost(site.apiKey, `/customers/${customerId}/addresses`, addressPayload);
  const addressId = address.data?.id;

  if (!addressId) throw new Error("Paddle address was not created");

  return { customer_id: customerId, address_id: addressId };
}

async function createPaymentLink(input: {
  site: SiteConfig;
  product: Product;
  email: string;
  country: string;
  postalCode: string;
}) {
  if (!input.site.apiKey) throw new Error(`Missing Paddle API key for ${input.site.label}`);

  const customerAddress = await createCustomerAddress(
    input.site,
    input.email,
    input.country,
    input.postalCode,
  );
  const transaction = await paddlePost(input.site.apiKey, "/transactions", {
    items: [{ price_id: input.product.priceId, quantity: 1 }],
    ...(customerAddress.customer_id ? customerAddress : { customer: { email: input.email } }),
    custom_data: {
      productId: input.product.id,
      email: input.email,
      country: input.country || undefined,
      postalCode: input.postalCode || undefined,
      sourceDomain: input.site.domain,
      sourceDesk: input.site.id,
      createdBy: "telegram-bot",
    },
    checkout: {
      url: `${input.site.siteUrl}/checkout`,
    },
  });

  return {
    url: transaction.data?.checkout?.url,
    transactionId: transaction.data?.id,
  };
}

async function sendMenu(chatId: string | number) {
  await sendTelegram(
    chatId,
    `<b>Payment link menu</b>

Choose what to create. The customer will open the link from their own device, so Paddle will see the customer's real IP.`,
    mainMenuKeyboard(),
  );
}

async function sendLink(chatId: string | number, userId: string, postalCodeInput: string) {
  const session = linkSessions.get(userId);
  const site = siteById(session?.siteId);
  const product = site ? productById(site, session?.productId) : undefined;

  if (!session?.email || !session.country || !site || !product) {
    linkSessions.delete(userId);
    await sendTelegram(chatId, "Session expired. Start again from the menu.", mainMenuKeyboard());
    return;
  }

  const postalCode = postalCodeInput === "-" ? "" : postalCodeInput.trim().slice(0, 32);
  await sendTelegram(chatId, "Creating Paddle checkout link...");

  try {
    const result = await createPaymentLink({
      site,
      product,
      email: session.email,
      country: session.country,
      postalCode,
    });

    if (!result.url) throw new Error("Paddle did not return checkout URL");

    await sendTelegram(
      chatId,
      `<b>Payment link ready</b>

Site: <b>${tg(site.label)}</b>
Domain: <b>${tg(site.domain)}</b>
Product: <b>${tg(product.name)}</b>
Email: <b>${tg(session.email)}</b>
Country: <b>${tg(session.country)}</b>
ZIP: <b>${tg(postalCode || "not set")}</b>
Transaction: <code>${tg(result.transactionId || "unknown")}</code>

${tg(result.url)}`,
    );
  } catch (error) {
    await sendTelegram(chatId, `Could not create link: ${tg(error instanceof Error ? error.message : "unknown error")}`);
  } finally {
    linkSessions.delete(userId);
    await sendMenu(chatId);
  }
}

async function handleCallback(callback: any) {
  const callbackId = callback?.id;
  const data = String(callback?.data || "");
  const chatId = callback?.message?.chat?.id;
  const userId = String(callback?.from?.id || "");

  if (!chatId || !userId) return;

  await answerCallback(callbackId);

  if (data === "menu_create_link") {
    linkSessions.set(userId, { step: "site" });
    await sendTelegram(chatId, "Choose site / desk:", siteKeyboard());
    return;
  }

  if (data.startsWith("site:")) {
    const siteId = data.split(":")[1] as SiteConfig["id"];
    const site = siteById(siteId);

    if (!site) {
      await sendTelegram(chatId, "Unknown site. Start again.", mainMenuKeyboard());
      return;
    }

    linkSessions.set(userId, { siteId, step: "product" });
    await sendTelegram(chatId, `Selected: <b>${tg(site.label)}</b>\n\nChoose product:`, productKeyboard(site));
    return;
  }

  if (data.startsWith("product:")) {
    const session = linkSessions.get(userId);
    const site = siteById(session?.siteId);
    const product = site ? productById(site, data.split(":")[1]) : undefined;

    if (!session || !site || !product) {
      linkSessions.delete(userId);
      await sendTelegram(chatId, "Session expired. Start again.", mainMenuKeyboard());
      return;
    }

    linkSessions.set(userId, { ...session, productId: product.id, step: "email" });
    await sendTelegram(
      chatId,
      `Selected:
Site: <b>${tg(site.label)}</b>
Product: <b>${tg(product.name)} - ${tg(product.price)}</b>

Send customer email.`,
    );
    return;
  }

  if (data.startsWith("country:")) {
    const selected = data.split(":")[1];
    const session = linkSessions.get(userId);

    if (!session?.siteId || !session.productId || !session.email) {
      linkSessions.delete(userId);
      await sendTelegram(chatId, "Session expired. Start again.", mainMenuKeyboard());
      return;
    }

    if (selected === "OTHER") {
      linkSessions.set(userId, { ...session, step: "country" });
      await sendTelegram(chatId, "Send 2-letter country code, for example DE, ES, FR, NL.");
      return;
    }

    linkSessions.set(userId, { ...session, country: selected, step: "postal" });
    await sendTelegram(chatId, `Country: <b>${tg(selected)}</b>\n\nSend ZIP/postal code. If no ZIP, send <code>-</code>.`);
  }
}

async function handleText(chatId: string | number, chatType: string, userId: string, text: string) {
  const command = text.split(/\s+/)[0].split("@")[0].toLowerCase();

  if (command === "/start" || command === "/help" || text === "menu" || text === "Menu") {
    linkSessions.delete(userId);
    await sendMenu(chatId);
    return true;
  }

  if (command === "/cancel" || text.toLowerCase() === "cancel") {
    linkSessions.delete(userId);
    await sendTelegram(chatId, "Cancelled.", mainMenuKeyboard());
    return true;
  }

  if (command.startsWith("/") && command !== "/start" && command !== "/help" && command !== "/cancel") {
    await sendMenu(chatId);
    return true;
  }

  const session = linkSessions.get(userId);

  if (!session) {
    if (chatType === "private") {
      await sendMenu(chatId);
      return true;
    }

    return false;
  }

  if (session.step === "email") {
    if (!isEmail(text)) {
      await sendTelegram(chatId, "Email looks wrong. Send a valid customer email.");
      return true;
    }

    linkSessions.set(userId, { ...session, email: text, step: "country" });
    await sendTelegram(chatId, "Choose billing country for Paddle checkout:", countryKeyboard());
    return true;
  }

  if (session.step === "country") {
    const country = normalizeCountry(text);

    if (!country) {
      await sendTelegram(chatId, "Send a 2-letter country code, for example DE, ES, FR, NL.");
      return true;
    }

    linkSessions.set(userId, { ...session, country, step: "postal" });
    await sendTelegram(chatId, `Country: <b>${tg(country)}</b>\n\nSend ZIP/postal code. If no ZIP, send <code>-</code>.`);
    return true;
  }

  if (session.step === "postal") {
    await sendLink(chatId, userId, text);
    return true;
  }

  await sendMenu(chatId);
  return true;
}

export async function POST(req: Request) {
  const update = await req.json().catch(() => null);

  if (update?.callback_query) {
    await handleCallback(update.callback_query);
    return new Response("OK", { status: 200 });
  }

  const message = update?.message || update?.edited_message;
  const chatId = message?.chat?.id;
  const chatType = String(message?.chat?.type || "");
  const userId = String(message?.from?.id || chatId || "");
  const text = String(message?.text || "").trim();

  if (!chatId) {
    return new Response("OK", { status: 200 });
  }

  if (text === "/start" || text === "/help") {
    await configureTelegramCommands();
  }

  await handleText(chatId, chatType, userId, text);

  return new Response("OK", { status: 200 });
}
