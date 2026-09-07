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
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-blue-100/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-blue-500/10">
      {/* Product Image Area */}
      <Link to={`/collection/${product._id}`} className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[24px] bg-gradient-to-b from-blue-50/40 via-white to-blue-50/20 block p-4">
        {coverImage ? (
          <img
            src={coverImage}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain object-center rounded-2xl transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground bg-neutral-50 rounded-2xl">
            No Image Available
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.salePercentage > 0 ? (
            <span className="rounded-full bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 shadow-sm uppercase tracking-wider">
              {product.salePercentage}% OFF
            </span>
          ) : null}
          {defaultStorage ? (
            <span className="rounded-full bg-white/95 backdrop-blur-md text-primary text-[10px] font-medium px-2.5 py-0.5 border border-blue-200 shadow-2xs">
              {defaultStorage}
            </span>
          ) : null}
          {product.stock <= 5 && product.stock > 0 ? (
            <span className="rounded-full bg-amber-500 text-white text-[9px] font-medium px-2 py-0.5 shadow-sm">
              Only {product.stock} Left
            </span>
          ) : null}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white border border-blue-100"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-neutral-600 hover:text-red-500"
            }`}
          />
        </button>
      </Link>

      {/* Product Information */}
      <CardContent className="flex flex-1 flex-col justify-between p-4 sm:p-5 space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              {product.brand}
            </span>
            <RatingStars rating={4.9} count={68} size="sm" />
          </div>

          <Link
            to={`/collection/${product._id}`}
            className="block"
            title={product.title}
          >
            <h3 className="line-clamp-2 text-sm sm:text-base font-semibold text-foreground transition-colors group-hover:text-primary leading-snug tracking-tight">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Swatches */}
        <div className="space-y-2.5 pt-2 border-t border-border/60">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <PriceBlock
              price={product.price}
              finalPrice={salePrice}
              salePercentage={product.salePercentage}
              size="md"
            />
            <span className="text-[10px] font-bold text-emerald-600">
              EMI from ₹{monthlyEmi.toLocaleString("en-IN")}/mo
            </span>
          </div>

          {/* Color swatches if any */}
          {product.colors && product.colors.length > 0 ? (
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color}
                  className="h-3.5 w-3.5 rounded-full border border-border/80 shadow-xs"
                  style={{ backgroundColor: getSwatchColor(color) }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 ? (
                <span className="text-[10px] text-muted-foreground">
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
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl h-10 shadow-sm transition gap-2 mt-2 text-xs"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CustomerProductCard;
