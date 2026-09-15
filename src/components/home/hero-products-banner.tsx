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
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#eff6ff] via-[#ffffff] to-[#e0f2fe] border border-blue-200/80 shadow-lg p-5 sm:p-8 md:p-12 lg:p-14 min-h-[280px] sm:min-h-[340px] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-slate-900">
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
          <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 max-w-xl w-full">
            <div className="flex items-end justify-center gap-2 sm:gap-3 md:gap-4 w-full">
              {products.slice(0, 3).map((p, idx) => (
                <Link
                  key={p._id}
                  to={`/collection/${p._id}`}
                  className={`group relative rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md p-2 sm:p-3 md:p-4 border border-blue-100 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1.5 flex flex-col items-center justify-center overflow-hidden ${
                    idx === 1
                      ? "h-36 w-28 sm:h-48 sm:w-40 md:h-60 md:w-52 z-10 ring-2 ring-primary/30 shadow-blue-500/10"
                      : "h-28 w-22 sm:h-38 sm:w-32 md:h-48 md:w-40 opacity-95"
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

          {/* Horizontal Product Cards Rail */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-5 overflow-x-auto py-3 px-1 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((item) => {
              const originalPrice =
                item.price > item.finalPrice
                  ? item.price
                  : Math.round(item.finalPrice * 1.25);
              const savings = originalPrice - item.finalPrice;
              const exchangeDiscount = item.finalPrice >= 120000 ? 8000 : 7000;
              const emiMonths = item.finalPrice >= 120000 ? 24 : 18;

              return (
                <div
                  key={item._id}
                  className="group relative w-[240px] sm:w-[280px] md:w-[310px] shrink-0 rounded-2xl sm:rounded-3xl border border-neutral-100 bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-neutral-200 flex flex-col justify-between"
                >
                  {/* Top: Image, Swatches, Eyebrow & Title */}
                  <div>
                    {/* Pure Image - NO BOX CONTAINER */}
                    <Link
                      to={`/collection/${item._id}`}
                      className="relative aspect-square max-h-[190px] w-full flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain filter drop-shadow-sm select-none"
                      />
                    </Link>

                    {/* Color Swatches (Centered) */}
                    <div className="flex items-center justify-center gap-2 my-3 h-5">
                      <span className="h-4 w-4 rounded-full border border-neutral-700 p-0.5 flex items-center justify-center">
                        <span className="h-full w-full rounded-full bg-[#f5d0b5]" />
                      </span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#374151]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7eb]" />
                    </div>

                    {/* Eyebrow */}
                    <p className="text-xs font-normal text-neutral-500 mb-1">
                      With Gift
                    </p>

                    {/* Title */}
                    <Link
                      to={`/collection/${item._id}`}
                      className="block text-lg sm:text-xl font-normal text-neutral-900 tracking-tight leading-tight line-clamp-2 min-h-[50px] hover:text-neutral-700 transition-colors"
                      title={item.title}
                    >
                      {item.title}
                    </Link>
                  </div>

                  {/* Bottom: Price, Bullets & Buy Now Button */}
                  <div className="pt-2">
                    <div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-base sm:text-lg font-bold text-neutral-900">
                          From {formatPrice(item.finalPrice)}
                        </span>
                        {originalPrice > item.finalPrice ? (
                          <span className="text-xs text-neutral-400 line-through font-normal">
                            {formatPrice(originalPrice)}
                          </span>
                        ) : null}
                      </div>
                      {savings > 0 ? (
                        <p className="text-xs font-semibold text-[#e11d48] mt-0.5">
                          Save Up To {formatPrice(savings)}
                        </p>
                      ) : null}
                    </div>

                    {/* Subtle Divider */}
                    <hr className="my-3 border-neutral-100" />

                    {/* Bullets */}
                    <ul className="space-y-1 text-xs text-neutral-600 font-normal">
                      <li className="flex items-center gap-2 truncate">
                        <span className="h-1 w-1 rounded-full bg-neutral-600 shrink-0" />
                        <span>₹{exchangeDiscount.toLocaleString("en-IN")} Off on Exchange</span>
                      </li>
                      <li className="flex items-center gap-2 truncate">
                        <span className="h-1 w-1 rounded-full bg-neutral-600 shrink-0" />
                        <span>Up to {emiMonths} Months No Cost EMI</span>
                      </li>
                    </ul>

                    {/* Action: Buy now black pill & quick add */}
                    <div className="mt-4 pt-1 flex items-center justify-between">
                      <Link
                        to={`/collection/${item._id}`}
                        className="inline-flex items-center justify-center rounded-full bg-black hover:bg-neutral-800 text-white font-medium text-xs px-5 py-2 h-9 shadow-xs transition-colors cursor-pointer"
                      >
                        Buy now
                      </Link>

                      <button
                        type="button"
                        onClick={() => void handleQuickAdd(item)}
                        aria-label={`Add ${item.title} to cart`}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
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
