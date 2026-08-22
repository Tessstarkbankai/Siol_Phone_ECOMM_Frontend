import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Headphones,
  Mail,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = useState("");

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing to our exclusive VIP updates!");
    setEmail("");
  }

  return (
    <footer className="bg-[#f8fafc] text-neutral-900 border-t border-neutral-200 mt-20">
      {/* 4-Pillar Trust Strip */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">Free Express Delivery</p>
                <p className="text-xs text-neutral-500">On all orders above ₹999</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">7-Day Easy Returns</p>
                <p className="text-xs text-neutral-500">Hassle-free instant pickup</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">100% Genuine Certified</p>
                <p className="text-xs text-neutral-500">2-Year direct brand warranty</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Headphones className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900">Dedicated Support</p>
                <p className="text-xs text-neutral-500">Mon-Sat 9AM - 8PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links Area */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-primary uppercase">
                WONDERCHEF<span className="text-neutral-900">.</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-600 max-w-sm leading-relaxed">
              India's premium cookware and kitchen appliances brand. Built with German design standards, Italian engineering, and chef-curated precision.
            </p>
            <div className="pt-2">
              <span className="inline-block rounded-lg bg-white border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-700">
                🔒 PCI-DSS Compliant • 256-Bit SSL Encrypted
              </span>
            </div>
          </div>

          {/* Column 1: Shop Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link to="/collections" className="hover:text-primary transition">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/collections?sort=recent" className="hover:text-primary transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections?sort=price-low" className="hover:text-primary transition">
                  Special Offers & Deals
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-primary transition">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Help & Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-primary transition">
                  Shipping & Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-primary transition">
                  7-Day Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: VIP Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Stay In The Loop
            </h4>
            <p className="text-xs text-neutral-500">
              Subscribe to get 15% OFF your first order and exclusive access to festive flash sales.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-neutral-300 text-neutral-900 text-xs h-9 rounded-lg placeholder:text-neutral-400 focus-visible:ring-primary"
              />
              <Button type="submit" size="sm" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-9 text-xs rounded-lg">
                Join VIP Club
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Legal & Payment Badges */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500">
          <p>© 2026 WONDERCHEF INDIA. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-neutral-900 transition">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-neutral-900 transition">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="/shipping-policy" className="hover:text-neutral-900 transition">
              Shipping Policy
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded bg-white border border-neutral-300 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
              UPI
            </span>
            <span className="rounded bg-white border border-neutral-300 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
              VISA
            </span>
            <span className="rounded bg-white border border-neutral-300 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
              Mastercard
            </span>
            <span className="rounded bg-white border border-neutral-300 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
              RuPay
            </span>
            <span className="rounded bg-white border border-neutral-300 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
              Razorpay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
