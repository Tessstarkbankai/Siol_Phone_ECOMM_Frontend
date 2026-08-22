import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

type PriceBlockProps = {
  price: number;
  finalPrice?: number;
  salePercentage?: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

export function PriceBlock({
  price,
  finalPrice,
  salePercentage = 0,
  className,
  size = "md",
}: PriceBlockProps) {
  const effectiveFinalPrice =
    finalPrice !== undefined
      ? finalPrice
      : salePercentage > 0
        ? Math.round(price - (price * salePercentage) / 100)
        : price;

  const hasDiscount = salePercentage > 0 && effectiveFinalPrice < price;

  const sizeClasses = {
    sm: {
      wrap: "gap-1.5",
      price: "text-sm font-bold text-foreground",
      mrp: "text-xs text-muted-foreground line-through",
      badge: "text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded",
    },
    md: {
      wrap: "gap-2",
      price: "text-lg font-bold text-foreground tracking-tight",
      mrp: "text-xs text-muted-foreground line-through",
      badge: "text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md",
    },
    lg: {
      wrap: "gap-2.5",
      price: "text-2xl font-bold text-foreground tracking-tight",
      mrp: "text-sm text-muted-foreground line-through",
      badge: "text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md",
    },
    xl: {
      wrap: "gap-3",
      price: "text-3xl font-extrabold text-foreground tracking-tight sm:text-4xl",
      mrp: "text-base text-muted-foreground line-through sm:text-lg",
      badge: "text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md uppercase tracking-wider",
    },
  }[size];

  return (
    <div className={cn("flex items-center flex-wrap", sizeClasses.wrap, className)}>
      <span className={sizeClasses.price}>{formatPrice(effectiveFinalPrice)}</span>

      {hasDiscount ? (
        <>
          <span className={sizeClasses.mrp}>{formatPrice(price)}</span>
          <span className={sizeClasses.badge}>{salePercentage}% OFF</span>
        </>
      ) : null}
    </div>
  );
}
