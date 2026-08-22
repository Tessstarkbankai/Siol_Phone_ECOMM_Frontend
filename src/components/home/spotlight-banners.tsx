import { ArrowRight, Flame, Sparkles, Utensils, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function SpotlightBanners() {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Banner 1: Chef Magic & Smart Appliances */}
          <div className="group relative overflow-hidden rounded-3xl bg-neutral-900 text-white p-8 sm:p-10 flex flex-col justify-between min-h-[340px] shadow-md border border-neutral-200">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80"
              alt="Smart Kitchen Appliances"
              className="absolute inset-0 h-full w-full object-cover opacity-45 filter brightness-[0.75] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/30 border border-primary/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                <Flame className="h-3.5 w-3.5 text-primary" />
                Featured Innovation
              </div>
              <h3 className="text-2xl font-black tracking-tight sm:text-3xl text-white">
                Chef Magic Smart Cooking Robot
              </h3>
              <p className="text-sm text-neutral-200 max-w-sm">
                200+ guided recipes, automatic stirring, and multi-stage precision cooking at your fingertips.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-6 rounded-xl shadow-md">
                <Link to="/collections" className="inline-flex items-center gap-2">
                  <span>Explore Smart Appliances</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Banner 2: Royal Velvet Cookware */}
          <div className="group relative overflow-hidden rounded-3xl bg-[#7c2d12] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[340px] shadow-md border border-neutral-200">
            <img
              src="https://images.unsplash.com/photo-1584990347449-399a9a3b0485?auto=format&fit=crop&w=900&q=80"
              alt="Royal Velvet Cookware"
              className="absolute inset-0 h-full w-full object-cover opacity-45 filter brightness-[0.75] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/30 border border-amber-400/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-200">
                <Zap className="h-3.5 w-3.5" />
                Up to 40% OFF
              </div>
              <h3 className="text-2xl font-black tracking-tight sm:text-3xl text-white">
                Royal Velvet MetaTuff Cookware
              </h3>
              <p className="text-sm text-neutral-200 max-w-sm">
                Virgin grade aluminum with 5-layer non-stick durability and induction compatible base.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Button asChild className="bg-white text-neutral-900 hover:bg-neutral-100 font-bold h-11 px-6 rounded-xl shadow-md">
                <Link to="/collections" className="inline-flex items-center gap-2">
                  <span>Shop Cookware Sets</span>
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
