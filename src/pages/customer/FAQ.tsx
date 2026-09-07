import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How long does standard delivery take?",
    a: "Orders are dispatched from our fulfillment hubs within 24 hours. Metro deliveries typically arrive within 2-3 business days, and rest of India within 4-5 business days. You will receive an SMS and WhatsApp tracking link as soon as your order ships.",
  },
  {
    q: "How does the 7-Day Easy Return policy work?",
    a: "If an item doesn't fit or meet your expectations, simply initiate a return from your Account order history or contact our support team. We schedule a free door-step pickup, and refunds are credited back to your original payment method or UPI within 48 hours of inspection.",
  },
  {
    q: "Are all products 100% authentic with warranty?",
    a: "Yes, 100%. All products sold on E-Shopify are sourced directly from authorized brand manufacturers and come backed with our 2-Year Comprehensive Brand Warranty against any manufacturing defects.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major payment modes via Razorpay including UPI (Google Pay, PhonePe, Paytm), Debit & Credit Cards (Visa, Mastercard, RuPay, Amex), Net Banking across 50+ banks, and Store Reward Points.",
  },
  {
    q: "How do I apply a discount coupon?",
    a: "You can copy any active coupon from our homepage (e.g. WELCOME20) and paste it into the 'Discount Coupon' box in your cart drawer or checkout screen before proceeding to payment.",
  },
];

export function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <section className="bg-[#09090b] text-white py-14 border-b border-white/10 text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Help Center</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-white">Frequently Asked Questions</h1>
          <p className="text-sm text-neutral-300">Quick answers to common questions about orders, shipping, and returns.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-base text-foreground hover:bg-neutral-50 transition gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`h-5 w-5 text-primary shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen ? (
                <div className="p-5 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                  {faq.a}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FAQPage;
