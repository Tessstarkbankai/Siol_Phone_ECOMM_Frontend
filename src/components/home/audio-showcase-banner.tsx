import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AudioShowcaseBanner() {
  return (
    <section className="py-4 sm:py-6 my-2">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:max-w-none lg:px-0">
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-none border border-slate-200/80 lg:border-x-0 shadow-lg shadow-slate-950/5">
          {/* Panoramic Image Showcase Card */}
          <div className="relative w-full aspect-[2.67/1] sm:aspect-[2.67/1] md:aspect-[2.67/1] lg:aspect-[2.8/1] xl:aspect-[3.2/1] flex items-center justify-center overflow-hidden bg-slate-950">
            <img
              src="/buds.png"
              alt="SiOL Buds Pro Wireless Earbuds"
              className="w-full h-full object-contain sm:object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015] select-none"
              loading="lazy"
            />

            {/* Subtle Vignette for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Floating Pricing & Buy Now Pill */}
            <div className="absolute bottom-1.5 right-1.5 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-10 xl:right-16 z-10">
              <div className="flex items-center gap-1.5 sm:gap-4 rounded-lg sm:rounded-2xl bg-slate-950/90 backdrop-blur-md border border-white/20 px-2 py-1 sm:px-4 sm:py-2.5 shadow-2xl">
                <div>
                  <div className="text-[7.5px] sm:text-[10px] uppercase font-bold tracking-wider text-slate-400 leading-tight">
                    Introductory Offer
                  </div>
                  <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5">
                    <span className="text-[11px] sm:text-lg font-bold text-white leading-none">
                      ₹3,999
                    </span>
                    <span className="text-[9px] sm:text-xs text-slate-400 line-through leading-none">
                      ₹5,999
                    </span>
                    <span className="text-[7.5px] sm:text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-1 py-0.5 sm:px-1.5 sm:py-0.5 rounded leading-none">
                      33% OFF
                    </span>
                  </div>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="rounded-md sm:rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-[10px] sm:text-xs h-6 sm:h-9 px-2 sm:px-4 shadow-sm cursor-pointer shrink-0"
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
