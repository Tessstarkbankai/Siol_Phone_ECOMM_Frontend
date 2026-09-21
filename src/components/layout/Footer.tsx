import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Headphones,
  Mail,
  Phone,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { isMultiVendorEnabled, isDistributorProgramEnabled } from "@/config/features";

// Auto-moving Carousel Slides for the Footer Trust Showcase
const FOOTER_CAROUSEL_SLIDES = [
  {
    id: "fleet",
    image: "/footer2.png",
    eyebrow: "",
    title: "",
    tagline: "",
    badges: [
      { icon: Truck, title: "Express Insured Transit", subtitle: "Same-day priority dispatch" },
      { icon: RotateCcw, title: "7-Day Replacement", subtitle: "Doorstep exchange guarantee" },
      { icon: ShieldCheck, title: "Official Brand Sealed", subtitle: "100% authentic hardware" },
      { icon: Headphones, title: "Device Setup & Support", subtitle: "Priority live desk" },
    ],
  },
  {
    id: "titanium",
    // Direct image from Hero Carousel (Aerospace Titanium Pro)
    image: "/footer.png",
    eyebrow: "",
    title: "",
    tagline: "",
    badges: [
      { icon: ShieldCheck, title: "Official 1-Year Warranty", subtitle: "Full authorized coverage" },
      { icon: CreditCard, title: "0% No-Cost EMI", subtitle: "Up to 24 months options" },
      { icon: Sparkles, title: "Guaranteed Trade-In Value", subtitle: "Instant exchange bonus" },
      { icon: Headphones, title: "Priority Support Concierge", subtitle: "Direct technical line" },
    ],
  },
];

