import React from "react";
import { Search, ShieldCheck, MapPin, Wrench, PhoneCall, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SupportHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onQuickTopicClick: (topic: string) => void;
}

export function SupportHero({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onQuickTopicClick,
}: SupportHeroProps) {
  const quickPills = [
    { label: "Find Service Center", href: "#service-centers", icon: MapPin },
    { label: "Track Your Repair", href: "#track-repair", icon: Wrench },
    { label: "Warranty Coverage", href: "#warranty", icon: ShieldCheck },
    { label: "Contact Care Team", href: "#contact-support", icon: PhoneCall },
  ];

  const suggestedTopics = [
    "Battery draining",
    "Screen replacement",
    "Slow charging",
    "Data backup",
    "Software update",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-20">
      {/* Subtle background ambient radial accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[400px] h-[250px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-sky-400">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Official Customer Service &amp; Support Infrastructure</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            We&apos;re here to help.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed">
            Get personalized diagnostics, locate an authorized service center, track an active repair in real time, or speak directly with our certified technical specialists.
          </p>
        </div>

        {/* Central Search Box */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={onSearchSubmit}
            className="relative flex items-center rounded-2xl bg-white/95 backdrop-blur-md p-1.5 shadow-2xl border border-white/20 transition-all focus-within:ring-2 focus-within:ring-primary focus-within:bg-white"
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
              className="border-0 shadow-none bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 text-sm sm:text-base h-11 px-2"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-slate-950 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
            >
              Search
            </button>
          </form>

          {/* Quick Issue Keywords */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs text-slate-400">
            <span className="font-medium text-slate-500 mr-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-sky-400" />
              Common searches:
            </span>
            {suggestedTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => onQuickTopicClick(topic)}
                className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-0.5 text-[11px] text-slate-300 hover:text-white transition cursor-pointer"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Quick Jump Pills */}
        <div className="pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto">
            {quickPills.map((pill) => {
              const Icon = pill.icon;
              return (
                <a
                  key={pill.label}
                  href={pill.href}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-xs active:scale-95"
                >
                  <Icon className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{pill.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
