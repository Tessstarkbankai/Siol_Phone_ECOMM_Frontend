import { useState } from "react";
import {
  Battery,
  Box,
  Camera,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Heart,
  MapPin,
  Monitor,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PriceBlock } from "@/components/ui/price-block";
import { RatingStars } from "@/components/ui/rating-stars";
import { extractSalePrice } from "@/features/customer/products/product-list.shared";
import type {
  CustomerProduct,
  ProductSize,
} from "@/features/customer/products/types";
import CustomerProductOptionsGroup from "./customer-product-options-group";
import { toast } from "sonner";

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
  const [activeTab, setActiveTab] = useState<string>("specs");
  const [pincode, setPincode] = useState<string>("");
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(false);
  const [hasTradeIn, setHasTradeIn] = useState<boolean>(false);

  const baseSalePrice = extractSalePrice(product);
  const tradeInDiscount = hasTradeIn ? Math.min(15000, Math.round(baseSalePrice * 0.15)) : 0;
  const finalPrice = Math.max(1, baseSalePrice - tradeInDiscount);
  const monthlyEmi = Math.round(finalPrice / 24);

  function handleCheckPincode(e: React.FormEvent) {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeChecked(true);
      toast.success(`Express Delivery available for PIN ${pincode}! Delivery within 24-48 hours.`);
    } else {
      toast.error("Please enter a valid 6-digit Indian PIN code");
    }
  }

  return (
    <section className="space-y-5 sm:space-y-6">
      {/* Brand & Title */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {product?.brand}
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs font-medium text-neutral-600">Official Flagship</span>
          </div>
          <RatingStars rating={4.9} count={94} size="md" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
          {product?.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <Badge variant="secondary" className="bg-neutral-100 text-neutral-800 text-xs font-medium px-2.5 py-0.5 rounded-md">
            {product?.category?.name || "Flagship Smartphone"}
          </Badge>

          {product?.stock > 0 ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {product.stock <= 5 ? `Only ${product.stock} units left in stock!` : "In Stock • Official Brand Sealed"}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Price Block with EMI tag */}
      <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/60 border border-border/80 space-y-2.5">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <PriceBlock
            price={product.price}
            finalPrice={finalPrice}
            salePercentage={product.salePercentage}
            size="xl"
          />
          <span className="text-xs text-muted-foreground font-medium">Inclusive of all taxes & GST</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          {product.salePercentage > 0 || hasTradeIn ? (
            <p className="font-bold text-emerald-600 flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" />
              You save ₹{(product.price - finalPrice).toLocaleString("en-IN")} on this order!
            </p>
          ) : null}

          <span className="font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
            ⚡ 0% No-Cost EMI from ₹{monthlyEmi.toLocaleString("en-IN")}/month
          </span>
        </div>
      </div>

      {/* Storage Capacity Selector */}
      {product.sizes && product.sizes.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-foreground">
              Storage Capacity: <strong className="text-primary font-bold">{selectedSize || product.sizes[0]}</strong>
            </span>
            <span className="text-neutral-500">NVMe High-Speed Storage</span>
          </div>
          <CustomerProductOptionsGroup
            values={product.sizes}
            selectedValue={selectedSize}
            onSelect={setSelectedSize}
            variant="size"
          />
        </div>
      ) : null}

      {/* Color / Finish Selector */}
      {product.colors && product.colors.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold uppercase tracking-wider text-foreground">
              Finish / Color: <strong className="text-primary font-bold capitalize">{selectedColor || product.colors[0]}</strong>
            </span>
            <span className="text-neutral-500">Aerospace Grade Coating</span>
          </div>
          <CustomerProductOptionsGroup
            values={product.colors}
            selectedValue={selectedColor}
            onSelect={setSelectedColor}
            variant="color"
          />
        </div>
      ) : null}

      {/* Interactive Smartphone Trade-in Estimator */}
      <div className="p-4 rounded-2xl border border-primary/20 bg-primary/5 space-y-2.5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Instant Smartphone Exchange Bonus
            </p>
            <p className="text-[11px] text-muted-foreground">
              Trade in your old Apple, Samsung, or OnePlus smartphone for instant discount.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setHasTradeIn(!hasTradeIn)}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
              hasTradeIn
                ? "bg-primary text-white border-primary"
                : "bg-white text-primary border-primary/30 hover:bg-primary/10"
            }`}
          >
            {hasTradeIn ? "✓ Applied -₹" + tradeInDiscount.toLocaleString("en-IN") : "+ Add Trade-In"}
          </button>
        </div>
      </div>

      {/* Pincode Delivery Check */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          Delivery & Installation Availability
        </label>
        <form onSubmit={handleCheckPincode} className="flex gap-2 max-w-sm">
          <Input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter 6-digit PIN code"
            className="h-10 text-xs rounded-xl"
          />
          <Button type="submit" size="sm" variant="outline" className="h-10 px-4 rounded-xl font-bold text-xs">
            Check
          </Button>
        </form>
        {pincodeChecked ? (
          <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Fastest Delivery: Dispatches within 24 hours with Sealed Insurance.
          </p>
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
        <div className="p-3 rounded-2xl bg-neutral-50 border border-border/60 space-y-1">
          <Truck className="h-5 w-5 mx-auto text-primary" />
          <p className="text-[11px] font-bold text-foreground">Next-Day Transit</p>
          <p className="text-[10px] text-muted-foreground">Insured priority</p>
        </div>

        <div className="p-3 rounded-2xl bg-neutral-50 border border-border/60 space-y-1">
          <RotateCcw className="h-5 w-5 mx-auto text-primary" />
          <p className="text-[11px] font-bold text-foreground">7-Day Replace</p>
          <p className="text-[10px] text-muted-foreground">Zero-hassle pickup</p>
        </div>

        <div className="p-3 rounded-2xl bg-neutral-50 border border-border/60 space-y-1">
          <ShieldCheck className="h-5 w-5 mx-auto text-primary" />
          <p className="text-[11px] font-bold text-foreground">Brand Warranty</p>
          <p className="text-[10px] text-muted-foreground">IMEI verified sealed</p>
        </div>
      </div>

      {/* Technical Specifications & In The Box Accordions */}
      <div className="space-y-2 pt-2">
        {/* Specs Accordion */}
        <div className="border border-border/80 rounded-2xl overflow-hidden bg-card">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "specs" ? "" : "specs")}
            className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-foreground hover:bg-neutral-50 transition"
          >
            <span>Hardware Specs & Overview</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${activeTab === "specs" ? "rotate-180" : ""}`} />
          </button>
          {activeTab === "specs" ? (
            <div className="p-4 pt-0 text-xs text-neutral-600 leading-relaxed border-t border-border/40 space-y-3">
              <p className="text-sm text-foreground font-medium">
                {product.description || "Flagship smartphone featuring aerospace-grade frame, next-generation AI processing, and ultra-high dynamic range camera matrix."}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[9px] font-bold uppercase text-neutral-400">Processor</p>
                    <p className="font-bold text-neutral-800">Flagship AI Silicon (3nm)</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[9px] font-bold uppercase text-neutral-400">Display</p>
                    <p className="font-bold text-neutral-800">120Hz LTPO AMOLED</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center gap-2">
                  <Camera className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[9px] font-bold uppercase text-neutral-400">Optics</p>
                    <p className="font-bold text-neutral-800">4K 120fps Cinema HDR</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/60 flex items-center gap-2">
                  <Battery className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[9px] font-bold uppercase text-neutral-400">Charging</p>
                    <p className="font-bold text-neutral-800">Fast Turbo + Qi2 Wireless</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* In The Box Accordion */}
        <div className="border border-border/80 rounded-2xl overflow-hidden bg-card">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "box" ? "" : "box")}
            className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-foreground hover:bg-neutral-50 transition"
          >
            <span>What's In The Box</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${activeTab === "box" ? "rotate-180" : ""}`} />
          </button>
          {activeTab === "box" ? (
            <div className="p-4 pt-0 text-xs text-neutral-600 leading-relaxed border-t border-border/40 space-y-1.5">
              <p className="flex items-center gap-2">• <Box className="h-3.5 w-3.5 text-primary" /> Brand-sealed {product.title}</p>
              <p className="flex items-center gap-2">• <Box className="h-3.5 w-3.5 text-primary" /> USB-C to USB-C Fast Braided Charging Cable (1m)</p>
              <p className="flex items-center gap-2">• <Box className="h-3.5 w-3.5 text-primary" /> SIM Ejector Pin & Regulatory Documentation</p>
              <p className="flex items-center gap-2">• <Box className="h-3.5 w-3.5 text-primary" /> 1-Year Official Brand Warranty Card with Free Screen Care</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default CustomerProductDetailsSummary;
