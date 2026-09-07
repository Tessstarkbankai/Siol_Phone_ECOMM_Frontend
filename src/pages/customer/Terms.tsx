export function TermsPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-[#09090b] text-white py-14 border-b border-white/10 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Legal Terms</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-white">Terms of Service</h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing and purchasing from the E-Shopify storefront, you agree to comply with and be bound by these Terms and Conditions and all applicable laws and regulations of India.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">2. Pricing, Orders & Invoicing</h2>
          <p>
            All listed prices are inclusive of applicable GST. We reserve the right to refuse or cancel any order in the event of unforeseen inventory shortages or inadvertent technical pricing inaccuracies.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">3. Governing Jurisdiction</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of India, with exclusive jurisdiction resting with the competent courts of New Delhi/Gurugram.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
