import { useState } from "react";
import { Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@clerk/react";
import { submitProductReview } from "@/features/customer/reviews/api";

type RateProductModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productTitle: string;
  productImage?: string;
  onReviewSubmitted?: () => void;
};

const RATING_DESCRIPTIONS: Record<number, string> = {
  1: "Very Bad",
  2: "Bad",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export function RateProductModal({
  open,
  onOpenChange,
  productId,
  productTitle,
  productImage,
  onReviewSubmitted,
}: RateProductModalProps) {
  const { isSignedIn } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isSignedIn) {
      toast.error("Please sign in to submit a review.");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a short review comment.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await submitProductReview(productId, {
        rating,
        title: title.trim(),
        comment: comment.trim(),
      });

      if (res?.message) {
        toast.success(res.message);
      } else {
        toast.success("Review submitted successfully! Thank you for your feedback.");
      }

      setComment("");
      setTitle("");
      onOpenChange(false);
      onReviewSubmitted?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  const activeRating = hoverRating || rating;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-border bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            Rate & Review Product
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Share genuine feedback about your experience with this device.
          </DialogDescription>
        </DialogHeader>

        {/* Product summary strip */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
          {productImage && (
            <img
              src={productImage}
              alt={productTitle}
              className="h-12 w-12 rounded-lg object-cover border border-border shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold truncate text-foreground">
              {productTitle}
            </h4>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Buyer Review</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Star selector */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold">Your Overall Rating</Label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 rounded hover:scale-110 transition-transform focus:outline-none"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        star <= activeRating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30 stroke-1"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground px-2 py-0.5 rounded bg-muted/60">
                {RATING_DESCRIPTIONS[activeRating] || `${activeRating} Stars`}
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="review-title" className="text-xs font-semibold">
              Headline / Title (Optional)
            </Label>
            <Input
              id="review-title"
              placeholder="e.g. Incredible camera & battery life!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl text-sm"
              maxLength={100}
            />
          </div>

          {/* Detailed comment */}
          <div className="space-y-1.5">
            <Label htmlFor="review-comment" className="text-xs font-semibold">
              Review Details <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="review-comment"
              placeholder="What did you like or dislike? How does it perform in daily usage?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              required
              className="rounded-xl text-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={submitting}
              className="rounded-xl text-xs font-bold"
            >
              {submitting ? "Submitting..." : "Post Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
