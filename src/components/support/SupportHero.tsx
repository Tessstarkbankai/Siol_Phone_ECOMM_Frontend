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
    <section className="relative w-full h-[180px] sm:h-[260px] md:h-[380px] lg:h-[calc(100vh-72px)] lg:min-h-[calc(100vh-72px)] flex flex-col justify-center items-center overflow-hidden text-center">
      {/* Background Image: High-res SiOL Store Showroom */}
      <div className="absolute inset-0 z-0">
        <img
          src="/siol-support-hero.jpg"
          alt="SiOL Flagship Store"
          className="w-full h-full object-cover object-[center_35%] lg:object-[center_30%] select-none lg:scale-105"
        />
        {/* Soft, bright atmospheric overlay to preserve store visuals while providing razor-sharp text legibility */}
        <div className="absolute inset-0" />
      </div>

      {/* Main Centered Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-4 sm:py-12 lg:py-24 flex flex-col items-center">
        {/* Headline */}
        {/* <h1 className="text-2xl sm:text-3xl md:text-6xl tracking-[-0.025em] text-[#1d1d1f] leading-tight drop-shadow-xs">
          Welcome to Siol Support
        </h1> */}
      </div>

      {/* Bottom Rounded Card Overlap Curve into Next Section (matching reference screenshot) */}
      <div className="absolute inset-x-0 bottom-0 h-6 sm:h-10 lg:h-12 bg-white rounded-t-[24px] sm:rounded-t-[40px] lg:rounded-t-[48px] pointer-events-none z-10" />
    </section>
  );
}

export default SupportHero;
