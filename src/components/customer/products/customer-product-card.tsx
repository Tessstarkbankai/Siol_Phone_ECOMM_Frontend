import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useAuth } from "@clerk/react";
import {
  extractSalePrice,
  getCoverImage,
  getSwatchColor,
} from "@/features/customer/products/product-list.shared";
import type { CustomerProduct } from "@/features/customer/products/types";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store";
import { toast } from "sonner";

type CustomerProductCardProps = {
  product: CustomerProduct;
};

export function CustomerProductCard({ product }: CustomerProductCardProps) {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } =
    useCustomerWishlistStore((state) => state);
  const { addItem: addToCart, setOpen: setCartOpen } =
    useCustomerCartAndCheckoutStore((state) => state);

  const isWishlisted = wishlistItems.some((w) => w.productId === product._id);
  const coverImage = getCoverImage(product);
  const salePrice = extractSalePrice(product);

  const originalPrice =
    product.price > salePrice
      ? product.price
      : Math.round(salePrice * (1 + (product.salePercentage > 0 ? product.salePercentage / 100 : 0.25)));
  const savings = originalPrice - salePrice;
  const exchangeDiscount = salePrice >= 120000 ? 8000 : 7000;
  const emiMonths = salePrice >= 120000 ? 24 : 18;

  // Swatch colors (use product colors or curated aesthetic neutrals)
  const colors =
    product.colors && product.colors.length > 0
      ? product.colors
      : ["#f5d0b5", "#374151", "#e5e7eb"];

  async function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      toast.error("Please login to save items to your wishlist");
      navigate("/sign-in");
      return;
    }

    if (isWishlisted) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id);
    }
  }

  async function handleQuickAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    try {
      const chosenColor = colors[selectedColorIdx] || colors[0];
      const chosenSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;

      await addToCart(
        {
          productId: product._id,
          quantity: 1,
          color: chosenColor,
          size: chosenSize,
          title: product.title,
          brand: product.brand,
          image: coverImage || "",
          finalPrice: salePrice,
        },
        Boolean(isSignedIn),
      );

      setCartOpen(true);
    } catch {
      toast.error("Failed to add product to cart");
    }
  }

  return (
    <div className="group relative flex h-full flex-col justify-between rounded-2xl sm:rounded-3xl border border-neutral-100 bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 hover:shadow-xl hover:border-neutral-200">
      {/* Top Half: Image & Color Swatches */}
      <div>
        {/* Product Image: Isolated product render, NO BOX CONTAINER */}
        <div className="relative aspect-square max-h-[200px] sm:max-h-[230px] w-full flex items-center justify-center p-2">
          {/* Subtle Wishlist Heart */}
          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-1 right-1 z-10 flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 hover:text-red-500 hover:bg-neutral-50 transition-colors"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-400"
              }`}
            />
          </button>

          <Link
            to={`/collection/${product._id}`}
            className="h-full w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          >
            {coverImage ? (
              <img
                src={coverImage}
                alt={product.title}
                loading="lazy"
                className="max-h-full max-w-full object-contain select-none filter drop-shadow-sm"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                No Image Available
              </div>
            )}
          </Link>
        </div>

        {/* Color Swatches (Centered directly below image) */}
        <div className="flex items-center justify-center gap-2.5 my-3 h-5">
          {colors.slice(0, 4).map((color, idx) => {
            const isSelected = selectedColorIdx === idx;
            const bg = getSwatchColor(color);

            return (
              <button
                key={color + idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedColorIdx(idx);
                }}
                className={`rounded-full transition-all flex items-center justify-center ${
                  isSelected
                    ? "h-4 w-4 border border-neutral-700 p-0.5"
                    : "h-2.5 w-2.5 hover:scale-125"
                }`}
                title={color}
              >
                <span
                  className="h-full w-full rounded-full border border-black/10 shadow-2xs"
                  style={{ backgroundColor: bg }}
                />
              </button>
            );
          })}
        </div>

        {/* Eyebrow / Promotion Tag */}
        <p className="text-xs sm:text-[13px] font-normal text-neutral-500 mb-1">
          With Gift
        </p>

        {/* Product Title */}
        <Link
          to={`/collection/${product._id}`}
          className="block text-xl sm:text-2xl font-normal text-neutral-900 tracking-tight leading-tight line-clamp-2 min-h-[56px] hover:text-neutral-700 transition-colors"
          title={product.title}
        >
          {product.title}
        </Link>
      </div>

      {/* Bottom Half: Price, Bullets & Buy Now Button */}
      <div className="pt-2">
        {/* Price Row */}
        <div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-base sm:text-lg md:text-xl font-bold text-neutral-900">
              From ₹{salePrice.toLocaleString("en-IN")}
            </span>
            {originalPrice > salePrice ? (
              <span className="text-xs sm:text-sm text-neutral-400 line-through font-normal">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            ) : null}
          </div>
          {savings > 0 ? (
            <p className="text-xs sm:text-sm font-semibold text-[#e11d48] mt-0.5">
              Save Up To ₹{savings.toLocaleString("en-IN")}
            </p>
          ) : null}
        </div>

        {/* Subtle Horizontal Divider */}
        <hr className="my-3.5 border-neutral-100" />

        {/* Offer Bullet Points */}
        <ul className="space-y-1 text-xs sm:text-[13px] text-neutral-600 font-normal">
          <li className="flex items-center gap-2 truncate">
            <span className="h-1 w-1 rounded-full bg-neutral-600 shrink-0" />
            <span>₹{exchangeDiscount.toLocaleString("en-IN")} Off on Exchange</span>
          </li>
          <li className="flex items-center gap-2 truncate">
            <span className="h-1 w-1 rounded-full bg-neutral-600 shrink-0" />
            <span>Up to {emiMonths} Months No Cost EMI</span>
          </li>
        </ul>

        {/* Action Row: Buy Now Black Pill & Quick Add Bag */}
        <div className="mt-4 pt-1 flex items-center justify-between">
          <Link
            to={`/collection/${product._id}`}
            className="inline-flex items-center justify-center rounded-full bg-black hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm px-6 py-2.5 h-9 shadow-xs transition-colors cursor-pointer"
          >
            Buy now
          </Link>

          <button
            type="button"
            onClick={handleQuickAddToCart}
            aria-label={`Add ${product.title} to cart`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerProductCard;
