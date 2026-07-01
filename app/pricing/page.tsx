import Link from "next/link";
import { products } from "../lib/products";

const deliverables = [
  "PDF course files",
  "Programming notes",
  "C# and .NET resources",
  "Practice exercises",
  "Study checklists",
  "Download link by email",
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ec] text-[#16130f]">
      <header className="bg-[#11100d] px-6 py-7 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-2xl font-black md:text-3xl">DevShelf Academy</Link>
          <Link href="/" className="rounded-full bg-[#d6ff5f] px-6 py-3 font-black text-black">Back home</Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8">
        <p className="font-black uppercase tracking-[0.28em] text-[#607000]">Pricing</p>
        <h1 className="mt-4 max-w-4xl text-6xl font-black leading-tight">Digital programming packs</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-black/60">DevShelf Academy sells downloadable PDF books, course files and programming resources through https://devshelf.company/. All products are digital and delivered by email after successful payment confirmation.</p>
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <Link key={product.slug} href={"/product/" + product.slug} className="flex min-h-[370px] flex-col rounded-[1.5rem] bg-white p-7 shadow-[0_18px_55px_rgba(22,19,15,.08)] transition hover:-translate-y-2">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#607000]">{product.tag}</p>
              <h2 className="mt-5 text-3xl font-black leading-tight">{product.name}</h2>
              <p className="mt-5 leading-7 text-black/60">{product.shortDescription}</p>
              <p className="mt-auto text-5xl font-black">{product.price.replace("?", "")} EUR</p>
              <div className="mt-7 rounded-full bg-[#11100d] px-6 py-4 text-center font-black text-white">View product</div>
            </Link>
          ))}
        </div>
        <div className="mt-16 rounded-[2rem] bg-[#11100d] p-8 text-white">
          <h2 className="text-4xl font-black">Included across the catalog</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => <div key={item} className="rounded-2xl bg-white/8 p-5 font-bold text-white/80">{item}</div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
