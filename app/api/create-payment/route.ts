import { NextResponse } from "next/server";
import { productMap } from "../../lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, productId } = await req.json();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
    const product = productMap[String(productId)];

    if (!validEmail || !product) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const apiKey = process.env.PADDLE_API_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

    if (!apiKey || !siteUrl) {
      return NextResponse.json({ error: "Missing env" }, { status: 500 });
    }

    const sourceDomain = new URL(siteUrl).host;

    const res = await fetch("https://api.paddle.com/transactions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ price_id: product.priceId, quantity: 1 }],
        customer: { email },
        custom_data: {
          brand: "devshelf",
          productId: product.slug,
          productName: product.name,
          email,
          sourceDomain,
        },
        checkout: { url: siteUrl + "/checkout" },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Paddle error:", data);
      return NextResponse.json({ error: "Paddle failed", details: data }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl: data.data.checkout.url });
  } catch (error) {
    console.error("Paddle checkout error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
