import { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PriceBlock } from "@/components/ui/price-block";
import { RatingStars } from "@/components/ui/rating-stars";
import { Separator } from "@/components/ui/separator";
import { extractSalePrice } from "@/features/customer/products/product-list.shared";
import type {
  CustomerProduct,
  ProductSize,
} from "@/features/customer/products/types";
import CustomerProductOptionsGroup from "./customer-product-options-group";

type CustomerProductDetailsSummaryProps = {
  product: CustomerProduct;
  selectedColor: string;
  selectedSize: string;
  setSelectedColor: (value: string) => void;
  setSelectedSize: (value: ProductSize) => void;
  toggleWishlist: () => Promise<void>;
  isWishlistActive: boolean;
  onAddToCart: () => Promise<void>;
};

export function CustomerProductDetailsSummary({
  product,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  toggleWishlist,
  isWishlistActive,
  onAddToCart,
}: CustomerProductDetailsSummaryProps) {
  const [activeTab, setActiveTab] = useState<string>("desc");
  const salePrice = extractSalePrice(product);

  return (
    <section className="space-y-6">
      {/* Brand & Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">
            {product?.brand}
          </span>
          <RatingStars rating={4.9} count={86} size="md" />
        </div>

        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl leading-tight">
          {product?.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge variant="secondary" className="bg-neutral-100 text-neutral-800 text-xs font-semibold">
            {product?.category?.name}
          </Badge>

          {product?.stock > 0 ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {product.stock <= 5 ? `Hurry, only ${product.stock} left in stock!` : "In Stock • Ready to Dispatch"}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Price Block */}
      <div className="p-4 rounded-2xl bg-neutral-50 border border-border/80 space-y-2">
        <div className="flex items-baseline justify-between">
          <PriceBlock
            price={product.price}
            finalPrice={salePrice}
            salePercentage={product.salePercentage}
            size="xl"
          />
          <span className="text-xs text-muted-foreground font-medium">Inclusive of all taxes</span>
        </div>

        {product.salePercentage > 0 ? (
          <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <Zap className="h-3.5 w-3.5" />
            You save ₹{product.price - salePrice} on this order today!
          </p>
        ) : null}
      </div>

      {/* Variant Selectors */}
      <div className="space-y-4">
        {product.colors && product.colors.length > 0 ? (
          <CustomerProductOptionsGroup
            values={product.colors}
            selectedValue={selectedColor}
            onSelect={setSelectedColor}
            variant="color"
          />
        ) : null}

        {product.sizes && product.sizes.length > 0 ? (
          <CustomerProductOptionsGroup
            values={product.sizes}
            selectedValue={selectedSize}
            onSelect={setSelectedSize}
            variant="size"
          />
        ) : null}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row pt-2">
        <Button
          type="button"
          disabled={product.stock < 1}
          onClick={() => void onAddToCart()}
          className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-xl shadow-lg shadow-primary/25 transition gap-2"
        >
          <ShoppingBag className="h-5 w-5" />
          <span>{product.stock < 1 ? "Out of Stock" : "Add to Shopping Cart"}</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => void toggleWishlist()}
          className={`h-12 px-5 rounded-xl border-border font-semibold transition gap-2 ${
            isWishlistActive ? "text-red-500 border-red-200 bg-red-50" : ""
          }`}
        >
          <Heart className={`h-5 w-5 ${isWishlistActive ? "fill-red-500 text-red-500" : ""}`} />
          <span>{isWishlistActive ? "Saved" : "Wishlist"}</span>
        </Button>
      </div>

      {/* Trust Badges Row */}
      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/80 text-center">
        <div className="p-3 rounded-xl bg-neutral-50 border border-border/60 space-y-1">
          <Truck className="h-5 w-5 mx-auto text-primary" />
          <p className="text-[11px] font-bold text-foreground">Free Delivery</p>
          <p className="text-[10px] text-muted-foreground">Pan-India express</p>
        </div>

        <div className="p-3 rounded-xl bg-neutral-50 border border-border/60 space-y-1">
          <RotateCcw className="h-5 w-5 mx-auto text-primary" />
          <p className="text-[11px] font-bold text-foreground">7-Day Return</p>
          <p className="text-[10px] text-muted-foreground">Instant pickup</p>
        </div>

        <div className="p-3 rounded-xl bg-neutral-50 border border-border/60 space-y-1">
          <ShieldCheck className="h-5 w-5 mx-auto text-primary" />
          <p className="text-[11px] font-bold text-foreground">2-Yr Warranty</p>
          <p className="text-[10px] text-muted-foreground">100% genuine</p>
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-2 pt-2">
        {/* Description Accordion */}
        <div className="border border-border/80 rounded-xl overflow-hidden bg-card">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "desc" ? "" : "desc")}
            className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-foreground hover:bg-neutral-50 transition"
          >
            <span>Product Description & Features</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${activeTab === "desc" ? "rotate-180" : ""}`} />
          </button>
          {activeTab === "desc" ? (
            <div className="p-4 pt-0 text-sm text-neutral-600 leading-relaxed border-t border-border/40">
              {product.description || "Premium engineered product crafted with high-grade durable materials, designed for timeless performance and daily reliability."}
            </div>
          ) : null}
        </div>

        {/* Shipping & Returns */}
        <div className="border border-border/80 rounded-xl overflow-hidden bg-card">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "shipping" ? "" : "shipping")}
            className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-foreground hover:bg-neutral-50 transition"
          >
            <span>Shipping & Easy 7-Day Returns</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${activeTab === "shipping" ? "rotate-180" : ""}`} />
          </button>
          {activeTab === "shipping" ? (
            <div className="p-4 pt-0 text-sm text-neutral-600 leading-relaxed border-t border-border/40 space-y-2">
              <p>• <strong>Free Delivery:</strong> All orders above ₹999 qualify for fast nationwide dispatch within 24-48 hours.</p>
              <p>• <strong>7-Day Returns:</strong> If you are not completely satisfied, request an instant reverse pickup from your account portal for a full refund or exchange.</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default CustomerProductDetailsSummary;
