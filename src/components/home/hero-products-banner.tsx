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
  variant?: "smartphone" | "feature_phone";
  badgeText?: string;
  titlePrimary?: string;
  titleAccent?: string;
  description?: string;
  bulletPoints?: string[];
  theme?: "blue" | "amber";
};

const DEFAULT_FEATURE_PHONES: CustomerHomeProduct[] = [
  {
    _id: "fp_siol_classic",
    title: "SiOL Classic 4G VoLTE Keypad Phone",
    brand: "SiOL",
    image: "/categories/feature-phone.png",
    price: 2499,
    finalPrice: 1999,
    salePercentage: 20,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "fp_nokia_3210",
    title: "Nokia 3210 4G Heritage Retro Edition",
    brand: "Nokia",
    image: "/Frame 1984079653.png",
    price: 4499,
    finalPrice: 3999,
    salePercentage: 11,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "fp_jiophone_prima",
    title: "JioPhone Prima 4G Smart Feature Phone",
    brand: "JioPhone",
    image: "/Frame 1984079647.png",
    price: 2999,
    finalPrice: 2599,
    salePercentage: 13,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "fp_siol_power",
    title: "SiOL Power 1000 Marathon Keypad Phone",
    brand: "SiOL",
    image: "/categories/feature-phone.png",
    price: 2799,
    finalPrice: 2299,
    salePercentage: 17,
    createdAt: new Date().toISOString(),
  },
];

export function HeroProductsBanner({
  products = [],
  variant = "smartphone",
  badgeText,
  titlePrimary,
  titleAccent,
  description,
  bulletPoints,
  theme,
}: HeroProductsBannerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isSignedIn } = useAuth();
  const { addItem, setOpen: setCartOpen } = useCustomerCartAndCheckoutStore((state) => state);

  const isFeaturePhone = variant === "feature_phone";
  const activeProducts =
    products.length > 0
      ? products
      : isFeaturePhone
      ? DEFAULT_FEATURE_PHONES
      : [];

  const finalBadge =
    badgeText || (isFeaturePhone ? "THE CLASSIC SERIES" : "THE 2026 FLAGSHIPS");
  const finalTitlePrimary =
    titlePrimary || (isFeaturePhone ? "DURABLE " : "TITANIUM ");
  const finalTitleAccent =
    titleAccent || (isFeaturePhone ? "KEYPAD" : "PRO");
  const finalDescription =
    description ||
    (isFeaturePhone
      ? "Legendary battery endurance meets rugged tactile reliability."
      : "Supreme computing power meets aerospace-grade durability.");
  const finalBullets =
    bulletPoints ||
    (isFeaturePhone
      ? [
          "• Up to 28 Days Standby Battery Life",
          "• Ultra-Loud Box Speaker & Crystal-Clear 4G VoLTE",
        ]
      : [
          "• Snapdragon 8 Elite & Apple A18 Pro Bionic",
          "• 200MP Quad Matrix Optical Nightography",
        ]);

  const finalTheme = theme || (isFeaturePhone ? "amber" : "blue");

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
          brand: item.brand || "SiOL",
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

  // If no products available, return null
  if (!activeProducts || activeProducts.length === 0) return null;

  return (
    <section className="py-6 space-y-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* 1. Top Banner */}
        <div
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8 md:p-12 lg:p-14 min-h-[280px] sm:min-h-[340px] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-slate-900 ${
            finalTheme === "amber"
              ? "bg-gradient-to-br from-[#fffbeb] via-[#ffffff] to-[#fef3c7] border border-amber-200/80"
              : "bg-gradient-to-br from-[#eff6ff] via-[#ffffff] to-[#e0f2fe] border border-blue-200/80"
          }`}
        >
          {/* Left Text Presentation */}
          <div className="space-y-3 max-w-md text-center md:text-left z-10">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-widest ${
                finalTheme === "amber"
                  ? "bg-amber-500/10 border border-amber-200 text-amber-800"
                  : "bg-blue-500/10 border border-blue-200 text-primary"
              }`}
            >
              <Sparkles
                className={`h-3.5 w-3.5 ${
                  finalTheme === "amber" ? "text-amber-600" : "text-primary"
                }`}
              />
              <span>{finalBadge}</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-none">
              {finalTitlePrimary}
              <span
                className={
                  finalTheme === "amber" ? "text-amber-600" : "text-primary"
                }
              >
                {finalTitleAccent}
              </span>
            </h2>

            <p className="text-sm sm:text-base font-normal text-slate-600">
              {finalDescription}
            </p>

            {/* Star Divider Line */}
            <div className="flex items-center justify-center md:justify-start gap-3 py-1 text-slate-400">
              <div
                className={`h-[1px] w-12 ${
                  finalTheme === "amber" ? "bg-amber-200" : "bg-blue-200"
                }`}
              />
              <Star
                className={`h-3 w-3 ${
                  finalTheme === "amber"
                    ? "fill-amber-500 text-amber-500"
                    : "fill-primary text-primary"
                }`}
              />
              <div
                className={`h-[1px] w-12 ${
                  finalTheme === "amber" ? "bg-amber-200" : "bg-blue-200"
                }`}
              />
            </div>

            <div className="space-y-1 text-xs sm:text-sm text-slate-600 font-medium">
              {finalBullets.map((bullet, idx) => (
                <p key={idx}>{bullet}</p>
              ))}
            </div>
          </div>

          {/* Right Composite Lineup with Fixed-Ratio Cards */}
          <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 max-w-xl w-full">
            <div className="flex items-end justify-center gap-2 sm:gap-3 md:gap-4 w-full">
              {activeProducts.slice(0, 3).map((p, idx) => (
                <Link
                  key={p._id}
                  to={`/collection/${p._id}`}
                  className={`group relative rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md p-2 sm:p-3 md:p-4 border shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col items-center justify-center overflow-hidden ${
                    finalTheme === "amber"
                      ? "border-amber-100 hover:border-amber-400/50"
                      : "border-blue-100 hover:border-primary/40"
                  } ${
                    idx === 1
                      ? finalTheme === "amber"
                        ? "h-36 w-28 sm:h-48 sm:w-40 md:h-60 md:w-52 z-10 ring-2 ring-amber-500/30 shadow-amber-500/10"
                        : "h-36 w-28 sm:h-48 sm:w-40 md:h-60 md:w-52 z-10 ring-2 ring-primary/30 shadow-blue-500/10"
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

          {/* Ambient Glow */}
          <div
            className={`absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl pointer-events-none ${
              finalTheme === "amber" ? "bg-amber-300/30" : "bg-blue-300/30"
            }`}
          />
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
