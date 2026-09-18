import React, { useState } from "react";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { DEVICE_SERVICE_JOURNEYS } from "@/config/support";
import type { DeviceServiceCategory } from "@/types/support";

export function DeviceServiceJourney() {
  const [selectedCategory, setSelectedCategory] =
    useState<"smartphone" | "feature_phone">("smartphone");

  const currentJourney: DeviceServiceCategory =
    DEVICE_SERVICE_JOURNEYS[selectedCategory];

  return (
    <section id="device-service" className="py-14 sm:py-24 bg-white text-slate-900 border-b border-slate-200/80 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-800">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Select Device Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-950">
            Certified Service &amp; Repair Journeys
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Click on either banner to switch between our touchscreen smartphone protocol and durable feature phone protocol.
          </p>
        </div>

        {/* 1. DUAL FULL-WIDTH DEVICE SELECTOR BANNERS (NO TEXT ON IMAGES AT ALL) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Smartphone Banner Card (Image-Only, Zero Text Over Image) */}
          <button
            type="button"
            onClick={() => setSelectedCategory("smartphone")}
            aria-label="Select Smartphone Service Journey"
            className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-300 cursor-pointer shadow-md hover:shadow-2xl ${
              selectedCategory === "smartphone"
                ? "ring-4 ring-slate-950 ring-offset-4 scale-[1.01]"
                : "opacity-75 hover:opacity-100 ring-1 ring-slate-200 hover:ring-slate-400"
            }`}
          >
            <div className="relative h-64 sm:h-80 md:h-[380px] w-full overflow-hidden bg-slate-950">
              <img
                src={DEVICE_SERVICE_JOURNEYS.smartphone.bannerImage}
                alt="Smartphone Service Banner"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Minimal Sub-Banner Label Bar (Outside Image) */}
            <div className="py-3 px-4 bg-slate-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">
                  Smartphone Service
                </span>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full transition-colors ${
                  selectedCategory === "smartphone"
                    ? "bg-primary text-white"
                    : "text-slate-400 group-hover:text-white"
                }`}
              >
                {selectedCategory === "smartphone" ? "Active Flow" : "Select Flow"}
              </span>
            </div>
          </button>

          {/* Feature Phone Banner Card (Image-Only, Zero Text Over Image) */}
          <button
            type="button"
            onClick={() => setSelectedCategory("feature_phone")}
            aria-label="Select Feature Phone Service Journey"
            className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-300 cursor-pointer shadow-md hover:shadow-2xl ${
              selectedCategory === "feature_phone"
                ? "ring-4 ring-slate-950 ring-offset-4 scale-[1.01]"
                : "opacity-75 hover:opacity-100 ring-1 ring-slate-200 hover:ring-slate-400"
            }`}
          >
            <div className="relative h-64 sm:h-80 md:h-[380px] w-full overflow-hidden bg-slate-950">
              <img
                src={DEVICE_SERVICE_JOURNEYS.feature_phone.bannerImage}
                alt="Feature Phone Service Banner"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Minimal Sub-Banner Label Bar (Outside Image) */}
            <div className="py-3 px-4 bg-slate-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">
                  Feature Phone Service
                </span>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full transition-colors ${
                  selectedCategory === "feature_phone"
                    ? "bg-primary text-white"
                    : "text-slate-400 group-hover:text-white"
                }`}
              >
                {selectedCategory === "feature_phone" ? "Active Flow" : "Select Flow"}
              </span>
            </div>
          </button>
        </div>

        {/* 2. CREATIVE VERTICAL ROADMAP WITH PROMINENT ANIMATED DOTTED PATH */}
        <div className="relative pt-8">
          {/* Active Flow Title */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-5 mb-16 gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                {currentJourney.name} — 4-Stage Precision Protocol
              </h3>
            </div>
            <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full">
              {selectedCategory === "smartphone"
                ? "ISO 9001 Cleanroom Certified"
                : "Same-Day Counter Diagnostics"}
            </span>
          </div>

          {/* VERTICAL ROADMAP CONTAINER WITH AMPLE BREATHING ROOM */}
          <div className="relative max-w-6xl mx-auto">
            {/* DESKTOP ANIMATED CONNECTING SERPENTINE SVG (Never Hidden, Placed Between Steps) */}
            <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 1200"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="journeyDottedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="35%" stopColor="#2563eb" />
                    <stop offset="70%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>

                {/* Prominent Flowing S-Curve Dotted Path Connecting the 4 Stations */}
                <path
                  d="M 250 120 C 500 120, 500 420, 750 420 C 500 420, 500 720, 250 720 C 500 720, 500 1020, 750 1020"
                  stroke="url(#journeyDottedGrad)"
                  strokeWidth="4"
                  strokeDasharray="10 10"
                  strokeLinecap="round"
                  className="animate-[flowDash_20s_linear_infinite]"
                />
              </svg>
            </div>

            {/* MOBILE VERTICAL DOTTED SPINE (Left-aligned) */}
            <div className="md:hidden absolute left-5 top-8 bottom-8 w-1 pointer-events-none z-0">
              <svg className="w-full h-full" fill="none">
                <line
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="100%"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  className="animate-[flowDash_15s_linear_infinite]"
                />
              </svg>
            </div>

            {/* 4 CREATIVE ALTERNATING SERVICE STEP STATIONS */}
            <div className="relative z-10 space-y-16 sm:space-y-24">
              {currentJourney.steps.map((step, index) => {
                const isEven = index % 2 === 1; // 0=Left, 1=Right, 2=Left, 3=Right

                return (
                  <div
                    key={step.stepNumber}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Creative Step Card (Asymmetrical, Rich Image & Typography) */}
                    <div className="w-full md:w-[48%] pl-12 md:pl-0">
                      <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                        {/* Background Giant Stylized Watermark Numeral */}
                        <span className="absolute -top-6 -right-2 text-7xl sm:text-8xl font-black text-slate-100 select-none pointer-events-none z-0 group-hover:text-primary/10 transition-colors">
                          {step.stepNumber}
                        </span>

                        {/* Creative Split: Photo Banner + Content */}
                        <div className="relative h-56 sm:h-64 w-full overflow-hidden z-10 bg-slate-900">
                          <img
                            src={step.imageUrl}
                            alt={`${step.title} Stage`}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                            loading="lazy"
                          />
                          {/* Highlight Pill on Image */}
                          <div className="absolute top-3 right-3 z-10">
                            <span className="rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-bold text-sky-300 shadow-md">
                              {step.highlightBadge}
                            </span>
                          </div>
                        </div>

                        {/* Card Lower Content */}
                        <div className="relative z-10 p-5 sm:p-6 space-y-3 bg-white">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">
                              Stage {step.stepNumber} • {step.subtitle}
                            </span>
                            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              OEM Standard
                            </span>
                          </div>

                          <h4 className="text-lg sm:text-xl font-bold text-slate-950 group-hover:text-primary transition-colors leading-snug">
                            {step.title}
                          </h4>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Central Connecting Milestone Beacon / Node */}
                    <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 flex items-center justify-center z-20">
                      <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-slate-950 border-2 border-sky-400 text-sky-400 font-mono font-black text-sm shadow-xl shadow-sky-500/20 ring-4 ring-white">
                        <span>{step.stepNumber}</span>
                        <span className="absolute -inset-1 rounded-full border border-sky-400/40 animate-ping pointer-events-none" />
                      </div>
                    </div>

                    {/* Spacer for Alternating Balance on Desktop */}
                    <div className="hidden md:block md:w-[48%]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dotted Flow Animation */}
      <style>{`
        @keyframes flowDash {
          to {
            stroke-dashoffset: -400;
          }
        }
      `}</style>
    </section>
  );
}
