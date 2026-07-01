"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { productMap } from "../../lib/products";

const faq = [
  ["What do I receive?", "You receive the digital PDF/course pack connected to this product."],
  ["How is it delivered?", "Delivery is sent by email after Paddle confirms the payment."],
  ["Is this a physical product?", "No. DevShelf Academy sells digital files only."],
  ["Can I request help?", "Yes. Contact support with your checkout email and transaction details."],
];

export default function ProductPage() {
  const { slug } = useParams();
  const product = productMap[String(slug)];
  const [cart, setCart] = useState(false);
  const [email, setEmail] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);

  if (!product) return <main className="p-10">Product not found</main>;

  const canPay = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePayment = async () => {
    if (!canPay || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId: product.slug }),
      });
      const data = await res.json();
      if (!data.checkoutUrl) {
        alert("Payment error");
        return;
      }
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error(error);
      alert("Payment error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f4ec] pb-24 text-[#16130f]">
      <section className="bg-[#11100d] px-6 py-7 text-white md:px-8">
        <header className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-2xl font-black md:text-3xl">DevShelf Academy</Link>
          <button onClick={() => setCart(true)} className="rounded-full bg-[#d6ff5f] px-6 py-3 font-black text-black">Add to cart</button>
        </header>
        <div className="mx-auto grid max-w-7xl gap-12 py-20 lg:grid-cols-[1fr_.85fr]">
          <div>
            <p className="font-black uppercase tracking-[0.28em] text-[#d6ff5f]">{product.tag}</p>
            <h1 className="mt-5 max-w-4xl text-6xl font-black leading-[.95] md:text-7xl">{product.name}</h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-white/70">{product.description}</p>
            <p className="mt-8 text-6xl font-black text-[#d6ff5f]">{product.price}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => setCart(true)} className="rounded-full bg-[#d6ff5f] px-9 py-4 font-black text-black">Buy now</button>
              <a href="#details" className="rounded-full border border-white/20 px-9 py-4 font-black text-white">View details</a>
            </div>
          </div>
          <div className="rounded-[2rem] bg-[#f6f4ec] p-6 text-[#16130f] shadow-2xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#607000]">Inside this pack</p>
            <div className="mt-7 grid gap-3">
              {product.includes.map((item) => <div key={item} className="rounded-2xl bg-white p-4 font-bold shadow-sm">{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="details" className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <h2 className="text-5xl font-black">Product details</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {product.includes.map((item) => <div key={item} className="rounded-[1.4rem] bg-white p-6 font-bold shadow-sm">? {item}</div>)}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 md:px-8">
        <h2 className="text-5xl font-black">FAQ</h2>
        <div className="mt-8 space-y-4">
          {faq.map(([q, a], index) => (
            <div key={q} className="rounded-[1.4rem] bg-white">
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full justify-between px-7 py-6 text-left text-xl font-black"><span>{q}</span><span>{openFaq === index ? "-" : "+"}</span></button>
              {openFaq === index && <p className="px-7 pb-6 leading-7 text-black/60">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      {cart && (
        <div className="fixed inset-0 z-50 flex">
          <div onClick={() => setCart(false)} className="flex-1 bg-black/55" />
          <aside className="flex h-full w-[430px] max-w-full flex-col bg-[#fffdf8] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4"><h3 className="text-2xl font-black">Your order</h3><button onClick={() => setCart(false)} className="text-xl">?</button></div>
            <div className="mt-6"><p className="font-black">{product.name}</p><p className="text-sm text-black/60">Digital download</p><p className="mt-2 text-2xl font-black">{product.price}</p></div>
            <div className="mt-8"><p className="mb-2 text-sm font-bold">Delivery email</p><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#11100d]" /></div>
            <button onClick={handlePayment} disabled={!canPay || loading} className={"mt-auto rounded-xl py-4 font-black " + (canPay ? "bg-[#11100d] text-white" : "bg-black/10 text-black/40")}>{loading ? "Opening checkout..." : canPay ? "Proceed to payment" : "Enter email first"}</button>
            <p className="mt-4 text-center text-xs text-black/45">Secure checkout powered by Paddle</p>
          </aside>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t bg-white p-4">
        <div><p className="font-bold">{product.name}</p><p className="text-black/60">{product.price}</p></div>
        <button onClick={() => setCart(true)} className="rounded-xl bg-[#11100d] px-6 py-3 font-bold text-white">Buy now</button>
      </div>
    </main>
  );
}
