import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CustomerHomeBanner } from "@/features/customer/home/types";

type HeroCarouselProps = {
  banners: CustomerHomeBanner[];
};

const defaultBanners = [
  {
    _id: "default-1",
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80",
    title: "Smart Air Fryers & Guilt-Free Healthy Cooking",
    subtitle: "Cook with 90% less oil. Rapid 360° air circulation delivers unbeatable crispiness with 8 smart presets.",
    ctaText: "Shop Air Fryers",
    ctaLink: "/collections",
    tag: "FESTIVE SALE • UP TO 40% OFF",
  },
  {
    _id: "default-2",
    imageUrl:
      "https://images.unsplash.com/photo-1584990347449-399a9a3b0485?auto=format&fit=crop&w=1600&q=80",
    title: "Royal Velvet Non-Stick Cookware Sets",
    subtitle: "5-layer MetaTuff non-stick coating on virgin grade aluminum. Induction compatible with soft-touch ergonomic handles.",
    ctaText: "Explore Cookware",
    ctaLink: "/collections",
    tag: "CHEF's CHOICE COLLECTION",
  },
  {
    _id: "default-3",
    imageUrl:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=1600&q=80",
    title: "Regalia 15-Bar Italian Espresso Machines",
    subtitle: "Commercial-grade 15 bar high pressure pump creates rich crema espresso with integrated milk frothing wand.",
    ctaText: "Discover Coffee Makers",
    ctaLink: "/collections",
    tag: "BARISTA ESSENTIALS",
  },
];

export function HeroCarousel({ banners }: HeroCarouselProps) {
  const slides =
    banners && banners.length > 0
      ? banners.map((b, i) => ({
          _id: b._id,
          imageUrl: b.imageUrl,
          title: defaultBanners[i % defaultBanners.length].title,
          subtitle: defaultBanners[i % defaultBanners.length].subtitle,
          ctaText: defaultBanners[i % defaultBanners.length].ctaText,
          ctaLink: defaultBanners[i % defaultBanners.length].ctaLink,
          tag: defaultBanners[i % defaultBanners.length].tag,
        }))
      : defaultBanners;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  function nextSlide() {
    setCurrent((prev) => (prev + 1) % slides.length);
  }

  function prevSlide() {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }

  const slide = slides[current];

  return (
    <div className="relative w-full overflow-hidden bg-neutral-900">
      {/* Background Image Slide with Gradient Overlay */}
      <div className="relative h-[420px] sm:h-[500px] lg:h-[560px] w-full">
        {slides.map((s, index) => (
          <div
            key={s._id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={s.imageUrl}
              alt={s.title}
              className="h-full w-full object-cover object-center filter brightness-[0.7]"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/25 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-white" />
              <span>{slide.tag}</span>
            </div>

            <h1 className="text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.15]">
              {slide.title}
            </h1>

            <p className="text-sm text-neutral-200 sm:text-base leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold h-11 sm:h-12 px-7 rounded-xl shadow-lg shadow-primary/25"
              >
                <Link to={slide.ctaLink} className="inline-flex items-center gap-2">
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold h-11 sm:h-12 px-6 rounded-xl backdrop-blur-md"
              >
                <Link to="/collections">Browse All</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Arrow Navigation */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 border border-white/20 text-white backdrop-blur-md transition hover:bg-black/80"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 border border-white/20 text-white backdrop-blur-md transition hover:bg-black/80"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 transition-all rounded-full ${
                idx === current ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
