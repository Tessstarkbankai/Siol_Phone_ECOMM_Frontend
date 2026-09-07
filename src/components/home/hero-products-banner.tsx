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
      const chosenColor = item.colors && item.colors.length > 0 ? item.colors[0] : undefined;
      const chosenSize = item.sizes && item.sizes.length > 0 ? (item.sizes[0] as any) : undefined;

      await addItem(
        {
          productId: item._id,
          quantity: 1,
          color: chosenColor,
          size: chosenSize,
          title: item.title,
          brand: item.brand || "Wonderchef",
          image: item.image,
          finalPrice: item.finalPrice,
        },
        Boolean(isSignedIn),
      );
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
        {/* 1. Top Flagship Titanium Series Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#eff6ff] via-[#ffffff] to-[#e0f2fe] border border-blue-200/80 shadow-lg p-8 sm:p-12 lg:p-14 min-h-[340px] flex flex-col md:flex-row items-center justify-between gap-8 text-slate-900">
          {/* Left Text Presentation */}
          <div className="space-y-3 max-w-md text-center md:text-left z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-200 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>THE 2026 FLAGSHIPS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-none">
              TITANIUM <span className="text-primary">PRO</span>
            </h2>
            <p className="text-sm sm:text-base font-normal text-slate-600">
              Supreme computing power meets aerospace-grade durability.
            </p>

            {/* Star Divider Line */}
            <div className="flex items-center justify-center md:justify-start gap-3 py-1 text-slate-400">
              <div className="h-[1px] w-12 bg-blue-200" />
              <Star className="h-3 w-3 fill-primary text-primary" />
              <div className="h-[1px] w-12 bg-blue-200" />
            </div>

            <div className="space-y-1 text-xs sm:text-sm text-slate-600 font-medium">
              <p>• Snapdragon 8 Elite & Apple A18 Pro Bionic</p>
              <p>• 200MP Quad Matrix Optical Nightography</p>
            </div>
          </div>

          {/* Right Composite Smartphone Lineup with Fixed-Ratio Cards */}
          <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-4 max-w-xl w-full">
            <div className="flex items-end justify-center gap-3 sm:gap-4 w-full">
              {products.slice(0, 3).map((p, idx) => (
                <Link
                  key={p._id}
                  to={`/collection/${p._id}`}
                  className={`group relative rounded-3xl bg-white/95 backdrop-blur-md p-3 sm:p-4 border border-blue-100 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1.5 flex flex-col items-center justify-center overflow-hidden ${
                    idx === 1
                      ? "h-48 w-40 sm:h-60 sm:w-52 z-10 ring-2 ring-primary/30 shadow-blue-500/10"
                      : "h-38 w-32 sm:h-48 sm:w-40 opacity-95"
                  }`}
                >
                  <div className="h-full w-full flex items-center justify-center overflow-hidden rounded-2xl">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md rounded-2xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="absolute bottom-2 px-2.5 py-0.5 rounded-full bg-slate-900/90 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md border border-white/20 truncate max-w-[90%]">
                    {p.brand} {p.title.split(" ")[1] || ""}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Subtle Frosty Blue Glow */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl pointer-events-none" />
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
              const defaultStorage = item.sizes && item.sizes.length > 0 ? item.sizes[0] : "256GB";

              return (
                <div
                  key={item._id}
                  className="w-[320px] sm:w-[380px] shrink-0 rounded-3xl bg-white p-6 border border-neutral-200/90 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="flex gap-4 items-start">
                    {/* Left: Product Image in Fixed Uniform Square Card */}
                    <Link
                      to={`/collection/${item._id}`}
                      className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-2xl bg-neutral-50 p-2.5 border border-neutral-200/70 shadow-xs flex items-center justify-center overflow-hidden group hover:border-primary/40 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain filter drop-shadow-md rounded-xl transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>

                    {/* Right: Product Info & Dynamic Badge */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary text-white">
                          {item.salePercentage >= 50
                            ? "PREBOOK"
                            : item.salePercentage > 0
                            ? `${item.salePercentage}% OFF`
                            : "FLAGSHIP"}
                        </span>
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                          {defaultStorage}
                        </span>
                      </div>

                      <Link
                        to={`/collection/${item._id}`}
                        className="block font-black text-neutral-900 leading-tight truncate hover:text-primary transition-colors text-base sm:text-lg"
                        title={item.title}
                      >
                        {item.title}
                      </Link>

                      <p className="text-xs font-semibold text-neutral-600 line-clamp-1">
                        {item.brand} • 5G Flagship
                      </p>

                      {item.description ? (
                        <p className="text-[11px] text-neutral-500 line-clamp-2 leading-snug pt-0.5">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Bottom: Price, EMI & Quick Add Button */}
                  <div className="flex items-end justify-between pt-4 mt-3 border-t border-neutral-100">
                    <div>
                      <p className="text-lg font-black text-neutral-900">
                        {formatPrice(item.finalPrice)}
                      </p>
                      <div className="flex items-center gap-2">
                        {hasDiscount ? (
                          <p className="text-[11px] text-neutral-400 line-through font-medium">
                            MRP: {formatPrice(item.price)}
                          </p>
                        ) : null}
                        <span className="text-[10px] text-emerald-600 font-bold">
                          No-Cost EMI
                        </span>
                      </div>
                    </div>

                    {/* Blue Shopping Cart Button */}
                    <button
                      type="button"
                      onClick={() => void handleQuickAdd(item)}
                      aria-label={`Add ${item.title} to cart`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-primary/20 transition-transform duration-200 hover:bg-primary/90 hover:scale-110 active:scale-95"
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
