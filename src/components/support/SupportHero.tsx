import React, { useState } from "react";
import { Search } from "lucide-react";

interface SupportHeroProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSearchSubmit?: (e: React.FormEvent) => void;
  onQuickTopicClick?: (topic: string) => void;
}

export function SupportHero({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onQuickTopicClick,
}: SupportHeroProps = {}) {
  const [internalQuery, setInternalQuery] = useState("");
  const query = searchQuery !== undefined ? searchQuery : internalQuery;

  const handleQueryChange = (val: string) => {
    if (setSearchQuery) {
      setSearchQuery(val);
    } else {
      setInternalQuery(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(e);
    } else {
      // Default: smooth scroll down to FAQ or service centers
      const section = document.getElementById("service-centers") || document.getElementById("faq");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleTopic = (topic: string) => {
    if (onQuickTopicClick) {
      onQuickTopicClick(topic);
    } else {
      handleQueryChange(topic);
      if (topic.toLowerCase().includes("repair") || topic.toLowerCase().includes("track")) {
        const sc = document.getElementById("service-centers");
        if (sc) sc.scrollIntoView({ behavior: "smooth" });
      } else {
        const faq = document.getElementById("faq") || document.getElementById("service-centers");
        if (faq) faq.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const quickLinks = [
    "Warranty",
    "Find X Ultra",
    "Screen Repair",
    "Battery Health",
    "Track Repair",
    "Doorstep Service",
  ];

  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-72px)] flex flex-col justify-center items-center overflow-hidden text-center">
      {/* Background Image: High-res SiOL Store Showroom */}
      <div className="absolute inset-0 z-0">
        <img
          src="/siol-support-hero.jpg"
          alt="SiOL Flagship Store"
          className="w-full h-full object-cover object-[center_30%] select-none scale-105"
        />
        {/* Soft, bright atmospheric overlay to preserve store visuals while providing razor-sharp text legibility */}
        <div className="absolute inset-0" />
      </div>

      {/* Main Centered Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center">
        {/* Headline */}
        {/* <h1 className="text-2xl sm:text-3xl md:text-6xl tracking-[-0.025em] text-[#1d1d1f] leading-tight drop-shadow-xs">
          Welcome to Siol Support
        </h1> */}

        {/* Subtitle */}
        {/* <p className="mt-2.5 sm:mt-3.5 text-base sm:text-lg md:text-xl text-[#4a4a4a] font-normal leading-relaxed max-w-2xl">
          Connect with us, your satisfaction starts here
        </p> */}

        {/* Pill Search Bar */}
        {/* <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto mt-6 sm:mt-8">
          <div className="relative flex items-center rounded-full bg-white shadow-xl shadow-slate-300/30 border border-slate-200/90 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0071e3] focus-within:shadow-2xl">
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search for support"
              className="w-full h-12 sm:h-14 pl-6 pr-14 rounded-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-full text-slate-400 hover:text-[#0071e3] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form> */}

        {/* Quick Search Keyword Links */}
        {/* <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1.5 text-xs sm:text-sm text-slate-600 font-normal mt-4 px-2">
          {quickLinks.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => handleTopic(link)}
              className="hover:text-[#0071e3] transition-colors cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div> */}
      </div>

      {/* Bottom Rounded Card Overlap Curve into Next Section (matching reference screenshot) */}
      <div className="absolute inset-x-0 bottom-0 h-8 sm:h-12 bg-white rounded-t-[32px] sm:rounded-t-[48px] pointer-events-none z-10" />
    </section>
  );
}

export default SupportHero;
