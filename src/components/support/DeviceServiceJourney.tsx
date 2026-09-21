import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DEVICE_SERVICE_JOURNEYS } from "@/config/support";
import type { DeviceServiceCategory } from "@/types/support";

// Register GSAP ScrollTrigger plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function DeviceServiceJourney() {
  const [selectedCategory, setSelectedCategory] =
    useState<"smartphone" | "feature_phone">("smartphone");

  const [activeStepIndices, setActiveStepIndices] = useState<number[]>([0]);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const neonLineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentJourney: DeviceServiceCategory =
    DEVICE_SERVICE_JOURNEYS[selectedCategory];

  // GSAP Bidirectional ScrollTrigger Animation (scrubs forward & backward smoothly)
  useEffect(() => {
    setActiveStepIndices([0]);

    const ctx = gsap.context(() => {
      // 1. Scrub the straight vertical glowing neon blue line dynamically with scroll
      if (neonLineRef.current && timelineContainerRef.current) {
        gsap.fromTo(
          neonLineRef.current,
          { height: "8%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineContainerRef.current,
              start: "top 65%",
              end: "bottom 75%",
              scrub: 0.6,
            },
          }
        );
      }

      // 2. Animate each step bidirectionally (plays forward on scroll down, reverses on scroll up)
      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const contentEl = el.querySelector<HTMLElement>(".step-content");
        const imageEl = el.querySelector<HTMLElement>(".step-image");
        const badgeEl = el.querySelector<HTMLElement>(".step-badge");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 74%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse", // Reverse smoothly on above scroll
            onEnter: () => {
              setActiveStepIndices((prev) =>
                prev.includes(index) ? prev : [...prev, index]
              );
            },
            onLeaveBack: () => {
              // When user scrolls back up above this step, deactivate it and retract
              setActiveStepIndices((prev) => prev.filter((i) => i !== index));
            },
            onEnterBack: () => {
              setActiveStepIndices((prev) =>
                prev.includes(index) ? prev : [...prev, index]
              );
            },
          },
        });

        if (contentEl) {
          tl.fromTo(
            contentEl,
            { opacity: 0.12, y: 45, filter: "blur(4px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "power2.out",
            }
          );
        }

        if (imageEl) {
          tl.fromTo(
            imageEl,
            { opacity: 0.1, scale: 0.86, y: 45 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            contentEl ? "-=0.55" : 0
          );
        }

        if (badgeEl) {
          tl.fromTo(
            badgeEl,
            { scale: 0.9 },
            { scale: 1.05, duration: 0.4, ease: "back.out(1.7)" },
            "-=0.6"
          );
        }
      });

      ScrollTrigger.refresh();
    }, timelineContainerRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section
      id="device-service"
      className="py-14 sm:py-24 bg-white text-slate-900 border-b border-slate-200/80 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/60 px-3.5 py-1 text-xs font-medium text-[#1d1d1f]">
            <Sparkles className="h-3.5 w-3.5 text-[#0071e3]" />
            <span>Repairs and Service</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
            Certified Repairs. Genuine Parts.
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] max-w-2xl mx-auto font-normal leading-relaxed">
            Choose a product to explore certified service options and step-by-step repair journeys.
          </p>
        </div>

        {/* 1. DUAL FULL-WIDTH DEVICE SELECTOR BANNERS (Image-Only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Smartphone Banner Card */}
          <button
            type="button"
            onClick={() => setSelectedCategory("smartphone")}
            aria-label="Select Smartphone Service Journey"
            className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-300 cursor-pointer shadow-md hover:shadow-2xl ${
              selectedCategory === "smartphone"
                ? "ring-4 ring-[#1d1d1f] ring-offset-4 scale-[1.01]"
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
            <div className="py-3 px-4 bg-[#1d1d1f] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#0071e3]" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">
                  Smartphone Repair
                </span>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full transition-colors ${
                  selectedCategory === "smartphone"
                    ? "bg-[#0071e3] text-white"
                    : "text-slate-400 group-hover:text-white"
                }`}
              >
                {selectedCategory === "smartphone" ? "Selected" : "Select"}
              </span>
            </div>
          </button>

          {/* Feature Phone Banner Card */}
          <button
            type="button"
            onClick={() => setSelectedCategory("feature_phone")}
            aria-label="Select Feature Phone Service Journey"
            className={`group relative overflow-hidden rounded-2xl text-left transition-all duration-300 cursor-pointer shadow-md hover:shadow-2xl ${
              selectedCategory === "feature_phone"
                ? "ring-4 ring-[#1d1d1f] ring-offset-4 scale-[1.01]"
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
            <div className="py-3 px-4 bg-[#1d1d1f] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-xs sm:text-sm font-medium tracking-wide">
                  Feature Phone Repair
                </span>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full transition-colors ${
                  selectedCategory === "feature_phone"
                    ? "bg-[#0071e3] text-white"
                    : "text-slate-400 group-hover:text-white"
                }`}
              >
                {selectedCategory === "feature_phone" ? "Selected" : "Select"}
              </span>
            </div>
          </button>
        </div>

        {/* 2. NEON BLUE GLOWING STRAIGHT TIMELINE SERVICE PROCESS (GSAP BIDIRECTIONAL SCROLL, CARD-LESS, FLOATING IMAGES) */}
        <div className="relative pt-8">
          {/* Active Flow Title */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-5 mb-16 gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight">
                {currentJourney.name} — Service Process
              </h3>
            </div>
            <span className="text-xs font-medium bg-[#f5f5f7] text-[#1d1d1f] border border-[#d2d2d7]/60 px-3 py-1 rounded-full">
              {selectedCategory === "smartphone"
                ? "Genuine Parts & Certified Technicians"
                : "Same-Day Counter Service"}
            </span>
          </div>

          {/* MAIN STRAIGHT TIMELINE CONTAINER */}
          <div ref={timelineContainerRef} className="relative max-w-5xl mx-auto">
            {/* CONTINUOUS STRAIGHT VERTICAL NEON BLUE TIMELINE (DESKTOP: CENTER, MOBILE: LEFT) */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 bottom-12 w-[3px] pointer-events-none z-0">
              {/* Neutral background spine track */}
              <div className="absolute inset-0 bg-slate-200 rounded-full" />

              {/* Glowing Neon Blue Dynamic Progress Line (Scrubbed smoothly via GSAP) */}
              <div
                ref={neonLineRef}
                className="absolute top-0 left-0 w-full bg-[#00f0ff] shadow-[0_0_14px_#00f0ff,0_0_28px_rgba(0,240,255,0.85),0_0_4px_#ffffff] rounded-full"
                style={{ height: "8%" }}
              >
                {/* Pulsing Neon Leading Tip */}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-[#00f0ff] shadow-[0_0_16px_#00f0ff,0_0_8px_#ffffff] animate-ping" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_10px_#00f0ff]" />
              </div>
            </div>

            {/* 4 SERVICE STEPS (CARD-LESS, PURE FLOATING IMAGES, ROUNDED STEP ICON, BIDIRECTIONAL SCROLL) */}
            <div className="relative z-10 space-y-24 sm:space-y-36">
              {currentJourney.steps.map((step, index) => {
                const isRevealed = activeStepIndices.includes(index);
                const isEven = index % 2 === 1; // Alternating layout for desktop

                return (
                  <div
                    key={step.stepNumber}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    className={`relative flex flex-col md:flex-row items-center gap-10 sm:gap-14 ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content Side: Pure Typography & Highlight (NO CARD!) */}
                    <div
                      className={`step-content w-full md:w-1/2 pl-14 md:pl-0 ${
                        isEven ? "md:pl-12 md:text-left" : "md:pr-12 md:text-left"
                      } space-y-3.5`}
                    >
                      {/* Step Subtitle & Standard Badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#0071e3]">
                          {step.subtitle}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Certified
                        </span>
                      </div>

                      {/* Main Step Headline */}
                      <h4 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                        {step.title}
                      </h4>

                      {/* Descriptive Body */}
                      <p className="text-sm sm:text-base text-[#86868b] leading-relaxed font-normal max-w-lg">
                        {step.description}
                      </p>

                      {/* Minimal Highlight Pill */}
                      <div className="pt-1">
                        <span className="inline-block text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                          {step.highlightBadge}
                        </span>
                      </div>
                    </div>

                    {/* Timeline Node: Simple Rounded Icon saying "Step {n}" */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-20">
                      <div
                        className={`step-badge inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-500 select-none ${
                          isRevealed
                            ? "border-2 border-[#00f0ff] bg-slate-950 text-[#00f0ff] shadow-[0_0_20px_rgba(0,240,255,0.75)] ring-4 ring-white scale-105"
                            : "border border-slate-300 bg-white text-slate-400 shadow-xs"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isRevealed ? "bg-[#00f0ff] animate-pulse" : "bg-slate-400"
                          }`}
                        />
                        <span>Step {index + 1}</span>
                      </div>
                    </div>

                    {/* Image Side: Pure Floating Image (NO CONTAINER, NO CARD, NO BOX!) */}
                    <div className="w-full md:w-1/2 pl-14 md:pl-0 flex items-center justify-center">
                      <img
                        src={step.imageUrl}
                        alt={`${step.title} - Step ${step.stepNumber}`}
                        className="step-image w-full max-w-md lg:max-w-xl h-auto max-h-[420px] object-contain filter drop-shadow-2xl select-none pointer-events-none transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          // Automatic fallback to clean device asset if network fails
                          e.currentTarget.src = "/categories/smartphone.png";
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeviceServiceJourney;
