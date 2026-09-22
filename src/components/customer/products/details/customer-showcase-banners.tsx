import { Sparkles } from "lucide-react";

type CustomerShowcaseBannersProps = {
  banners?: Array<{ url: string; publicId: string }>;
  fallbackImages?: Array<{ url: string; publicId: string }>;
  productTitle: string;
};

export function CustomerShowcaseBanners({
  banners,
  productTitle,
}: CustomerShowcaseBannersProps) {
  // Only display if showcase banners are explicitly provided for this product
  // If no images exist for that product, the section will not be visible
  const imagesToShow = banners && banners.length > 0 ? banners : [];

  if (!imagesToShow.length) {
    return null;
  }

  // Evenly distribute images according to their number
  const getGridColsClass = (count: number) => {
    if (count === 1) return "grid-cols-1 max-w-xl mx-auto";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2";
    if (count === 3) return "grid-cols-1 sm:grid-cols-3";
    if (count === 4) return "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4";
    return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3";
  };

  return (
    <section className="mt-12 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-none bg-primary/10 text-primary flex items-center justify-center">
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

      {/* Square Grid (No visible container, unrounded images with shadows, evenly distributed) */}
      <div className={`grid gap-4 sm:gap-6 ${getGridColsClass(imagesToShow.length)}`}>
        {imagesToShow.map((banner, idx) => (
          <div
            key={banner.publicId || idx}
            className="relative aspect-square overflow-hidden rounded-none shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer bg-white dark:bg-slate-900"
          >
            <img
              src={banner.url}
              alt={`${productTitle} Feature Showcase ${idx + 1}`}
              className="w-full h-full object-cover rounded-none transition-transform duration-500 ease-out group-hover:scale-105 select-none"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default CustomerShowcaseBanners;
