import { ArrowRight, Headphones, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CustomerCareBanner() {
  return (
    <section className="py-6 sm:py-8 my-2">
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Headphones className="h-3.5 w-3.5" />
              <span>Official Care &amp; Service</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
              Proactive <br /> Customer Care &amp; Support
            </h2>
          </div>

          <div className="shrink-0">
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-slate-300 text-slate-800 hover:bg-slate-50 hover:text-primary font-semibold text-xs sm:text-sm h-10 px-4"
            >
              <Link to="/support" className="inline-flex items-center gap-2">
                <span>Explore Support Hub</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Photo Banner Container (100% full-width on desktop lg screen) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:max-w-none lg:px-0">
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-none border border-slate-200/80 lg:border-x-0 shadow-lg shadow-slate-950/5 bg-slate-50">
          <Link
            to="/support"
            className="block relative w-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-2xl sm:rounded-3xl lg:rounded-none"
            title="SiOL Proactive Customer Care & Support - Click to learn more"
          >
            <img
              src="/banner%20sicol.png"
              alt="SiOL Proactive Customer Care - Real People, Real Support, A Better SiOL Experience"
              className="w-full h-auto object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              loading="lazy"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CustomerCareBanner;
