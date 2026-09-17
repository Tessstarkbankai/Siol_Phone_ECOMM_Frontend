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
import { isMultiVendorEnabled, isDistributorProgramEnabled } from "@/config/features";

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
    <footer className="bg-[#f8fafc] text-neutral-900 border-t border-neutral-200 mt-4 sm:mt-6">
      {/* Visual Trust Banner with footer.png */}
      <div className="relative w-full overflow-hidden border-b border-neutral-200 bg-[#cdd5e7]">
        <div className="relative mx-auto max-w-7xl">

          {/* ===== MOBILE LAYOUT (< sm): Stacked — Trust cards on top, Image below ===== */}
          <div className="block sm:hidden">
            {/* Trust Points Grid */}
            <div className="px-4 pt-6 pb-4">
              <div className="grid grid-cols-2 gap-2">
                {/* 1. Express Insured Transit */}
                <div className="flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur-md px-3 py-2.5 border border-white/70 shadow-xs">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900/10 text-slate-800">
                    <Truck className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">Express Insured Transit</p>
                  </div>
                </div>

                {/* 2. 7-Day Replacement */}
                <div className="flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur-md px-3 py-2.5 border border-white/70 shadow-xs">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900/10 text-slate-800">
                    <RotateCcw className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">7-Day Replacement</p>
                    <p className="text-[9px] text-slate-600 leading-tight">Doorstep exchange</p>
                  </div>
                </div>

                {/* 3. Official Brand Sealed */}
                <div className="flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur-md px-3 py-2.5 border border-white/70 shadow-xs">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900/10 text-slate-800">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">Official Brand Sealed</p>
                  </div>
                </div>

                {/* 4. Device setup & live support */}
                <div className="flex items-center gap-2 rounded-xl bg-white/80 backdrop-blur-md px-3 py-2.5 border border-white/70 shadow-xs">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900/10 text-slate-800">
                    <Headphones className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-900 leading-tight">Device setup & support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Fleet Image — natural wide aspect ratio */}
            <div className="w-full">
              <img
                src="/footer.png"
                alt="SiOL Flagship Fleet"
                className="w-full h-auto object-contain select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* ===== DESKTOP LAYOUT (sm+): Image with overlay trust cards ===== */}
          <div className="hidden sm:block">
            <div className="relative aspect-[2148/732] min-h-[280px] md:min-h-[320px] w-full flex items-center">
              {/* Background Graphic */}
              <img
                src="/footer.png"
                alt="SiOL Flagship Fleet"
                className="absolute inset-0 h-full w-full object-cover object-right select-none pointer-events-none"
                loading="lazy"
              />

              {/* Left Content Area: Trust points overlaid on image */}
              <div className="relative z-10 w-full max-w-[42%] md:max-w-[36%] pl-8 md:pl-12 lg:pl-16 pr-2 py-6">
                <div className="flex flex-col gap-2.5">
                  {/* 1. Express Insured Transit */}
                  <div className="flex items-center gap-2.5 rounded-xl bg-white/75 hover:bg-white/90 backdrop-blur-md px-3 py-2 border border-white/70 shadow-xs transition-all">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900/10 text-slate-800">
                      <Truck className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-[13px] font-bold text-slate-900 leading-tight truncate">
                        Express Insured Transit
                      </p>
                    </div>
                  </div>

                  {/* 2. 7-Day Replacement */}
                  <div className="flex items-center gap-2.5 rounded-xl bg-white/75 hover:bg-white/90 backdrop-blur-md px-3 py-2 border border-white/70 shadow-xs transition-all">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900/10 text-slate-800">
                      <RotateCcw className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-[13px] font-bold text-slate-900 leading-tight truncate">
                        7-Day Replacement
                      </p>
                      <p className="text-[10px] md:text-[11px] text-slate-600 leading-tight truncate">
                        Hassle-free doorstep exchange
                      </p>
                    </div>
                  </div>

                  {/* 3. Official Brand Sealed */}
                  <div className="flex items-center gap-2.5 rounded-xl bg-white/75 hover:bg-white/90 backdrop-blur-md px-3 py-2 border border-white/70 shadow-xs transition-all">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900/10 text-slate-800">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-[13px] font-bold text-slate-900 leading-tight truncate">
                        Official Brand Sealed
                      </p>
                    </div>
                  </div>

                  {/* 4. Device setup & live support */}
                  <div className="flex items-center gap-2.5 rounded-xl bg-white/75 hover:bg-white/90 backdrop-blur-md px-3 py-2 border border-white/70 shadow-xs transition-all">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900/10 text-slate-800">
                      <Headphones className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-[13px] font-bold text-slate-900 leading-tight truncate">
                        Device setup &amp; live support
                      </p>
                    </div>
                  </div>
                </div>
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
            <Link to="/" className="flex items-center group py-1" title="SiOL - Home">
              <img
                src="/siol-logo-black.png"
                alt="SiOL"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none"
              />
            </Link>
            <p className="text-sm text-neutral-600 max-w-sm leading-relaxed">
              India's premier flagship mobile store. Authorized retail partner for Apple, Samsung, Google, and OnePlus delivering 100% brand-sealed hardware nationwide.
            </p>
            <div className="pt-2">
              <span className="inline-block rounded-lg bg-white border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-700">
                🔒 Official Authorized Reseller • 256-Bit SSL Encrypted
              </span>
            </div>
          </div>

          {/* Column 1: Shop Smartphones */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Flagship Categories
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link to="/collections?brand=Apple" className="hover:text-primary transition">
                  Apple iPhone 16 Pro
                </Link>
              </li>
              <li>
                <Link to="/collections?brand=Samsung" className="hover:text-primary transition">
                  Samsung Galaxy S25 & Z Fold
                </Link>
              </li>
              <li>
                <Link to="/collections?brand=Google" className="hover:text-primary transition">
                  Google Pixel 9 Pro Series
                </Link>
              </li>
              <li>
                <Link to="/collections?category=magsafe" className="hover:text-primary transition">
                  MagSafe & GaN Fast Chargers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
              Customer Support
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <Link to="/support" className="text-primary font-semibold hover:underline transition">
                  Official Support &amp; Service Hub
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Help &amp; Tech Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition">
                  IMEI & Warranty FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-primary transition">
                  Next-Day Delivery Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:text-primary transition">
                  7-Day Replacement Policy
                </Link>
              </li>
              {isMultiVendorEnabled() ? (
                <li>
                  <Link to="/become-seller" className="text-primary font-bold hover:underline transition">
                    Sell on Nexus Marketplace →
                  </Link>
                </li>
              ) : isDistributorProgramEnabled() ? (
                <li>
                  <Link to="/become-distributor" className="text-primary font-bold hover:underline transition">
                    Become an Official Distributor →
                  </Link>
                </li>
              ) : null}
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
          <p>© 2026 NEXUS MOBILE TECHNOLOGIES INDIA. All rights reserved.</p>

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