export function Footer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % FOOTER_CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeSlide = FOOTER_CAROUSEL_SLIDES[currentSlide];

  return (
    <footer className="bg-white text-neutral-900 border-t border-neutral-200 mt-6 sm:mt-8">
      {/* ========================================================================= */}
      {/* 1. AUTO-MOVING VISUAL TRUST CAROUSEL BANNER (Image & Text changing)       */}
      {/* ========================================================================= */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative w-full overflow-hidden border-b border-neutral-200 bg-neutral-950 text-white"
      >
        <div className="relative mx-auto max-w-7xl">
          {/* Background Images Layer with smooth crossfade */}
          <div className="relative aspect-[4/3] sm:aspect-[2148/780] min-h-[360px] sm:min-h-[380px] md:min-h-[420px] w-full flex items-center overflow-hidden">
            {FOOTER_CAROUSEL_SLIDES.map((slide, idx) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.title}
                className={`absolute inset-0 h-full w-full object-cover object-center sm:object-right transition-all duration-1000 select-none pointer-events-none ${
                  idx === currentSlide
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105 pointer-events-none"
                }`}
                loading="lazy"
              />
            ))}

            {/* Contrast Gradient: Subtle, lighter overlay so images stay vivid and bright */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent sm:bg-gradient-to-r sm:from-black/45 sm:via-black/15 sm:to-transparent z-10" />

            {/* Carousel Content Container */}
            <div className="relative z-20 w-full max-w-xl px-5 sm:px-8 md:px-12 py-6 sm:py-10 space-y-4 sm:space-y-5">
              {/* Dynamic Eyebrow & Title (Only rendered if text exists) */}
              {(activeSlide.title || activeSlide.eyebrow || activeSlide.tagline) && (
                <div className="space-y-1.5 transition-all duration-500">
                  {activeSlide.eyebrow && (
                    <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">
                      {activeSlide.eyebrow}
                    </span>
                  )}
                  {activeSlide.title && (
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                      {activeSlide.title}
                    </h3>
                  )}
                  {activeSlide.tagline && (
                    <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed line-clamp-2">
                      {activeSlide.tagline}
                    </p>
                  )}
                </div>
              )}

              {/* Dynamic Trust Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
                {activeSlide.badges.map((badge, bIdx) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={bIdx}
                      className="flex items-center gap-2.5 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md px-3 py-2 border border-white/20 shadow-sm transition-all"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                        <Icon className="h-3.5 w-3.5 text-[#38bdf8]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white leading-tight truncate">
                          {badge.title}
                        </p>
                        <p className="text-[10px] text-slate-300 leading-tight truncate">
                          {badge.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Indicators & Manual Controls */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-1.5">
                  {FOOTER_CAROUSEL_SLIDES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setCurrentSlide(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                        dotIdx === currentSlide ? "w-7 bg-[#0071e3]" : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1 ml-auto sm:ml-4">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentSlide((prev) =>
                        prev === 0 ? FOOTER_CAROUSEL_SLIDES.length - 1 : prev - 1
                      )
                    }
                    aria-label="Previous slide"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentSlide((prev) => (prev + 1) % FOOTER_CAROUSEL_SLIDES.length)
                    }
                    aria-label="Next slide"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MINIMAL SMARTPHONE BRAND BOTTOM FOOTER (VIVO / OPPO / APPLE STYLE)    */}
      {/* ========================================================================= */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14">
          {/* Brand Info & Social Media Icons */}
          <div className="w-full lg:max-w-[320px] space-y-4 shrink-0">
            <Link to="/" className="inline-block py-1" title="SiOL - Home">
              <img
                src="/siol-logo-black.png"
                alt="SiOL"
                className="h-7 w-auto object-contain transition-transform duration-300 hover:scale-105 select-none"
              />
            </Link>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm leading-relaxed">
              India&apos;s premier smartphone brand. Designing next-generation 5G flagships, foldables, and high-fidelity audio engineered for ultimate longevity.
            </p>

            {/* Social Media Icons */}
            <div className="pt-1">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
                Connect With Us
              </p>
              <div className="flex items-center gap-2">
                {/* X / Twitter */}
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on X"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors shadow-2xs"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:border-transparent transition-all shadow-2xs"
                >
                  <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Subscribe on YouTube"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-[#ff0000] hover:text-white hover:border-[#ff0000] transition-colors shadow-2xs"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2] transition-colors shadow-2xs"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Equal 3 Columns: Hardware, Support, and Customer Care */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 flex-1 w-full">
            {/* Column 1: Hardware */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Hardware
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-600">
                <li>
                  <Link to="/collections?sort=recent" className="hover:text-primary transition">
                    Flagship 5G Series
                  </Link>
                </li>
                <li>
                  <Link to="/collections?category=foldable" className="hover:text-primary transition">
                    Foldables &amp; Flips
                  </Link>
                </li>
                <li>
                  <Link to="/collections?search=feature" className="hover:text-primary transition">
                    Classic Keypad Phones
                  </Link>
                </li>
                <li>
                  <Link to="/collections?search=audio" className="hover:text-primary transition">
                    TWS Audio &amp; Buds
                  </Link>
                </li>
                <li>
                  <Link to="/collections" className="hover:text-primary transition">
                    View All Devices →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Customer Support */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Support
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-600">
                <li>
                  <Link to="/support" className="text-primary font-semibold hover:underline transition">
                    SiOL Support Hub
                  </Link>
                </li>
                <li>
                  <Link to="/support#service-centers" className="hover:text-primary transition">
                    Service Center Locator
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-primary transition">
                    Warranty &amp; Repairs FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-policy" className="hover:text-primary transition">
                    Express Delivery Policy
                  </Link>
                </li>
                {isDistributorProgramEnabled() && (
                  <li>
                    <Link to="/become-distributor" className="text-neutral-700 font-medium hover:text-primary transition">
                      B2B Distribution
                    </Link>
                  </li>
                )}
                {isMultiVendorEnabled() && (
                  <li>
                    <Link to="/become-seller" className="text-neutral-700 font-medium hover:text-primary transition">
                      Seller Portal
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Column 3: Customer Care (Contact) */}
            <div className="space-y-3.5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-1.5">
                  Customer Care
                </span>
                <a
                  href="tel:18004197465"
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 hover:text-[#0071e3] transition block leading-tight"
                >
                  1800-419-SIOL
                </a>
                <p className="text-[11px] text-neutral-500 font-normal mt-0.5">
                  09:00 - 21:00, Monday to Sunday (Toll-Free)
                </p>
              </div>

              <div className="space-y-2 pt-1 border-t border-neutral-100">
                <a
                  href="mailto:support@siol.in"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-700 hover:text-[#0071e3] transition"
                >
                  <Mail className="h-4 w-4 text-[#0071e3]" />
                  <span>support@siol.in</span>
                </a>

                <div className="pt-1">
                  <Link
                    to="/support"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:underline"
                  >
                    <span>Official Support &amp; Service Lounges</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Payment Strip */}
        <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-neutral-500">
          <p>© 2026 SiOL Technologies India Pvt. Ltd. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-600">
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
            <span>•</span>
            <Link to="/return-policy" className="hover:text-neutral-900 transition">
              Return Policy
            </Link>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="rounded-md bg-neutral-100 border border-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
              UPI
            </span>
            <span className="rounded-md bg-neutral-100 border border-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
              VISA
            </span>
            <span className="rounded-md bg-neutral-100 border border-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
              Mastercard
            </span>
            <span className="rounded-md bg-neutral-100 border border-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
              RuPay
            </span>
            <span className="rounded-md bg-neutral-100 border border-neutral-200 px-2 py-0.5 text-[10px] font-bold text-neutral-700">
              Razorpay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
