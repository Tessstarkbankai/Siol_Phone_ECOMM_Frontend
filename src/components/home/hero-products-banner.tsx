import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { ChevronLeft, ChevronRight, ShoppingCart, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store";
import type { CustomerHomeProduct } from "@/features/customer/home/types";
import { formatPrice } from "@/lib/utils";

type HeroProductsBannerProps = {
  products?: CustomerHomeProduct[];
};

export function HeroProductsBanner({ products = [] }: HeroProductsBannerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isSignedIn } = useAuth();
  const { addItem, setOpen: setCartOpen } = useCustomerCartAndCheckoutStore((state) => state);

  function scroll(direction: "left" | "right") {
    if (scrollRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  }

  async function handleQuickAdd(item: CustomerHomeProduct) {
    try {
      await addItem(
        {
          productId: item._id,
          quantity: 1,
          color: "Standard",
          size: "M",
          title: item.title,
          brand: item.brand || "Wonderchef",
          image: item.image,
          finalPrice: item.finalPrice,
        },
        Boolean(isSignedIn),
      );
      toast.success(`${item.title} added to your cart!`);
      setCartOpen(true);
    } catch {
      toast.error("Failed to add product to cart");
    }
  }

  // If no products available in db, return null
  if (!products || products.length === 0) return null;

  return (
    <section className="py-6 space-y-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* 1. Top Flagship Magic Series Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#d5dcce] via-[#e2e7de] to-[#dfe5dc] border border-[#c3ccbe] shadow-sm p-8 sm:p-12 lg:p-14 min-h-[320px] flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Text Presentation */}
          <div className="space-y-3 max-w-md text-center md:text-left z-10">
            <p className="text-xs font-black tracking-[0.35em] uppercase text-neutral-700">
              THE
            </p>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-widest text-neutral-900 leading-none">
              MAGIC
            </h2>
            <p className="text-base sm:text-2xl font-sans font-black tracking-[0.4em] text-neutral-800 uppercase">
              SERIES
            </p>

            {/* Star Divider Line */}
            <div className="flex items-center justify-center md:justify-start gap-3 py-1 text-neutral-600">
              <div className="h-[1px] w-12 bg-neutral-500/60" />
              <Star className="h-3 w-3 fill-neutral-700 text-neutral-700" />
              <div className="h-[1px] w-12 bg-neutral-500/60" />
            </div>

            <div className="space-y-0.5 text-xs sm:text-sm text-neutral-700 font-medium">
              <p>Where Innovation Meets Tradition.</p>
              <p>Crafting Magic in Every Meal.</p>
            </div>
          </div>

          {/* Right Composite Appliance Lineup with Fixed-Ratio Cards */}
          <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 max-w-xl w-full">
            <div className="flex items-end justify-center gap-3 sm:gap-4 w-full">
              {products.slice(0, 3).map((p, idx) => (
                <Link
                  key={p._id}
                  to={`/collection/${p._id}`}
                  className={`group relative rounded-3xl bg-white/90 backdrop-blur-sm p-3 sm:p-4 border border-neutral-200/80 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col items-center justify-center overflow-hidden ${
                    idx === 1
                      ? "h-44 w-36 sm:h-56 sm:w-48 z-10 shadow-lg"
                      : "h-36 w-28 sm:h-44 sm:w-36 opacity-95"
                  }`}
                >
                  <div className="h-full w-full flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <span className="absolute bottom-1.5 px-2 py-0.5 rounded-full bg-neutral-900/80 text-[9px] font-bold text-white uppercase tracking-wider backdrop-blur-xs truncate max-w-[90%]">
                    {p.title.split(" ")[0]} {p.title.split(" ")[1] || ""}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Subtle Background Lighting Element */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/40 blur-3xl pointer-events-none" />
        </div>

        {/* 2. Hero Products Dynamic Small Cards Rail / Carousel from Database */}
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white border border-neutral-300 text-neutral-800 shadow-lg transition hover:bg-neutral-50 hover:text-primary hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Cards Rail Container */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-5 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((item) => {
              const hasDiscount = item.salePercentage > 0;

              return (
                <div
                  key={item._id}
                  className="w-[320px] sm:w-[380px] shrink-0 rounded-3xl bg-[#faf5ef] p-6 border border-amber-900/5 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="flex gap-4 items-start">
                    {/* Left: Product Image in Fixed Uniform Square Card */}
                    <Link
                      to={`/collection/${item._id}`}
                      className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-2xl bg-white p-2.5 border border-neutral-200/70 shadow-xs flex items-center justify-center overflow-hidden group hover:border-primary/40 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>

                    {/* Right: Product Info & Dynamic Badge */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0f9f6e] text-white">
                        {item.salePercentage >= 50
                          ? "PREBOOK"
                          : item.salePercentage > 0
                          ? `${item.salePercentage}% OFF`
                          : "SPOTLIGHT"}
                      </span>

                      <Link
                        to={`/collection/${item._id}`}
                        className="block font-black text-neutral-900 leading-tight truncate hover:text-primary transition-colors text-base sm:text-lg"
                        title={item.title}
                      >
                        {item.title}
                      </Link>

                      <p className="text-xs font-semibold text-neutral-700 line-clamp-1">
                        {item.brand} • Flagship Series
                      </p>

                      {item.description ? (
                        <p className="text-[11px] text-neutral-600 line-clamp-2 leading-snug pt-0.5">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Bottom: Price & Quick Add Button */}
                  <div className="flex items-end justify-between pt-4 mt-3 border-t border-amber-900/10">
                    <div>
                      <p className="text-lg font-black text-neutral-900">
                        {formatPrice(item.finalPrice)}
                      </p>
                      {hasDiscount ? (
                        <p className="text-[11px] text-neutral-500 line-through font-medium">
                          MRP: {formatPrice(item.price)}
                        </p>
                      ) : null}
                    </div>

                    {/* Circular Peach Shopping Cart Button */}
                    <button
                      type="button"
                      onClick={() => void handleQuickAdd(item)}
                      aria-label={`Add ${item.title} to cart`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8d7b7] text-neutral-900 shadow-xs transition-transform duration-200 hover:bg-[#f3caa1] hover:scale-110 active:scale-95"
                    >
                      <ShoppingCart className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white border border-neutral-300 text-neutral-800 shadow-lg transition hover:bg-neutral-50 hover:text-primary hover:scale-110"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroProductsBanner;
