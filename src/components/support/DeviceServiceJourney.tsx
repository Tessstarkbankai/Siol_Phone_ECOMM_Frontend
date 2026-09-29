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

const CATEGORIES: Array<{
  id: "smartphone" | "feature_phone" | "tablet" | "laptop";
  label: string;
  dotColor: string;
}> = [
  { id: "smartphone", label: "Smartphone Repair", dotColor: "bg-[#0071e3]" },
  { id: "feature_phone", label: "Feature Phone Repair", dotColor: "bg-amber-400" },
  { id: "tablet", label: "Tablet Repair", dotColor: "bg-emerald-400" },
  { id: "laptop", label: "Laptop Repair", dotColor: "bg-purple-400" },
];

export function DeviceServiceJourney() {
  const [selectedCategory, setSelectedCategory] =
    useState<"smartphone" | "feature_phone" | "tablet" | "laptop">("smartphone");

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

      // Helper: Determines if an element's top edge is currently within the center focus zone (between 14% and 88% of viewport)
      const isElementInFocusZone = (target: HTMLElement) => {
        const rect = target.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        return rect.top < vh * 0.88 && rect.top > vh * 0.14;
      };

      // 2. Animate each step bidirectionally with proximity-based fading
      // Fades ONLY when hitting top proximity (~14%) or bottom proximity (~88%).
      // In the center and everywhere around it (14% to 88% of screen), it stays 100% visible with zero fade.
      const initialActive: number[] = [];

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const contentEl = el.querySelector<HTMLElement>(".step-content");
        const imageEl = el.querySelector<HTMLElement>(".step-image");
        const badgeEl = el.querySelector<HTMLElement>(".step-badge");

        // --- Step Content (Typography, Subtitle, Description, Highlight Badge) ---
        if (contentEl) {
          const inFocus = isElementInFocusZone(contentEl);
          if (inFocus) initialActive.push(index);

          gsap.set(contentEl, {
            opacity: inFocus ? 1 : 0.2,
            filter: inFocus ? "blur(0px)" : "blur(3px)",
            y: inFocus ? 0 : 20,
          });

          ScrollTrigger.create({
            trigger: contentEl,
            start: "top 88%",   // Enters from bottom proximity into center focus zone
            end: "top 14%",     // Reaches top proximity of the phone (below navbar)
            onEnter: () => {
              // Smoothly fade in as it enters center zone from bottom
              gsap.to(contentEl, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.35,
                ease: "power2.out",
              });
              setActiveStepIndices((prev) =>
                prev.includes(index) ? prev : [...prev, index]
              );
            },
            onLeave: () => {
              // Fades out only when hitting top proximity of the phone
              gsap.to(contentEl, {
                opacity: 0.2,
                y: -10,
                filter: "blur(3px)",
                duration: 0.35,
                ease: "power2.out",
              });
              setActiveStepIndices((prev) => prev.filter((i) => i !== index));
            },
            onEnterBack: () => {
              // Smoothly fade back in when scrolling back down from top proximity into center
              gsap.to(contentEl, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.35,
                ease: "power2.out",
              });
              setActiveStepIndices((prev) =>
                prev.includes(index) ? prev : [...prev, index]
              );
            },
            onLeaveBack: () => {
              // Fades out when leaving towards bottom proximity of the phone
              gsap.to(contentEl, {
                opacity: 0.2,
                y: 20,
                filter: "blur(3px)",
                duration: 0.35,
                ease: "power2.out",
              });
              setActiveStepIndices((prev) => prev.filter((i) => i !== index));
            },
          });
        }

        // --- Step Device Image ---
        if (imageEl) {
          const inFocus = isElementInFocusZone(imageEl);
          gsap.set(imageEl, {
            opacity: inFocus ? 1 : 0.2,
            scale: inFocus ? 1 : 0.94,
          });

          ScrollTrigger.create({
            trigger: imageEl,
            start: "top 88%",
            end: "top 14%",
            onEnter: () => {
              gsap.to(imageEl, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
              });
            },
            onLeave: () => {
              gsap.to(imageEl, {
                opacity: 0.2,
                scale: 0.94,
                duration: 0.4,
                ease: "power2.out",
              });
            },
            onEnterBack: () => {
              gsap.to(imageEl, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(imageEl, {
                opacity: 0.2,
                scale: 0.94,
                duration: 0.4,
                ease: "power2.out",
              });
            },
          });
        }

        // --- Step Badge Glow / Pulse ---
        if (badgeEl) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            end: "top 14%",
            onEnter: () => {
              gsap.to(badgeEl, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
            },
            onLeave: () => {
              gsap.to(badgeEl, { scale: 1.0, duration: 0.3 });
            },
            onEnterBack: () => {
              gsap.to(badgeEl, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
            },
            onLeaveBack: () => {
              gsap.to(badgeEl, { scale: 1.0, duration: 0.3 });
            },
          });
        }
      });

      if (initialActive.length > 0) {
        setActiveStepIndices(initialActive);
      }

      ScrollTrigger.refresh();
    }, timelineContainerRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section
      id="device-service"
      className="py-10 sm:py-16 bg-white text-slate-900 border-b border-slate-200/80 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/60 px-3.5 py-1 text-xs font-medium text-[#1d1d1f]">
            <Sparkles className="h-3.5 w-3.5 text-[#0071e3]" />
            <span>REPAIR & SUPPORT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
            Device Not Working Right?
          </h2>
          <p className="text-sm sm:text-base text-[#86868b] max-w-2xl mx-auto font-normal leading-relaxed">
            Get reliable repair support for your SIOL device.
          </p>
        </div>

        {/* 1. 4-CARD DEVICE SELECTOR GRID (Compact & Fit 2 in one row on mobile devices) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {CATEGORIES.map((cat) => {
            const journey = DEVICE_SERVICE_JOURNEYS[cat.id];
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                aria-label={`Select ${cat.label}`}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl text-left transition-all duration-300 cursor-pointer shadow-xs hover:shadow-lg bg-white ${
                  isSelected
                    ? "ring-2 sm:ring-3 ring-[#1d1d1f] ring-offset-1 sm:ring-offset-2 scale-[1.01]"
                    : "opacity-85 hover:opacity-100 ring-1 ring-slate-200 hover:ring-slate-300"
                }`}
              >
                {/* Image Container: Clean studio frame, compact height, object-contain so NO device is cropped */}
                <div className="relative h-28 sm:h-44 lg:h-52 w-full overflow-hidden bg-[#fbfbfd] p-2 sm:p-4 flex items-center justify-center">
                  <img
                    src={journey.bannerImage}
                    alt={cat.label}
                    className="h-full w-full object-contain select-none transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Bottom Bar: Label, status dot, and selected badge */}
                <div className="py-2 px-2.5 sm:py-2.5 sm:px-3.5 bg-[#1d1d1f] text-white flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <span className={`h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full ${cat.dotColor}`} />
                    <span className="text-[11px] sm:text-[13px] font-semibold sm:font-medium tracking-tight truncate">
                      {cat.label}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#0071e3] text-white"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 2. NEON BLUE GLOWING STRAIGHT TIMELINE SERVICE PROCESS (GSAP BIDIRECTIONAL SCROLL, CARD-LESS, FLOATING IMAGES) */}
        <div className="relative pt-4 sm:pt-6">
          {/* Active Flow Title */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 sm:pb-5 mb-8 sm:mb-14 gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              </span>
              <h3 className="text-lg sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight">
                {currentJourney.name} — Service Process
              </h3>
            </div>
            <span className="text-[11px] sm:text-xs font-medium bg-[#f5f5f7] text-[#1d1d1f] border border-[#d2d2d7]/60 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
              {currentJourney.badge}
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
            <div className="relative z-10 space-y-16 sm:space-y-36">
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
                        onLoad={() => ScrollTrigger.refresh()}
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
