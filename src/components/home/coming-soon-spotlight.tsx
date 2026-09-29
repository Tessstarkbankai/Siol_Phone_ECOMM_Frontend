import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function ComingSoonSpotlight() {
  return (
    <section className="py-8 my-6">
      {/* Section Header: Trendy Smartphone Company Teaser */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-purple-700">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              <span>Next-Gen Flagship Reveal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
              Crafted Beyond Boundaries. <br /> Coming Soon.
            </h2>
          </div>

          <div className="shrink-0">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-purple-200 hover:bg-purple-50 text-purple-800 font-bold text-xs h-10 px-5 gap-2 shadow-2xs cursor-pointer"
            >
              <Link to="/collections">
                <span>Explore All Devices</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Showcase Teaser Banner (100% full-width on desktop lg screen) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:max-w-none lg:px-0">
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-none border border-purple-100/90 lg:border-x-0 bg-white shadow-xl shadow-purple-950/5 aspect-[1440/724] lg:aspect-[2.33/1] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[540px] flex items-center justify-center">
          <img
            src="/Frame 1984079647.png"
            alt="SiOL Flagship Smartphone - Coming Soon"
            className="w-full h-full object-contain sm:object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
          />

          {/* Floating Live Teaser Pill */}
          <div className="absolute bottom-1.5 left-2 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-10 xl:left-16 sm:right-auto pointer-events-none">
            <div className="inline-flex items-center gap-1 sm:gap-2 rounded-full bg-white/95 backdrop-blur-md border border-purple-200/80 px-2 py-0.5 sm:px-3.5 sm:py-1.5 shadow-sm max-w-full">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-purple-600 animate-pulse shrink-0" />
              <span className="text-[8px] sm:text-xs font-bold text-slate-800 tracking-wider uppercase truncate">
                Official Design Teaser • Titanium & Amethyst
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComingSoonSpotlight;
