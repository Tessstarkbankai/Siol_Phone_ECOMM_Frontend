import { Sparkles } from "lucide-react";

export function SupportTeaserBanner() {
  return (
    <section className="py-12 sm:py-16 my-4 bg-slate-50/60 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-purple-700">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span>Next-Gen Innovation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
            Crafted Beyond Boundaries. <br className="hidden sm:inline" /> Coming Soon.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            A breakthrough in durability, battery intelligence, and precision engineering.
          </p>
        </div>

        {/* Main Showcase Teaser Card */}
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white shadow-xl shadow-purple-950/5 aspect-[4/3] sm:aspect-[1440/724] min-h-[220px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[540px] flex items-center justify-center">
          <img
            src="/Frame 1984079647.png"
            alt="SiOL Flagship Smartphone - Coming Soon"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.015]"
          />

          {/* Floating Live Teaser Pill */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto pointer-events-none">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/90 backdrop-blur-md border border-purple-200/80 px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-sm max-w-full">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-purple-600 animate-pulse shrink-0" />
              <span className="text-[9px] sm:text-xs font-bold text-slate-800 tracking-wider uppercase truncate">
                Official Design Teaser • Aerospace Titanium &amp; Amethyst
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SupportTeaserBanner;
