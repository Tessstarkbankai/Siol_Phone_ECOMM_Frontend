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

const AUTO_PLAY_INTERVAL = 8000;

export function HeroCarousel({ banners }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = FLAGSHIP_SLIDES;
  const slide = slides[current];

  useEffect(() => {
    if (!isPlaying) return;

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
  }, [current, isPlaying, slides.length]);

  useEffect(() => {
    if (slide.videoUrl && !getYouTubeId(slide.videoUrl) && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [current, slide.videoUrl]);

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
    setIsPlaying((prev) => !prev);
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
              {/* Media Render (YouTube Embed, HTML5 MP4 Video, or Fallback Image) */}
              {ytId ? (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=${
                      isMuted ? 1 : 0
                    }&loop=1&playlist=${ytId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&playsinline=1&enablejsapi=1`}
                    title={s.title}
                    className="absolute top-1/2 left-1/2 w-[160vw] h-[160vh] min-w-[100%] min-h-[100%] -translate-x-1/2 -translate-y-1/2 object-cover border-0 scale-125 pointer-events-none"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : s.videoUrl ? (
                <video
                  ref={isActive ? videoRef : undefined}
                  src={s.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <img
                  src={s.imageUrl}
                  alt={s.title}
                  className="h-full w-full object-cover object-center"
                />
              )}

              {/* Gentle Top & Bottom Vignettes (Phone Visual Stays Crisp) */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/70 pointer-events-none" />
            </div>
          );
        })}

        {/* Audio Toggle Button */}
        {slide.videoUrl ? (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="absolute top-6 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xl transition-all shadow-lg border border-white/20"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-cyan-300" />}
          </button>
        ) : null}

        {/* CENTER ALIGNED KEYNOTE CONTENT (Vertically & Horizontally Centered) */}
        <div className="relative z-20 mx-auto w-full max-w-4xl px-4 sm:px-6 text-center flex flex-col items-center justify-center space-y-4 pb-14 sm:pb-16 pointer-events-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 drop-shadow-sm bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300 animate-pulse shrink-0" />
            <AuroraText colors={["#38bdf8", "#818cf8", "#67e8f9", "#38bdf8"]}>
              {slide.eyebrow}
            </AuroraText>
          </div>

          {/* Headline with MagicUI AuroraText Effect */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.06] drop-shadow-xl text-center w-full">
            <AuroraText
              colors={slide.auroraColors}
              className="font-bold tracking-tight drop-shadow-2xl text-center"
              speed={1.2}
            >
              {slide.title}
            </AuroraText>
          </h1>

          {/* Subtitle / Tagline (Slight clean translucency text-slate-200/85) */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-200/90 font-normal max-w-xl mx-auto drop-shadow-md text-center leading-relaxed">
            {slide.tagline}
          </p>

          {/* Dual Pill CTA Buttons (Centered) */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <Button
              asChild
              size="sm"
              className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold h-11 px-7 rounded-full shadow-lg shadow-blue-500/25 text-xs sm:text-sm transition-transform hover:scale-105"
            >
              <Link to={slide.ctaLink} className="inline-flex items-center gap-1.5">
                <span>{slide.ctaText}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-white/30 bg-white/10 hover:bg-white/20 text-white/95 font-semibold h-11 px-6 rounded-full backdrop-blur-xl text-xs sm:text-sm transition-transform hover:scale-105"
            >
              <Link to={slide.secondaryCtaLink}>{slide.secondaryCtaText}</Link>
            </Button>
          </div>

          {/* Spec Chips Row (Centered) */}
          <div className="hidden sm:flex items-center justify-center gap-2 pt-2">
            {slide.specChips.map((spec) => (
              <span
                key={spec}
                className="inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-xl px-3.5 py-1 text-[11px] font-medium text-slate-200/90 border border-white/15 shadow-sm"
              >
                <Zap className="h-3 w-3 text-cyan-400 shrink-0" />
                {spec}
              </span>
            ))}
          </div>
        </div>

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
