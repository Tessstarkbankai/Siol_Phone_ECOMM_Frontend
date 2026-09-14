import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/ui/aurora-text";
import type { CustomerHomeBanner } from "@/features/customer/home/types";

type HeroCarouselProps = {
  banners?: CustomerHomeBanner[];
};

type SlideItem = {
  _id: string;
  tabLabel: string;
  videoUrl?: string;
  imageUrl?: string;
  eyebrow: string;
  title: string;
  auroraColors: string[];
  tagline: string;
  priceNote: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  specChips: string[];
};

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

const FLAGSHIP_SLIDES: SlideItem[] = [
  {
    _id: "slide-video-s25",
    tabLabel: "Galaxy S25 Ultra",
    videoUrl: "/phone.mp4",
    eyebrow: "Galaxy AI is Here",
    title: "Galaxy S25 Ultra",
    auroraColors: ["#ffffff", "#38bdf8", "#818cf8", "#c084fc", "#38bdf8", "#ffffff"],
    tagline: "Epic in every way. Built with Grade 5 Titanium & Snapdragon 8 Elite.",
    priceNote: "From ₹5,416/mo (24 mos) or ₹1,29,999* | ₹15,000 Exchange Bonus",
    ctaText: "Buy Now",
    ctaLink: "/collections?brand=Samsung",
    secondaryCtaText: "Learn more",
    secondaryCtaLink: "/collections?category=flagship",
    specChips: [
      "Snapdragon 8 Elite",
      "200MP Quad Matrix",
      "100x Space Zoom",
      "Built-in S Pen",
    ],
  },
  {
    _id: "slide-iphone-16",
    tabLabel: "iPhone 16 Pro",
    videoUrl: "https://youtu.be/70gCxCTpvBg?si=iY02_59N4hTj5D6N",
    imageUrl:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "Hello, Apple Intelligence.",
    title: "iPhone 16 Pro Max",
    auroraColors: ["#ffffff", "#60a5fa", "#a78bfa", "#f472b6", "#60a5fa", "#ffffff"],
    tagline: "Titanium. So strong. So light. Powered by the groundbreaking A18 Pro.",
    priceNote: "From ₹5,999/mo (24 mos) or ₹1,44,900* | 0% No Cost EMI",
    ctaText: "Buy Now",
    ctaLink: "/collections?brand=Apple",
    secondaryCtaText: "Learn more",
    secondaryCtaLink: "/collections?brand=Apple",
    specChips: [
      "A18 Pro Bionic",
      "48MP Fusion Camera",
      "4K 120fps Dolby",
      "Camera Control",
    ],
  },
  {
    _id: "slide-z-fold6",
    tabLabel: "Galaxy Z Fold6",
    imageUrl:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "Ultra-Slim Dual Display",
    title: "Galaxy Z Fold6",
    auroraColors: ["#ffffff", "#22d3ee", "#38bdf8", "#818cf8", "#22d3ee", "#ffffff"],
    tagline: "PC-level power in your pocket with 7.6″ Dynamic AMOLED 2X.",
    priceNote: "From ₹6,875/mo (24 mos) or ₹1,64,999* | Free Screen Protection",
    ctaText: "Buy Now",
    ctaLink: "/collections?brand=Samsung",
    secondaryCtaText: "Learn more",
    secondaryCtaLink: "/collections",
    specChips: [
      "7.6\" Dynamic AMOLED",
      "Ray Tracing Gaming",
      "Circle to Search",
      "Armor Hinge",
    ],
  },
  {
    _id: "slide-pixel-9",
    tabLabel: "Pixel 9 Pro XL",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=1920&q=85",
    eyebrow: "Engineered by Google",
    title: "Pixel 9 Pro XL",
    auroraColors: ["#ffffff", "#34d399", "#38bdf8", "#a78bfa", "#34d399", "#ffffff"],
    tagline: "Built for Gemini AI. Pro Triple camera matrix with 30x Super Res Zoom.",
    priceNote: "From ₹5,208/mo (24 mos) or ₹1,24,999* | ₹10,000 Bank Cashback",
    ctaText: "Buy Now",
    ctaLink: "/collections?brand=Google",
    secondaryCtaText: "Learn more",
    secondaryCtaLink: "/collections?brand=Google",
    specChips: [
      "Google Tensor G4",
      "Super Res 30x",
      "Magic Audio Eraser",
      "7 Yrs OS Updates",
    ],
  },
];

