import React from "react";
import { Search, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SupportHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onQuickTopicClick?: (topic: string) => void;
}

export function SupportHero({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
}: SupportHeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-200/20">
      {/* Background Image with Contrast Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/support-hero-bg.png"
          alt="SiOL Air Products Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Balanced gradient overlay so earbuds remain sharp while text & search remain razor-sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/50 to-slate-950/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-sky-400 shadow-lg">
          <ShieldCheck className="h-4 w-4 text-sky-400" />
          <span>Official Customer Service &amp; Support Infrastructure</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
            We&apos;re here to help.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            Get personalized diagnostics, locate an authorized service center, or speak directly with our certified technical specialists.
          </p>
        </div>

        {/* Central Search Box */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={onSearchSubmit}
            className="relative flex items-center rounded-2xl bg-white/95 backdrop-blur-md p-1.5 shadow-2xl border border-white/30 transition-all focus-within:ring-2 focus-within:ring-primary focus-within:bg-white"
          >
            <div className="pl-3.5 pr-2 text-slate-400 flex items-center pointer-events-none">
              <Search className="h-5 w-5" />
            </div>
            <Input
              type="search"
              aria-label="Search support questions or device issues"
              placeholder="Search issue, symptom, or topic (e.g., battery drain, cracked glass, update)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 shadow-none bg-transparent text-slate-900 placeholder:text-slate-500 focus-visible:ring-0 text-sm sm:text-base h-12 px-2"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-slate-950 px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

