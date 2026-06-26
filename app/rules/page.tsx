import Link from "next/link";

export default function RulesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-[#eafff6] via-white to-[#fff2e8] text-[#071b18]">
      <header className="bg-[#082f2a] px-8 py-8 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-3xl font-black">HOLYTIME</Link>
          <Link href="/" className="rounded-full bg-[#f9735b] px-7 py-3 font-bold">Back home</Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-8 py-24">
        <div className="rounded-[34px] bg-white p-10 shadow-2xl">
          <p className="font-black uppercase tracking-[0.25em] text-[#0f9f8f]">Store rules</p>
          <h1 className="mt-4 text-6xl font-black">Rules</h1>

          <div className="mt-10 space-y-5">
            {[
              "Products are digital and delivered by email.",
              "Enter the correct email before payment.",
              "Do not share or resell purchased files.",
              "Refunds are not available after delivery.",
              "For delivery issues, contact support.",
            ].map((x) => (
              <div key={x} className="rounded-[20px] bg-[#eafff6] p-5 text-lg font-bold">
                ✓ {x}
              </div>
            ))}
          </div>

          <Link href="/contact" className="mt-10 inline-block rounded-2xl bg-[#f9735b] px-8 py-4 font-black text-white">
            Contact support
          </Link>
        </div>
      </section>
    </main>
  );
}