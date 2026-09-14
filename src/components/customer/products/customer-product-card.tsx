import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useAuth } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PriceBlock } from "@/components/ui/price-block";
import { RatingStars } from "@/components/ui/rating-stars";
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
  const [addingCart, setAddingCart] = useState(false);

  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } =
    useCustomerWishlistStore((state) => state);
  const { addItem: addToCart, setOpen: setCartOpen } =
    useCustomerCartAndCheckoutStore((state) => state);

  const isWishlisted = wishlistItems.some((w) => w.productId === product._id);
  const coverImage = getCoverImage(product);
  const salePrice = extractSalePrice(product);

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
      setAddingCart(true);
      const chosenColor = product.colors && product.colors.length > 0 ? product.colors[0] : undefined;
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
    } finally {
      setAddingCart(false);
    }
  }

  const defaultStorage = product.sizes && product.sizes.length > 0 ? product.sizes[0] : "";
  const monthlyEmi = Math.round(salePrice / 24);

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-blue-500/10">
      {/* Product Image Area: Proportional & Compact */}
      <Link
        to={`/collection/${product._id}`}
        className="relative aspect-square max-h-[210px] sm:max-h-[220px] w-full overflow-hidden rounded-t-2xl bg-gradient-to-b from-slate-50/70 via-white to-blue-50/20 block p-3.5 sm:p-4 flex items-center justify-center"
      >
        {coverImage ? (
          <img
            src={coverImage}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105 select-none filter drop-shadow-xs"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground bg-neutral-50 rounded-xl w-full">
            No Image Available
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.salePercentage > 0 ? (
            <span className="rounded-md bg-primary text-white text-[10px] font-bold px-2 py-0.5 shadow-xs uppercase tracking-wider">
              {product.salePercentage}% OFF
            </span>
          ) : null}
          {defaultStorage ? (
            <span className="rounded-md bg-white/95 backdrop-blur-md text-primary text-[10px] font-semibold px-2 py-0.5 border border-blue-200 shadow-2xs">
              {defaultStorage}
            </span>
          ) : null}
          {product.stock <= 5 && product.stock > 0 ? (
            <span className="rounded-md bg-amber-500 text-white text-[9px] font-semibold px-2 py-0.5 shadow-xs">
              Only {product.stock} Left
            </span>
          ) : null}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white border border-neutral-200 cursor-pointer"
        >
          <Heart
            className={`h-3.5 w-3.5 transition-colors ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-neutral-600 hover:text-red-500"
            }`}
          />
        </button>
      </Link>

      {/* Product Information */}
      <CardContent className="flex flex-1 flex-col justify-between p-3.5 sm:p-4 space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary truncate max-w-[120px]">
              {product.brand}
            </span>
            <RatingStars rating={4.9} count={68} size="sm" />
          </div>

          <Link
            to={`/collection/${product._id}`}
            className="block"
            title={product.title}
          >
            <h3 className="line-clamp-1 text-sm font-bold text-neutral-900 transition-colors group-hover:text-primary tracking-tight">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Action */}
        <div className="space-y-2 pt-1.5 border-t border-neutral-100">
          <div className="flex items-baseline justify-between gap-1 flex-wrap">
            <PriceBlock
              price={product.price}
              finalPrice={salePrice}
              salePercentage={product.salePercentage}
              size="sm"
            />
            <span className="text-[10px] font-semibold text-emerald-600">
              EMI from ₹{monthlyEmi.toLocaleString("en-IN")}/mo
            </span>
          </div>

          {/* Color Swatches if any */}
          {product.colors && product.colors.length > 0 ? (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color}
                  className="h-3 w-3 rounded-full border border-neutral-300 shadow-2xs"
                  style={{ backgroundColor: getSwatchColor(color) }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 ? (
                <span className="text-[9px] text-muted-foreground">
                  +{product.colors.length - 4}
                </span>
              ) : null}
            </div>
          ) : null}

          {/* Quick Add to Cart CTA */}
          <Button
            onClick={handleQuickAddToCart}
            disabled={addingCart || product.stock === 0}
            size="sm"
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl h-9 shadow-xs transition gap-1.5 mt-1 text-xs cursor-pointer"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CustomerProductCard;
