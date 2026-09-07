import { useState } from "react";
import { Phone, ShieldCheck, Truck, X } from "lucide-react";
import { Link } from "react-router-dom";

export function TopUtilityBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#09090b] text-[#e4e4e7] text-xs font-medium border-b border-white/10 transition-all">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="hidden items-center gap-4 md:flex text-neutral-400">
          <span className="inline-flex items-center gap-1.5 hover:text-white transition">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Official Brand Sealed • IMEI Verified
          </span>
          <span className="text-white/20">|</span>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-1.5 hover:text-white transition"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            Tech Concierge: +91 98765 43210
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center text-center font-semibold text-white tracking-wide">
          <Truck className="mr-1.5 h-3.5 w-3.5 text-primary animate-pulse hidden sm:inline" />
          <span>
            🚀 Get up to ₹15,000 Extra on Phone Exchange + 0% No-Cost EMI • Use Code{" "}
            <span className="text-primary font-bold">NEXUS20</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/collections"
            className="hidden sm:inline text-neutral-400 hover:text-white transition text-[11px]"
          >
            Track Order
          </Link>
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Dismiss banner"
            className="text-neutral-400 hover:text-white transition p-0.5 rounded"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
