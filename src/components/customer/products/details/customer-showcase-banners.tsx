import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from "lucide-react";
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

  return (
    <section className="mt-14 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-foreground">
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
              className="h-8 w-8 rounded-full border-neutral-300 hover:bg-neutral-100 cursor-pointer"
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
              className="h-8 w-8 rounded-full border-neutral-300 hover:bg-neutral-100 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        ) : null}
      </div>

      {/* Main Wide Banner Display */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-neutral-950 aspect-[21/9] sm:aspect-[24/9] shadow-lg group">
        <img
          src={imagesToShow[currentIndex].url}
          alt={`${productTitle} Showcase Banner ${currentIndex + 1}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-102"
        />

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white pointer-events-none">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white inline-block mb-1">
              Design & Precision
            </span>
            <p className="text-sm font-semibold drop-shadow-md line-clamp-1">
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
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-6 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
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
