export function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-[#09090b] text-white py-14 border-b border-white/10 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Hassle-Free Returns</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-white">Return & Refund Policy</h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">1. 7-Day Doorstep Return & Exchange Guarantee</h2>
          <p>
            Customer satisfaction is our utmost priority. You may initiate a return or size exchange within <strong>7 days</strong> of delivery. Items must be in their original unworn condition with all product tags, certificates, and original packaging intact.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">2. Complimentary Reverse Pickup</h2>
          <p>
            Once a return is requested from your user account, our logistics partner will arrange a contactless pickup from your doorstep at zero extra cost within 24 to 48 hours.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">3. Instant Refund Processing</h2>
          <p>
            Refunds are initiated immediately upon our quality inspection team receiving the item at our warehouse. For prepaid orders (UPI / Cards / Net Banking), funds reflect in your account within 24–48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReturnPolicyPage;
