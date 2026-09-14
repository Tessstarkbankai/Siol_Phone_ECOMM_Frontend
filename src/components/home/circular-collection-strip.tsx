import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { CustomerHomeCategory } from "@/features/customer/home/types";

type CircularCollectionStripProps = {
  categories: CustomerHomeCategory[];
};

// High-definition transparent & floating device renders matching Apple & Samsung design aesthetics
const CATEGORY_ASSETS: Record<
  string,
  { image: string; fallbackTitle: string; subtitle: string }
> = {
  flagship: {
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=280&q=85",
    fallbackTitle: "Flagships",
    subtitle: "Pro Silicon",
  },
  foldable: {
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=280&q=85",
    fallbackTitle: "Foldables",
    subtitle: "Dual Screen",
  },
  camera: {
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=280&q=85",
    fallbackTitle: "Pro Camera",
    subtitle: "Periscope Zoom",
  },
  gaming: {
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=280&q=85",
    fallbackTitle: "Gaming",
    subtitle: "185Hz Raytrace",
  },
  watch: {
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=280&q=85",
    fallbackTitle: "Smartwatches",
    subtitle: "Cellular Ultra",
  },
  audio: {
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=280&q=85",
    fallbackTitle: "Audio & TWS",
    subtitle: "Spatial Sound",
  },
};

function getAssetForCategory(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("fold") || lower.includes("flip")) return CATEGORY_ASSETS.foldable;
  if (lower.includes("camera")) return CATEGORY_ASSETS.camera;
  if (lower.includes("gaming")) return CATEGORY_ASSETS.gaming;
  if (lower.includes("watch") || lower.includes("band")) return CATEGORY_ASSETS.watch;
  if (lower.includes("audio") || lower.includes("bud") || lower.includes("headphone") || lower.includes("magsafe"))
    return CATEGORY_ASSETS.audio;
  return CATEGORY_ASSETS.flagship;
}

export function CircularCollectionStrip({ categories }: CircularCollectionStripProps) {
  // Curate exactly 6 categories, prioritizing core flagship smartphone and ecosystem departments
  const sixCategories = useMemo(() => {
    if (!categories || categories.length === 0) return [];

    const priorityOrder = [
      "flagship",
      "foldable",
      "camera",
      "gaming",
      "watch",
      "audio",
      "5g",
      "budget",
    ];

    const sorted = [...categories].sort((a, b) => {
      const aLower = a.name.toLowerCase();
      const bLower = b.name.toLowerCase();

      const aIndex = priorityOrder.findIndex((k) => aLower.includes(k));
      const bIndex = priorityOrder.findIndex((k) => bLower.includes(k));

      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    });

    return sorted.slice(0, 6);
  }, [categories]);

  if (!sixCategories || sixCategories.length === 0) return null;

  return (
    <section className="relative w-full py-8 sm:py-10 my-4 select-none font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',sans-serif]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Apple-style Typography Header */}
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Ecosystem Lineup
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 leading-tight">
            Explore Hardware & Ecosystem
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal tracking-normal">
            Precision-engineered smartphones, wearables, and high-fidelity audio.
          </p>
        </div>

        {/* MacBook Dock Floating Glass Container */}
        <div className="flex justify-center pt-2">
          <div className="relative px-5 sm:px-10 py-3.5 sm:py-4 rounded-3xl sm:rounded-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-2xl border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-end justify-center gap-3 sm:gap-6 md:gap-8 flex-wrap sm:flex-nowrap">
            {sixCategories.map((cat) => {
              const asset = getAssetForCategory(cat.name);

              return (
                <Link
                  key={cat._id}
                  to={`/collections?category=${cat._id}`}
                  className="group relative flex flex-col items-center shrink-0 w-[76px] sm:w-[92px] text-center focus:outline-hidden cursor-pointer origin-bottom transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.26] hover:-translate-y-3 z-10 hover:z-30"
                >
                  {/* Apple Squircle Dock Icon Tile */}
                  <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-[22px] sm:rounded-[26px] overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/90 p-2 sm:p-2.5 border border-neutral-200/90 shadow-sm transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/25 group-hover:border-primary/60 group-hover:bg-white">
                    <img
                      src={asset.image}
                      alt={cat.name}
                      className="h-full w-full object-cover object-center rounded-[18px] sm:rounded-[22px] transition-transform duration-300 group-hover:scale-108"
                      loading="lazy"
                    />
                  </div>

                  {/* Category Title in Apple Font */}
                  <span className="mt-2 text-[11px] sm:text-xs font-semibold text-neutral-800 tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-1 max-w-[84px] sm:max-w-[96px]">
                    {cat.name}
                  </span>

                  {/* Active macOS Dock Indicator Dot */}
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CircularCollectionStrip;
