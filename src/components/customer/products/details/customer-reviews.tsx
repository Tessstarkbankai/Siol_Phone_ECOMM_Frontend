import { useState, useEffect } from "react";
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquarePlus,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
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
import {
  getProductReviews,
  submitProductReview,
  type ProductReviewItem,
  type ProductReviewsResponse,
} from "@/features/customer/reviews/api";

type CustomerReviewsProps = {
  productId: string;
  productTitle: string;
};

export function CustomerReviews({ productId, productTitle }: CustomerReviewsProps) {
  const { isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reviewsData, setReviewsData] = useState<ProductReviewsResponse | null>(null);

  // Review Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void fetchReviews();
  }, [productId]);

  async function fetchReviews() {
    try {
      setLoading(true);
      const res = await getProductReviews(productId);
      if (res) setReviewsData(res);
    } catch (err: any) {
      // silent or fallback
    } finally {
      setLoading(false);
    }
  }

  function handleOpenReviewDialog() {
    if (!isSignedIn) {
      toast.error("Please sign in to rate and review this product.");
      return;
    }
    setDialogOpen(true);
  }

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
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
        toast.success("Review submitted successfully!");
      }

      setComment("");
      setTitle("");
      setDialogOpen(false);
      await fetchReviews();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  }

  const reviews = reviewsData?.reviews || [];
  const stats = reviewsData?.stats || {
    averageRating: 0,
    totalReviews: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  };

  const totalRatings = stats.totalReviews;

  function getRatingPillColor(r: number) {
    if (r >= 4) return "bg-emerald-600 text-white";
    if (r === 3) return "bg-amber-500 text-white";
    return "bg-rose-500 text-white";
  }

  function formatDate(d: string) {
    try {
      return new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Recent";
    }
  }

  return (
    <section className="mt-16 border-t border-border pt-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Ratings & Customer Reviews
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Real, verified buyer reviews for {productTitle}
          </p>
        </div>

        <Button
          onClick={handleOpenReviewDialog}
          className="rounded-xl font-bold text-xs gap-2 shadow-xs"
        >
          <MessageSquarePlus className="h-4 w-4" />
          <span>Rate & Review Product</span>
        </Button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-xs text-muted-foreground bg-muted/20 rounded-2xl border border-border">
          Loading customer reviews...
        </div>
      ) : reviews.length === 0 ? (
        /* Empty State */
        <div className="p-10 text-center bg-card rounded-2xl border border-dashed border-border space-y-4 max-w-2xl mx-auto">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <Star className="h-7 w-7" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-foreground">No Reviews Yet</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
              Be the first to review this product! Share your real-world experience with battery, camera, and display to help other buyers.
            </p>
          </div>
          <Button
            onClick={handleOpenReviewDialog}
            variant="outline"
            className="rounded-xl text-xs font-semibold gap-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Write the First Review</span>
          </Button>
        </div>
      ) : (
        /* Flipkart Style Reviews Display */
        <div className="space-y-8">
          {/* Flipkart Summary Card */}
          <div className="p-6 rounded-2xl bg-card border border-border grid gap-6 md:grid-cols-[240px_1fr] items-center">
            {/* Big Rating Pill & Score */}
            <div className="flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-border">
              <div
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl text-2xl font-black ${getRatingPillColor(
                  Math.round(stats.averageRating),
                )}`}
              >
                <span>{stats.averageRating}</span>
                <Star className="h-5 w-5 fill-current" />
              </div>
              <p className="text-xs font-bold text-foreground mt-2">
                {totalRatings} {totalRatings === 1 ? "Rating" : "Ratings"} &{" "}
                {totalRatings} {totalRatings === 1 ? "Review" : "Reviews"}
              </p>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                100% Verified Purchases
              </span>
            </div>

            {/* Flipkart Star Progress Bars */}
            <div className="space-y-2 max-w-md">
              {[5, 4, 3, 2, 1].map((starVal) => {
                const count = stats.breakdown[starVal as 1 | 2 | 3 | 4 | 5] || 0;
                const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
                const barColor =
                  starVal >= 4
                    ? "bg-emerald-600"
                    : starVal === 3
                    ? "bg-amber-500"
                    : "bg-rose-500";

                return (
                  <div key={starVal} className="flex items-center gap-3 text-xs">
                    <span className="w-6 font-bold text-neutral-700 flex items-center gap-0.5">
                      {starVal} <Star className="h-3 w-3 fill-current text-neutral-400" />
                    </span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${barColor} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-medium text-neutral-500 text-[11px]">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flipkart Style Reviews List */}
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="p-5 rounded-2xl bg-card border border-border space-y-3 transition hover:shadow-xs"
              >
                {/* Rating Badge + Title */}
                <div className="flex items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-black shadow-2xs ${getRatingPillColor(
                      rev.rating,
                    )}`}
                  >
                    <span>{rev.rating}</span>
                    <Star className="h-3 w-3 fill-current" />
                  </span>

                  {rev.title ? (
                    <h4 className="text-xs font-bold text-foreground line-clamp-1">
                      {rev.title}
                    </h4>
                  ) : null}
                </div>

                {/* Review Comment Text */}
                <p className="text-xs text-neutral-700 leading-relaxed font-normal">
                  {rev.comment}
                </p>

                {/* User Info & Certified Buyer Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-muted-foreground border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900">{rev.userName}</span>
                    <span>•</span>
                    {rev.isVerifiedPurchase ? (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Certified Buyer</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Buyer Review</span>
                    )}
                    <span>•</span>
                    <span>{formatDate(rev.createdAt)}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-900 cursor-pointer">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-medium">Helpful ({rev.helpfulCount})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Rate & Review Product
            </DialogTitle>
            <DialogDescription className="text-xs">
              Share your genuine experience with <span className="font-semibold text-foreground">{productTitle}</span>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitReview} className="space-y-4 pt-2">
            {/* Interactive 5-Star Rating Picker */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold">Overall Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const active =
                    (hoverRating || rating) >= starVal;
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(starVal)}
                      className="p-1 text-2xl transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`h-7 w-7 transition-colors ${
                          active
                            ? "fill-amber-400 text-amber-400"
                            : "text-neutral-300"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs font-bold text-muted-foreground ml-2">
                  {rating === 5
                    ? "Excellent!"
                    : rating === 4
                    ? "Very Good"
                    : rating === 3
                    ? "Average"
                    : rating === 2
                    ? "Below Average"
                    : "Poor"}
                </span>
              </div>
            </div>

            {/* Review Headline / Title */}
            <div className="space-y-1.5">
              <Label htmlFor="rev-title" className="text-xs font-bold">
                Review Title <span className="text-muted-foreground text-[10px] font-normal">(Optional)</span>
              </Label>
              <Input
                id="rev-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Outstanding camera and battery backup!"
                className="h-9 text-xs rounded-xl"
              />
            </div>

            {/* Review Comment */}
            <div className="space-y-1.5">
              <Label htmlFor="rev-comment" className="text-xs font-bold">
                Review Details <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="rev-comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What was your experience with display quality, software, build, and charging speed?"
                className="text-xs rounded-xl resize-none"
                required
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setDialogOpen(false)}
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
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default CustomerReviews;
