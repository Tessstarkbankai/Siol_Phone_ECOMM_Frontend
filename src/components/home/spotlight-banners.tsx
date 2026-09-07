import { ArrowRight, Flame, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function SpotlightBanners() {
  return (
    <section className="py-6 my-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Banner 1: Next-Gen Camera Innovation */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/90 via-white to-sky-100/70 text-slate-900 p-8 sm:p-10 flex flex-col justify-between min-h-[340px] shadow-lg shadow-blue-500/5 border border-blue-200/80">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=900&q=80"
              alt="Next-Gen Mobile Cameras"
              className="absolute right-0 top-0 bottom-0 w-1/2 object-cover object-center opacity-30 mix-blend-multiply rounded-r-3xl transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-3 max-w-md">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <Flame className="h-3.5 w-3.5 text-primary" />
                Next-Gen Optical Engine
              </div>
              <h3 className="text-2xl font-black tracking-tight sm:text-3xl text-slate-900 leading-snug">
                200MP Quad Matrix & 100x Space Zoom
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Capture cinema-grade 4K 120fps Dolby Vision, ultra-low light Nightography, and optical periscope telephoto shots.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-blue-500/20">
                <Link to="/collections?category=camera" className="inline-flex items-center gap-2">
                  <span>Explore Pro Camera Phones</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Banner 2: Grade 5 Titanium Architecture */}
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50/90 via-white to-blue-100/60 text-slate-900 p-8 sm:p-10 flex flex-col justify-between min-h-[340px] shadow-lg shadow-blue-500/5 border border-blue-200/80">
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80"
              alt="Aerospace Grade Titanium"
              className="absolute right-0 top-0 bottom-0 w-1/2 object-cover object-center opacity-30 mix-blend-multiply rounded-r-3xl transition-transform duration-700 group-hover:scale-105 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-3 max-w-md">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-800">
                <Zap className="h-3.5 w-3.5 text-cyan-600" />
                Aerospace Engineering
              </div>
              <h3 className="text-2xl font-black tracking-tight sm:text-3xl text-slate-900 leading-snug">
                Grade 5 Titanium & Ceramic Shield
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Uncompromising strength, featherlight in-hand ergonomics, and IP68 dust & underwater submersion resistance.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 px-6 rounded-xl shadow-md">
                <Link to="/collections?brand=Apple" className="inline-flex items-center gap-2">
                  <span>Shop Titanium Flagships</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpotlightBanners;
