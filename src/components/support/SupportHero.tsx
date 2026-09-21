import { ShieldCheck } from "lucide-react";

interface SupportHeroProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSearchSubmit?: (e: React.FormEvent) => void;
  onQuickTopicClick?: (topic: string) => void;
}

export function SupportHero({}: SupportHeroProps = {}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-200/20">
      {/* Background Image with Contrast Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/support-hero-bg.png"
          alt="SiOL Air Products Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Balanced gradient overlay so background remains sharp while text remains razor-sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/50 to-slate-950/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        {/* Category Pill */}
        {/* <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white shadow-lg">
          <ShieldCheck className="h-4 w-4 text-[#0071e3]" />
          <span>SiOL Support</span>
        </div> */}

        {/* Main Headline */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.025em] text-white leading-tight drop-shadow-sm">
            Here for you.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-200/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Find answers, contact support, and arrange for repairs.
          </p>
        </div>
      </div>
    </section>
  );
}

