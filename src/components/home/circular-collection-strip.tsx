import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CustomerHomeCategory } from "@/features/customer/home/types";

type CircularCollectionStripProps = {
  categories: CustomerHomeCategory[];
};

// Curated high-res imagery matching Apple & Samsung phone departments
const categoryImages: Record<string, string> = {
  "flagship": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=240&q=80",
  "foldables": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=240&q=80",
  "camera": "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=240&q=80",
  "gaming": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=240&q=80",
  "5g": "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=240&q=80",
  "budget": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=240&q=80",
  "watch": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=240&q=80",
  "audio": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=240&q=80",
  "buds": "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=240&q=80",
  "magsafe": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=240&q=80",
  "power": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=240&q=80",
  "charger": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=240&q=80",
  "case": "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=240&q=80",
  "tablet": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=240&q=80",
  "ipad": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=240&q=80",
};

function getCategoryImage(name: string): string {
  const lower = name.toLowerCase().trim();
  for (const [key, url] of Object.entries(categoryImages)) {
    if (lower.includes(key) || key.includes(lower)) {
      return url;
    }
  }
  return "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=240&q=80";
}

export function CircularCollectionStrip({ categories }: CircularCollectionStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!categories || categories.length === 0) return null;

  function scroll(direction: "left" | "right") {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  }

  return (
    <div className="relative w-full border-b border-neutral-200/80 bg-neutral-50/60 py-6 sm:py-8 my-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Rail Heading */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-neutral-500">
            Explore Hardware & Ecosystem
          </span>
          <Link
            to="/collections"
            className="text-xs font-bold text-primary hover:underline"
          >
            All Products →
          </Link>
        </div>

        {/* Scrollable Container with Arrows */}
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-800 shadow-md transition hover:bg-neutral-50 hover:text-primary hover:scale-105"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Scrollable Rail */}
          <div
            ref={scrollRef}
            className="flex items-start gap-4 sm:gap-6 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat) => {
              const imgUrl = getCategoryImage(cat.name);

              return (
                <Link
                  key={cat._id}
                  to={`/collections?category=${cat._id}`}
                  className="group flex flex-col items-center shrink-0 w-[88px] sm:w-[104px] text-center focus:outline-hidden"
                >
                  {/* Tech Icon Tile */}
                  <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl overflow-hidden bg-white p-2 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:border-primary/50 border border-neutral-200/90 shadow-2xs">
                    <img
                      src={imgUrl}
                      alt={cat.name}
                      className="h-full w-full object-cover object-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Category Title */}
                  <span className="mt-2.5 text-xs sm:text-[13px] font-bold text-neutral-800 leading-tight group-hover:text-primary transition-colors line-clamp-2">
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
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-white border border-neutral-200 text-neutral-800 shadow-md transition hover:bg-neutral-50 hover:text-primary hover:scale-105"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CircularCollectionStrip;