const AUTO_PLAY_INTERVAL = 4000;

const AURORA_PALETTES = [
  ["#ffffff", "#38bdf8", "#818cf8", "#c084fc", "#38bdf8", "#ffffff"],
  ["#ffffff", "#60a5fa", "#a78bfa", "#f472b6", "#60a5fa", "#ffffff"],
  ["#ffffff", "#22d3ee", "#38bdf8", "#818cf8", "#22d3ee", "#ffffff"],
  ["#ffffff", "#34d399", "#38bdf8", "#a78bfa", "#34d399", "#ffffff"],
];

export function HeroCarousel({ banners }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // If banners are uploaded from admin panel, use them; otherwise fallback to default FLAGSHIP_SLIDES
  const dynamicSlides: SlideItem[] =
    banners && banners.length > 0
      ? banners.map((b, idx) => {
          const isVideo =
            b.mediaType === "video" ||
            Boolean(b.videoUrl) ||
            Boolean(b.imageUrl && /\.(mp4|webm|mov|mkv)$/i.test(b.imageUrl));

          const videoUrl = isVideo ? (b.videoUrl || b.imageUrl) : undefined;
          const imageUrl = !isVideo ? (b.imageUrl || b.videoUrl) : undefined;
          const defaultLabel = isVideo ? `Video ${idx + 1}` : `Slide ${idx + 1}`;
          const defaultTitle = isVideo ? "Featured Showcase" : "Flagship Collection";

          return {
            _id: b._id || `admin-banner-${idx}`,
            tabLabel: b.title || defaultLabel,
            videoUrl,
            imageUrl,
            eyebrow: isVideo ? "Featured Showcase" : "Special Highlight",
            title: b.title || defaultTitle,
            auroraColors: AURORA_PALETTES[idx % AURORA_PALETTES.length],
            tagline:
              b.tagline ||
              "Discover exclusive flagship technology, premium power & special offers.",
            priceNote: "",
            ctaText: "Explore Now",
            ctaLink: b.link || "/collections",
            secondaryCtaText: "Learn more",
            secondaryCtaLink: b.link || "/collections",
            specChips: isVideo
              ? ["4K Ultra HD", "Official Showcase"]
              : ["Exclusive Offer", "Top Rated"],
          };
        })
      : [];

  const slides = dynamicSlides.length > 0 ? dynamicSlides : FLAGSHIP_SLIDES;
  const slide = slides[current] || slides[0];

  const isCurrentSlideHtml5Video = Boolean(
    slide?.videoUrl && !getYouTubeId(slide.videoUrl),
  );
  const lastProgressRef = useRef(0);

  useEffect(() => {
    if (current >= slides.length) {
      setCurrent(0);
    }
  }, [slides.length, current]);

  // Handle slide timing: HTML5 videos drive their own timing via onTimeUpdate & onEnded
  useEffect(() => {
    if (isCurrentSlideHtml5Video) {
      setProgress(0);
      lastProgressRef.current = 0;
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.currentTime = 0;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else {
          videoRef.current.pause();
        }
      }
      return;
    }

    if (!isPlaying) {
      return;
    }

    // For photo banners or YouTube embeds, run standard timer
    setProgress(0);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, (elapsed / AUTO_PLAY_INTERVAL) * 100);
      setProgress(nextProgress);

      if (elapsed >= AUTO_PLAY_INTERVAL) {
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [current, isPlaying, slides.length, isCurrentSlideHtml5Video]);

  function handleVideoTimeUpdate(e: React.SyntheticEvent<HTMLVideoElement>) {
    const v = e.currentTarget;
    if (v.duration && !isNaN(v.duration) && v.duration > 0) {
      const pct = Math.floor((v.currentTime / v.duration) * 100);
      if (Math.abs(pct - lastProgressRef.current) >= 2) {
        lastProgressRef.current = pct;
        setProgress(pct);
      }
    }
  }

  function handleVideoEnded() {
    if (slides.length > 1) {
      handleNext();
    } else if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }

  function handleNext() {
    setCurrent((prev) => (prev + 1) % slides.length);
  }

  function handlePrev() {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }

  function handleSelectSlide(index: number) {
    setCurrent(index);
  }

  function togglePlayPause() {
    setIsPlaying((prev) => {
      const next = !prev;
      if (videoRef.current) {
        if (next) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      }
      return next;
    });
  }

  function toggleMute() {
    setIsMuted((prev) => !prev);
  }

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white">
      {/* Immersive Viewport */}
      <div className="relative h-[600px] sm:h-[680px] lg:h-[740px] xl:h-[780px] w-full flex items-center justify-center">
        {/* Background Visual Layer */}
        {slides.map((s, index) => {
          const isActive = index === current;
          const ytId = getYouTubeId(s.videoUrl);

          return (
            <div
              key={s._id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Media Render: YouTube Embed, HTML5 MP4 Video, or Photo Banner */}
              {ytId ? (
                isActive ? (
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=${
                        isMuted ? 1 : 0
                      }&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&enablejsapi=1`}
                      title={s.title}
                      className="w-full h-full min-w-full min-h-full object-cover border-0 pointer-events-none"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : null
              ) : s.videoUrl ? (
                <div className="relative h-full w-full overflow-hidden bg-black">
                  {/* Video full-width / full-height using object-cover */}
                  <video
                    ref={isActive ? videoRef : undefined}
                    src={s.videoUrl}
                    autoPlay={isActive && isPlaying}
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    loop={slides.length === 1}
                    onTimeUpdate={isActive ? handleVideoTimeUpdate : undefined}
                    onEnded={isActive ? handleVideoEnded : undefined}
                    className="h-full w-full object-cover object-center pointer-events-none"
                  />
                </div>
              ) : (
                <img
                  src={s.imageUrl}
                  alt={s.title}
                  loading={isActive ? "eager" : "lazy"}
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>
          );
        })}

        {/* Premium Left-Side Dark Navy Gradient Overlay (COMMENTED OUT PER REQUEST - DO NOT REMOVE) */}
        {/*
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(2, 12, 30, 0.86) 0%, rgba(2, 12, 30, 0.80) 22%, rgba(2, 12, 30, 0.60) 36%, rgba(2, 12, 30, 0.22) 47%, rgba(2, 12, 30, 0.04) 52%, rgba(2, 12, 30, 0) 56%)",
          }}
        />
        */}

        {/* Very subtle bottom vignette for depth (COMMENTED OUT PER REQUEST - DO NOT REMOVE) */}
        {/*
        <div
          className="absolute inset-x-0 bottom-0 h-24 z-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(0deg, rgba(2, 12, 30, 0.35) 0%, rgba(2, 12, 30, 0) 100%)",
          }}
        />
        */}

        {/* Audio Toggle Button (z-30) */}
        {slide?.videoUrl ? (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="absolute top-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xl transition-all shadow-lg border border-white/20"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-cyan-300" />}
          </button>
        ) : null}

        {/* PRECISE LEFT-ALIGNED HERO CONTENT COLUMN (COMMENTED OUT PER REQUEST - DO NOT REMOVE)
            - Shifted closer to the top (-translate-y-8 to -translate-y-12)
            - Left spacing: 58-64px
            - Max content width: 480-520px
            - Text breaks cleanly after the first word
        */}
        {/*
        <div className="relative z-30 w-full h-full flex items-center justify-start pointer-events-none pl-6 sm:pl-[58px] lg:pl-[64px] pr-6">
          <div className="w-full max-w-[490px] lg:max-w-[520px] flex flex-col items-start text-left space-y-4 sm:space-y-5 pointer-events-auto -translate-y-6 sm:-translate-y-10 lg:-translate-y-12">
            
            {slide.eyebrow ? (
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(2,12,30,0.65)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#38bdf8] border border-cyan-400/25 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                <span>{slide.eyebrow}</span>
              </div>
            ) : null}

            {(() => {
              const title = slide.title || "Siol Collection";
              const words = title.trim().split(" ");
              const firstWord = words[0];
              const remainingWords = words.slice(1).join(" ");

              return (
                <h1 className="text-4xl sm:text-6xl lg:text-[66px] xl:text-[72px] font-bold tracking-tight leading-[1.04] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
                  <span className="block text-white">{firstWord}</span>
                  {remainingWords ? (
                    <span className="block bg-gradient-to-r from-[#2563eb] via-[#38bdf8] to-[#00f2fe] bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(56,189,248,0.35)]">
                      {remainingWords}
                    </span>
                  ) : null}
                </h1>
              );
            })()}

            {slide.tagline ? (
              <p className="text-lg sm:text-xl lg:text-[23px] font-medium text-slate-200/90 leading-snug drop-shadow-sm max-w-[480px]">
                {slide.tagline}
              </p>
            ) : null}

            {slide.priceNote ? (
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-300/90 bg-[rgba(2,12,30,0.6)] border border-amber-400/25 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>{slide.priceNote}</span>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-4 pt-1 sm:pt-2">
              <Button
                asChild
                size="lg"
                className="h-[52px] sm:h-[54px] px-8 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-[15px] sm:text-base shadow-[0_0_24px_rgba(0,113,227,0.5)] hover:shadow-[0_0_32px_rgba(0,113,227,0.7)] transition-all hover:scale-105 active:scale-95"
              >
                <Link to={slide.ctaLink} className="inline-flex items-center gap-2.5">
                  <span>{slide.ctaText || "Explore Now"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              {slide.secondaryCtaText && slide.secondaryCtaLink ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-[52px] sm:h-[54px] px-7 rounded-full bg-[rgba(2,12,30,0.55)] hover:bg-[rgba(2,12,30,0.8)] text-white/95 font-medium text-[15px] sm:text-base border border-white/20 hover:border-cyan-400/40 backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
                >
                  <Link to={slide.secondaryCtaLink}>{slide.secondaryCtaText}</Link>
                </Button>
              ) : null}
            </div>

            {slide.specChips && slide.specChips.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {slide.specChips.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(2,12,30,0.6)] backdrop-blur-md px-3.5 py-1.5 text-xs font-medium text-slate-200 border border-white/15 shadow-xs"
                  >
                    <Zap className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400 shrink-0" />
                    {spec}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        */}

        {/* BOTTOM SAMSUNG-STYLE TAB DOCK (Centered at Bottom) */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 max-w-fit px-4">
          <div className="flex items-center gap-2 sm:gap-4 rounded-full bg-black/50 backdrop-blur-2xl border border-white/20 px-4 py-2 shadow-2xl">
            {/* Tabs */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none">
              {slides.map((s, idx) => {
                const isCurrent = idx === current;

                return (
                  <button
                    key={s._id}
                    type="button"
                    onClick={() => handleSelectSlide(idx)}
                    className={`relative flex flex-col items-center px-2.5 py-1 rounded-full text-xs transition-all shrink-0 ${
                      isCurrent
                        ? "text-white font-semibold"
                        : "text-slate-400 hover:text-white font-normal"
                    }`}
                  >
                    <span className="whitespace-nowrap tracking-tight">{s.tabLabel}</span>
                    {/* Active Timer Progress Line */}
                    <div className="mt-1 h-0.5 w-full bg-white/20 rounded-full overflow-hidden">
                      {isCurrent ? (
                        <div
                          className="h-full bg-cyan-400 transition-all duration-75 ease-linear rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="h-4 w-px bg-white/20" />

            {/* Play/Pause & Chevron Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/20 text-white transition"
              >
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              </button>

              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous slide"
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/20 text-white transition"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next slide"
                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/20 text-white transition"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;
