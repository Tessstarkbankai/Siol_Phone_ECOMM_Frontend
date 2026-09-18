import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AudioShowcaseBanner() {
  return (
    <section className="py-4 sm:py-6 my-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-lg shadow-slate-950/5">
          {/* Panoramic Image Showcase Card */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] min-h-[220px] sm:min-h-[340px] md:min-h-[420px] flex items-center justify-center overflow-hidden bg-slate-950">
            <img
              src="/siol-earbuds-showcase.png"
              alt="SiOL Buds Pro Wireless Earbuds"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              loading="lazy"
            />

            {/* Subtle Vignette for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

            {/* Floating Pricing & Buy Now Pill */}
            <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-10">
              <div className="flex items-center gap-3 sm:gap-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/15 px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-2xl">
                <div>
                  <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    Introductory Offer
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-lg font-bold text-white">
                      ₹3,999
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-400 line-through">
                      ₹5,999
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                      33% OFF
                    </span>
                  </div>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs h-8 sm:h-9 px-3.5 sm:px-4 shadow-sm cursor-pointer"
                >
                  <Link to="/collections?search=headphone">
                    Buy Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AudioShowcaseBanner;
