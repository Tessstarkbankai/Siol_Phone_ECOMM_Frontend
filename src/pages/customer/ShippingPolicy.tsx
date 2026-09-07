export function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-[#09090b] text-white py-14 border-b border-white/10 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Delivery Information</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-white">Shipping & Delivery Policy</h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">1. Nationwide Dispatch & Delivery Timelines</h2>
          <p>
            All verified orders are processed and dispatched within 24–48 business hours from our temperature-controlled central warehouses. Standard transit timelines are:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li><strong>Tier 1 / Metro Cities (Delhi, Mumbai, Bengaluru, etc.):</strong> 2 to 3 business days.</li>
            <li><strong>Tier 2 & Tier 3 Cities:</strong> 3 to 5 business days.</li>
            <li><strong>Remote Locations & North-East / Island regions:</strong> 5 to 7 business days.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">2. Free Shipping Eligibility</h2>
          <p>
            We offer complimentary <strong>Free Express Shipping</strong> across all pin codes in India on every order valued at ₹999 or higher. For orders below ₹999, a nominal shipping fee of ₹99 applies.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">3. Real-Time Shipment Tracking</h2>
          <p>
            As soon as your package is handed over to our verified courier partners (BlueDart, Delhivery, ExpressBees), you will receive an SMS and Email containing your unique AWB tracking number and direct live tracking link.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShippingPolicyPage;
