import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CustomerHomeCategory } from "@/features/customer/home/types";

type CircularCollectionStripProps = {
  categories: CustomerHomeCategory[];
};

// Curated high-res imagery matching each Wonderchef appliance category in screenshot
const categoryImages: Record<string, string> = {
  "air fryer": "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=240&q=80",
  "cookware": "https://images.unsplash.com/photo-1584990347449-399a9a3b0485?auto=format&fit=crop&w=240&q=80",
  "smart appliances": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=240&q=80",
  "induction cooktops": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=240&q=80",
  "nutri-blend": "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=240&q=80",
  "cooktops": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=240&q=80",
  "coffee machines": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=240&q=80",
  "mixer grinders": "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=240&q=80",
  "chimney": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=240&q=80",
  "kitchen tools": "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=240&q=80",
  "cookers": "https://images.unsplash.com/photo-1584990347449-399a9a3b0485?auto=format&fit=crop&w=240&q=80",
  "otgs": "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=240&q=80",
};

function getCategoryImage(name: string): string {
  const lower = name.toLowerCase().trim();
  for (const [key, url] of Object.entries(categoryImages)) {
    if (lower.includes(key) || key.includes(lower)) {
      return url;
    }
  }
  return "https://images.unsplash.com/photo-1584990347449-399a9a3b0485?auto=format&fit=crop&w=240&q=80";
}

export function CircularCollectionStrip({ categories }: CircularCollectionStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!categories || categories.length === 0) return null;

  function scroll(direction: "left" | "right") {
    if (scrollRef.current) {
      const offset = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  }

  return (
    <div className="relative w-full border-b border-neutral-200/80 bg-[#ffffff] shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative group">
        {/* Scroll Left Button */}
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-white border border-neutral-300 text-neutral-700 shadow-md transition hover:bg-neutral-50 hover:text-primary hover:scale-105"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Scrollable Rail */}
        <div
          ref={scrollRef}
          className="flex items-start gap-4 sm:gap-6 overflow-x-auto py-4 px-2 scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => {
            const imgUrl = getCategoryImage(cat.name);

            return (
              <Link
                key={cat._id}
                to={`/collections?category=${cat._id}`}
                className="group flex flex-col items-center shrink-0 w-[76px] sm:w-[90px] text-center focus:outline-hidden"
              >
                {/* Round Appliance Icon Circle */}
                <div className="relative flex h-10 w-10 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#f6eee3]  transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:ring-2 group-hover:ring-primary/40 border border-amber-900/10">
                  <img
                    src={imgUrl}
                    alt={cat.name}
                    className="h-full w-full object-cover object-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Appliance Category Title */}
                <span className="mt-2 text-xs sm:text-[13px] font-bold text-neutral-800 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-white border border-neutral-300 text-neutral-700 shadow-md transition hover:bg-neutral-50 hover:text-primary hover:scale-105"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default CircularCollectionStrip;
