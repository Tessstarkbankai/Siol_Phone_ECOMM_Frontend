import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingStarsProps = {
  rating?: number;
  count?: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function RatingStars({
  rating = 4.8,
  count = 128,
  showCount = true,
  size = "sm",
  className,
}: RatingStarsProps) {
  const sizeMap = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textMap = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeMap[size],
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-muted text-muted-foreground/30",
            )}
          />
        ))}
      </div>
      {showCount ? (
        <span className={cn("font-medium text-muted-foreground", textMap[size])}>
          {rating.toFixed(1)} {count ? `(${count})` : ""}
        </span>
      ) : null}
    </div>
  );
}
