import { useMemo, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import type { CustomerHomeCategory } from "@/features/customer/home/types";

type CircularCollectionStripProps = {
  categories: CustomerHomeCategory[];
};

// Curated flagship categories with high-definition, transparent-blended product renders
const DOCK_CATEGORIES = [
  {
    id: "feature-phone",
    name: "Feature Phones",
    image: "/categories/feature-phone.png",
    matchTerms: ["feature", "keypad", "basic", "bar"],
    fallbackLink: "/collections?search=feature",
  },
  {
    id: "smartphone",
    name: "Smartphones",
    image: "/categories/smartphone.png",
    matchTerms: ["smart", "phone", "5g", "android"],
    fallbackLink: "/collections?search=phone",
  },
  {
    id: "headphone",
    name: "Headphones",
    image: "/categories/headphone.png",
    matchTerms: ["headphone", "audio", "tws", "earbud", "sound"],
    fallbackLink: "/collections?search=audio",
  },
  {
    id: "premium-series",
    name: "Premium Series",
    image: "/categories/premium-series.png",
    matchTerms: ["premium", "flagship", "pro", "ultra", "titanium"],
    fallbackLink: "/collections?search=flagship",
  },
  {
    id: "foldable",
    name: "Foldables",
    image: "/categories/foldable.png",
    matchTerms: ["fold", "flip", "dual"],
    fallbackLink: "/collections?search=foldable",
  },
  {
    id: "smartwatch",
    name: "Smartwatches",
    image: "/categories/smartwatch.png",
    matchTerms: ["watch", "band", "wearable"],
    fallbackLink: "/collections?search=watch",
  },
];

export function CircularCollectionStrip({ categories }: CircularCollectionStripProps) {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Map each of the 6 core categories to its backend category ID if available
  const dockItems = useMemo(() => {
    return DOCK_CATEGORIES.map((dockCat) => {
      let matchedId: string | null = null;
      if (categories && categories.length > 0) {
        const found = categories.find((cat) => {
          const lower = cat.name.toLowerCase();
          return dockCat.matchTerms.some((term) => lower.includes(term));
        });
        if (found) {
          matchedId = found._id;
        }
      }

      return {
        ...dockCat,
        link: matchedId ? `/collections?category=${matchedId}` : dockCat.fallbackLink,
      };
    });
  }, [categories]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setMouseX(e.clientX);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
    setHoveredIdx(null);
  }, []);

  const getDockItemStyle = (index: number) => {
    if (mouseX === null) {
      return {
        transform: "scale(1) translateY(0px)",
        transition: "transform 420ms cubic-bezier(0.16, 1, 0.3, 1), filter 420ms ease",
        zIndex: 10,
      };
    }

    const el = itemRefs.current[index];
    if (!el) {
      return {
        transform: "scale(1) translateY(0px)",
        transition: "transform 240ms cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: 10,
      };
    }

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - centerX);
    const maxRadius = 140; // Proximity wave radius in pixels

    if (distance < maxRadius) {
      // Smooth cosine wave like macOS dock: max 1.28x at center, smoothly tapering down to 1.0x
      const norm = distance / maxRadius;
      const wave = (Math.cos(norm * Math.PI) + 1) / 2;
      const scale = 1 + wave * 0.28;
      const translateY = -wave * 14;
      const isPeak = wave > 0.7;

      return {
        transform: `scale(${scale.toFixed(3)}) translateY(${translateY.toFixed(1)}px)`,
        transition: "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: isPeak ? 30 : 20,
      };
    }

    return {
      transform: "scale(1) translateY(0px)",
      transition: "transform 240ms cubic-bezier(0.16, 1, 0.3, 1)",
      zIndex: 10,
    };
  };

  return (
    <section className="relative w-full py-8 sm:py-10 my-4 select-none font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',sans-serif]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Apple-style Typography Header */}
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Ecosystem Lineup
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 leading-tight">
            Explore Hardware &amp; Ecosystem
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal tracking-normal">
            Precision-engineered smartphones, wearables, and high-fidelity audio.
          </p>
        </div>

        {/* MacBook Dock Floating Glass Container */}
        <div className="flex justify-center pt-2">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative px-6 sm:px-12 py-4 sm:py-5 rounded-3xl sm:rounded-[36px] bg-white/85 dark:bg-neutral-900/85 backdrop-blur-2xl border border-neutral-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.08)] flex items-end justify-center gap-3 sm:gap-6 md:gap-8 flex-wrap sm:flex-nowrap"
          >
            {dockItems.map((item, idx) => {
              const itemStyle = getDockItemStyle(idx);
              const isHovered = hoveredIdx === idx;

              return (
                <Link
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  to={item.link}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  style={itemStyle}
                  className="group relative flex flex-col items-center shrink-0 w-[78px] sm:w-[94px] text-center focus:outline-hidden cursor-pointer origin-bottom will-change-transform"
                >
                  {/* Isolated Product Image - NO CONTAINER, NO SQUARE BOX */}
                  <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-[84px] md:w-[84px] items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain filter drop-shadow-md select-none pointer-events-none transition-transform duration-300 group-hover:scale-108"
                      loading="lazy"
                    />
                  </div>

                  {/* Category Title in Apple Font */}
                  <span
                    className={`mt-2 text-[11px] sm:text-xs font-semibold tracking-tight leading-tight transition-colors duration-200 line-clamp-1 max-w-[84px] sm:max-w-[96px] ${
                      isHovered ? "text-primary" : "text-neutral-800"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* Active macOS Dock Indicator Dot */}
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-primary mt-1 transition-all duration-300 ${
                      isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />
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
