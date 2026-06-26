import Link from "next/link";

export default function DeliveryPage() {
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
          <p className="font-black uppercase tracking-[0.25em] text-[#0f9f8f]">Digital delivery</p>
          <h1 className="mt-4 text-6xl font-black">Delivery Policy</h1>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              ["01", "Enter email", "Use the correct email before checkout."],
              ["02", "Pay securely", "Payment is processed through Paddle Payments."],
              ["03", "Confirmation", "After payment, your order is confirmed."],
              ["04", "Receive files", "Digital product is sent to your email."],
            ].map(([n, t, d]) => (
              <div key={n} className="rounded-[22px] bg-[#eafff6] p-6">
                <p className="text-4xl font-black text-[#0f9f8f]">{n}</p>
                <h3 className="mt-4 text-2xl font-black">{t}</h3>
                <p className="mt-3 leading-7 text-black/60">{d}</p>
              </div>
            ))}
          </div>

          <Link href="/contact" className="mt-10 inline-block rounded-2xl bg-[#f9735b] px-8 py-4 font-black text-white">
            Need help?
          </Link>
        </div>
      </section>
    </main>
  );
}