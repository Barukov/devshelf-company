"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "./lib/products";

const faqs = [
  ["What is DevShelf Academy?", "A digital library for programming study files, PDF course packs, C# resources, .NET notes and practical learning materials."],
  ["How do I receive files?", "After successful Paddle payment, the download link is sent to the email used during checkout."],
  ["Are products physical?", "No. All products are digital PDF/course resources. Nothing is shipped by post."],
  ["Can I request support?", "Yes. Use the contact page and include the email used at checkout so we can find your order."],
];

export default function Page() {
  const [open, setOpen] = useState<number | null>(0);
  const featured = products.find((product) => product.slug === "complete-devshelf-library") || products[0];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f6f4ec] text-[#16130f]">
      <section className="relative bg-[#11100d] text-white">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6ff5f] to-transparent" />
        <div className="absolute left-[8%] top-24 h-72 w-72 rounded-full bg-[#d6ff5f]/15 blur-[100px]" />
        <div className="absolute bottom-0 right-[6%] h-80 w-80 rounded-full bg-[#58c7ff]/15 blur-[110px]" />

        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-7 md:px-8">
          <Link href="/" className="text-2xl font-black tracking-tight md:text-3xl">DevShelf Academy</Link>
          <nav className="hidden items-center gap-7 text-sm font-bold text-white/75 md:flex">
            <a href="#catalog">Catalog</a>
            <Link href="/pricing">Pricing</Link>
            <Link href="/delivery">Delivery</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/refund-policy">Refunds</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <a href="#catalog" className="rounded-full bg-[#d6ff5f] px-6 py-3 font-black text-black transition hover:-translate-y-0.5">Browse files</a>
        </header>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-16 md:px-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="animate-rise">
            <p className="mb-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-[#d6ff5f]">PDF books, course files and programming resources</p>
            <h1 className="max-w-4xl text-6xl font-black leading-[0.92] md:text-8xl">Build your programming shelf.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">Curated digital packs for C#, .NET, ASP.NET Core and software engineering practice. Clean files, direct delivery, and study resources made for repeat use.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#catalog" className="rounded-full bg-[#d6ff5f] px-8 py-4 font-black text-black transition hover:-translate-y-1">View catalog</a>
              <Link href={"/product/" + featured.slug} className="rounded-full border border-white/20 px-8 py-4 font-black text-white transition hover:bg-white/10">Open complete bundle</Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 text-center text-sm font-bold text-white/70">
              {[["8", "digital packs"], ["PDF", "instant access"], ["Paddle", "secure checkout"]].map(([n, t]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/[.06] p-4">
                  <p className="text-3xl font-black text-[#d6ff5f]">{n}</p>
                  <p className="mt-1">{t}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-float rounded-[2rem] border border-white/12 bg-[#1d1b17] p-5 shadow-2xl">
            <div className="rounded-[1.5rem] bg-[#f6f4ec] p-5 text-[#16130f]">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-[#607000]">Featured library</p>
                <p className="rounded-full bg-black px-4 py-2 text-sm font-black text-white">{featured.price}</p>
              </div>
              <h2 className="mt-6 text-4xl font-black">{featured.name}</h2>
              <p className="mt-4 leading-7 text-black/60">{featured.shortDescription}</p>
              <div className="mt-7 grid gap-3">
                {featured.includes.map((item) => <div key={item} className="rounded-2xl bg-white px-4 py-3 font-bold shadow-sm">{item}</div>)}
              </div>
              <Link href={"/product/" + featured.slug} className="mt-7 block rounded-2xl bg-[#11100d] px-6 py-4 text-center font-black text-white">View product</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f4ec] px-6 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[["01", "Choose a pack", "Pick a focused programming pack or the full DevShelf library."], ["02", "Pay securely", "Checkout is handled by Paddle with card and supported payment methods."], ["03", "Receive files", "A download link is sent to the checkout email after payment confirmation."]].map(([n, title, text]) => (
            <div key={n} className="rounded-[1.75rem] bg-white p-7 shadow-[0_18px_55px_rgba(22,19,15,.08)]">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#607000]">{n}</p>
              <h3 className="mt-4 text-2xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-black/58">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="catalog" className="bg-[#ede8dc] px-6 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-black uppercase tracking-[0.28em] text-[#607000]">Catalog</p>
              <h2 className="mt-3 text-5xl font-black md:text-6xl">Programming files and courses</h2>
            </div>
            <Link href="/pricing" className="border-b-4 border-[#d6ff5f] pb-2 font-black">View all pricing</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product, index) => (
              <Link key={product.slug} href={"/product/" + product.slug} className={"group flex min-h-[430px] flex-col rounded-[1.6rem] border p-7 shadow-[0_20px_60px_rgba(22,19,15,.08)] transition duration-300 hover:-translate-y-2 " + (index === 1 ? "border-[#11100d] bg-[#11100d] text-white" : "border-black/8 bg-[#fffdf8]")}>
                <p className={"text-xs font-black uppercase tracking-[0.28em] " + (index === 1 ? "text-[#d6ff5f]" : "text-[#607000]")}>{product.tag}</p>
                <h3 className="mt-5 text-3xl font-black leading-tight">{product.name}</h3>
                <p className={"mt-5 leading-7 " + (index === 1 ? "text-white/66" : "text-black/58")}>{product.shortDescription}</p>
                <div className="mt-auto">
                  <p className="text-5xl font-black">{product.price.replace("?", "")} EUR</p>
                  <div className={"mt-7 rounded-full px-6 py-4 text-center font-black transition group-hover:scale-[1.02] " + (index === 1 ? "bg-[#d6ff5f] text-black" : "bg-[#11100d] text-white")}>View product</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f4ec] px-6 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="font-black uppercase tracking-[0.28em] text-[#607000]">FAQ</p>
            <h2 className="mt-3 text-5xl font-black">Questions before checkout</h2>
            <Link href="/contact" className="mt-8 inline-block rounded-full bg-[#11100d] px-8 py-4 font-black text-white">Contact support</Link>
          </div>
          <div className="space-y-4">
            {faqs.map(([q, a], index) => (
              <div key={q} className="rounded-[1.4rem] bg-white shadow-sm">
                <button onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left text-xl font-black">{q}<span>{open === index ? "-" : "+"}</span></button>
                {open === index && <p className="px-7 pb-6 leading-7 text-black/60">{a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#11100d] px-6 py-10 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 text-sm text-white/60">
          <p>? DevShelf Academy ? Digital programming products</p>
          <div className="flex flex-wrap gap-5">
            <Link href="/pricing">Pricing</Link><Link href="/delivery">Delivery</Link><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/refund-policy">Refund</Link><Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{"@keyframes rise{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}.animate-rise{animation:rise .75s ease-out both}.animate-float{animation:float 5s ease-in-out infinite}"}</style>
    </main>
  );
}
