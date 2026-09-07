import { useState, useEffect } from "react";
import { CheckCircle2, Star, ShoppingBag, ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getCustomerOrders } from "@/features/customer/orders/api";
import type { CustomerOrder } from "@/features/customer/orders/types";
import { formatPrice } from "@/lib/utils";
import { RateProductModal } from "@/components/customer/reviews/rate-product-modal";
import { useCustomerOrdersStore } from "@/features/customer/orders/store";

export default function CustomerOrderSuccessPage() {
  const [latestOrder, setLatestOrder] = useState<CustomerOrder | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [reviewProduct, setReviewProduct] = useState<{
    productId: string;
    productTitle: string;
    productImage?: string;
  } | null>(null);
  const [reviewedProductIds, setReviewedProductIds] = useState<Set<string>>(new Set());

  const openOrders = useCustomerOrdersStore((state) => state.openOrders);

  useEffect(() => {
    async function fetchLatest() {
      try {
        setLoadingOrder(true);
        const res = await getCustomerOrders();
        if (res?.items && res.items.length > 0) {
          setLatestOrder(res.items[0]);
        }
      } catch (err) {
        // silent fallback
      } finally {
        setLoadingOrder(false);
      }
    }
    void fetchLatest();
  }, []);

  const orderItems = latestOrder?.items || [];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        {/* Main Success Card */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Order Placed Successfully!
            </h1>
            <p className="text-sm text-muted-foreground">
              Thank you for shopping with us. Your payment has been received and your order is confirmed.
            </p>
          </div>

          {latestOrder && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-xs text-muted-foreground font-mono">
              <span>Order Reference:</span>
              <span className="font-bold text-foreground">
                {latestOrder.code || latestOrder._id.slice(-8).toUpperCase()}
              </span>
            </div>
          )}

          {/* Rate & Review Products Section */}
          {orderItems.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border/80 text-left">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    Rate & Review Purchased Items
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Share your initial thoughts and rating to help other buyers.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {orderItems.map((item, idx) => {
                  const productObj = typeof item.product === "object" ? item.product : null;
                  const productId = productObj?._id || (typeof item.product === "string" ? item.product : "");
                  const productTitle = productObj?.title || "Purchased Product";
                  const productImage = productObj?.images?.[0]?.url;
                  const hasReviewed = reviewedProductIds.has(productId);

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={productTitle}
                            className="h-12 w-12 rounded-xl object-cover border border-border bg-card shrink-0"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-xl bg-muted border border-border flex items-center justify-center shrink-0">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                            {productTitle}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatPrice(item.price)} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>

                      {productId && (
                        <Button
                          size="sm"
                          variant={hasReviewed ? "secondary" : "outline"}
                          disabled={hasReviewed}
                          className="rounded-xl text-xs gap-1.5 shrink-0 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                          onClick={() =>
                            setReviewProduct({
                              productId,
                              productTitle,
                              productImage,
                            })
                          }
                        >
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          {hasReviewed ? "Reviewed ✓" : "Rate & Review"}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              asChild
              className="w-full sm:w-auto rounded-xl font-bold gap-2 text-xs"
            >
              <Link to="/collection">
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => openOrders()}
              className="w-full sm:w-auto rounded-xl font-medium text-xs gap-1.5"
            >
              View Order History
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewProduct && (
        <RateProductModal
          open={Boolean(reviewProduct)}
          onOpenChange={(open) => !open && setReviewProduct(null)}
          productId={reviewProduct.productId}
          productTitle={reviewProduct.productTitle}
          productImage={reviewProduct.productImage}
          onReviewSubmitted={() => {
            if (reviewProduct) {
              setReviewedProductIds((prev) => new Set([...prev, reviewProduct.productId]));
            }
            setReviewProduct(null);
          }}
        />
      )}
    </div>
  );
}
