export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-[#09090b] text-white py-14 border-b border-white/10 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Compliance & Security</p>
          <h1 className="text-3xl font-black sm:text-5xl text-white">Privacy Policy</h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">1. Information Collection & Usage</h2>
          <p>
            E-Shopify collects personal identification information (Name, Email, Delivery Address, and Phone Number) solely for order fulfillment, customer support, and shipment updates. We do not sell or monetize personal data to third parties.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">2. Payment Security & Encryption</h2>
          <p>
            All financial transactions are handled securely through PCI-DSS Level 1 certified payment gateways (Razorpay). Your credit/debit card numbers or UPI PINs are never stored on our servers.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">3. User Rights & Data Protection</h2>
          <p>
            You have the right to access, update, or request the deletion of your personal data at any time via your user account settings or by contacting our Data Protection Officer.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
