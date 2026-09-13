import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type CustomerShowcaseBannersProps = {
  banners?: Array<{ url: string; publicId: string }>;
  fallbackImages?: Array<{ url: string; publicId: string }>;
  productTitle: string;
};

export function CustomerShowcaseBanners({
  banners,
  fallbackImages,
  productTitle,
}: CustomerShowcaseBannersProps) {
  // Use showcaseBanners if provided, else use secondary product images if more than 1
  const imagesToShow =
    banners && banners.length > 0
      ? banners
      : fallbackImages && fallbackImages.length > 1
      ? fallbackImages.slice(1) // skip cover image
      : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!imagesToShow.length) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagesToShow.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imagesToShow.length - 1 ? 0 : prev + 1));
  };

  const currentBanner = imagesToShow[currentIndex];

  return (
    <section className="mt-12 space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              Official Feature Showcase
            </h3>
            <p className="text-[11px] text-muted-foreground">
              High-resolution product highlights & showcase gallery for {productTitle}
            </p>
          </div>
        </div>

        {imagesToShow.length > 1 ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="h-8 w-8 rounded-full border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              title="Previous showcase image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-xs font-semibold text-neutral-500 min-w-12 text-center">
              {currentIndex + 1} / {imagesToShow.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="h-8 w-8 rounded-full border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
              title="Next showcase image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </div>

      {/* Main Wide Showcase Banner Frame */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-[#09090b] shadow-md flex items-center justify-center min-h-[280px] sm:min-h-[380px] max-h-[540px] aspect-[16/9] sm:aspect-[16/8] group">
        {/* Ambient blurred glow background that dynamically blends banner colors */}
        <img
          src={currentBanner.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Main Banner Image: object-contain guarantees NO cropping or slicing of phone graphics */}
        <img
          src={currentBanner.url}
          alt={`${productTitle} Showcase Banner ${currentIndex + 1}`}
          className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
        />

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none z-20" />

        {/* Floating Details & Dots Overlay */}
        <div className="absolute bottom-3.5 left-5 right-5 flex items-end justify-between text-white z-30 pointer-events-none">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white inline-block mb-1">
              Design & Precision
            </span>
            <p className="text-xs sm:text-sm font-semibold drop-shadow-md line-clamp-1">
              {productTitle}
            </p>
          </div>

          {imagesToShow.length > 1 ? (
            <div className="flex items-center gap-1.5 pointer-events-auto">
              {imagesToShow.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? "w-6 bg-white shadow-sm"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default CustomerShowcaseBanners;
