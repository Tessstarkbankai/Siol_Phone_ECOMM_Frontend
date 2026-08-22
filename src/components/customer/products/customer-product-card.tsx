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
      const chosenColor = product.colors[0] || "Default";
      const chosenSize = product.sizes[0] || "M";

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

      toast.success(`${product.title} added to cart!`);
      setCartOpen(true);
    } catch {
      toast.error("Failed to add product to cart");
    } finally {
      setAddingCart(false);
    }
  }

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      {/* Product Image Area */}
      <Link to={`/collection/${product._id}`} className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 block">
        {coverImage ? (
          <img
            src={coverImage}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground bg-neutral-100">
            No Image Available
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.salePercentage > 0 ? (
            <span className="rounded-md bg-primary text-white text-[11px] font-black px-2 py-0.5 shadow-sm">
              {product.salePercentage}% OFF
            </span>
          ) : null}
          {product.stock <= 5 && product.stock > 0 ? (
            <span className="rounded-md bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 shadow-sm">
              Only {product.stock} Left
            </span>
          ) : null}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white"
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
      <CardContent className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </span>
            <RatingStars rating={4.8} count={42} size="sm" />
          </div>

          <Link
            to={`/collection/${product._id}`}
            className="block"
            title={product.title}
          >
            <h3 className="line-clamp-2 text-sm font-bold text-foreground transition-colors group-hover:text-primary leading-snug">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Swatches */}
        <div className="space-y-2 pt-1 border-t border-border/50">
          <PriceBlock
            price={product.price}
            finalPrice={salePrice}
            salePercentage={product.salePercentage}
            size="md"
          />

          {/* Color swatches if any */}
          {product.colors && product.colors.length > 0 ? (
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 4).map((color) => (
                <span
                  key={color}
                  className="h-3 w-3 rounded-full border border-border/80 shadow-xs"
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
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-lg h-9 shadow-sm transition gap-2 mt-2"
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
