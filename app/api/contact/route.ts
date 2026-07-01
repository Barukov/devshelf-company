import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sendDesk1TelegramMessage, tg } from "../../lib/telegram";

const resend = new Resend(process.env.RESEND_API_KEY!);
const SUPPORT_EMAIL = "support@devshelf.company";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await sendDesk1TelegramMessage("<b>New DevShelf support request</b>\n\n<b>Name:</b> " + tg(name) + "\n<b>Email:</b> " + tg(email) + "\n\n<b>Message:</b>\n" + tg(message));

    await resend.emails.send({
      from: "DevShelf Academy <support@devshelf.company>",
      to: SUPPORT_EMAIL,
      subject: "New support request - DevShelf Academy",
      html: "<h2>New support request</h2><p><strong>Name:</strong> " + name + "</p><p><strong>Email:</strong> " + email + "</p><p><strong>Message:</strong></p><p>" + message + "</p>",
    });

    await resend.emails.send({
      from: "DevShelf Academy <support@devshelf.company>",
      to: email,
      subject: "We received your DevShelf message",
      html: "<p>Hi,</p><p>Thank you for contacting <strong>DevShelf Academy Support</strong>.</p><p>Your message has been received. We usually respond within 24-48 hours.</p><p>If your request is related to a purchase, please include the email used during checkout.</p><p>- <strong>DevShelf Academy Support</strong></p>",
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
