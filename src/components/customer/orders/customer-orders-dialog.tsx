import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCustomerOrdersStore } from "@/features/customer/orders/store";
import type {
  CustomerOrder,
  CustomerOrderStatus,
  CustomerPaymentStatus,
} from "@/features/customer/orders/types";
import { formatPrice } from "@/lib/utils";
import { ShoppingBasket, Star, ChevronDown, ChevronUp, Package, RotateCcw } from "lucide-react";
import { RateProductModal } from "@/components/customer/reviews/rate-product-modal";

const dialogClass =
  "max-h-[92vh] overflow-y-auto border-border bg-background sm:max-w-4xl p-6";
const wrapClass = "space-y-4";
const topRowClass = "flex items-center justify-between gap-3 pb-2 border-b border-border";
const metaClass = "text-sm text-muted-foreground";
const buttonClass = "rounded-xl text-xs";
const emptyClass = "text-center py-12 text-muted-foreground flex flex-col items-center gap-2";

const successBadgeClass =
  "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
const dangerBadgeClass =
  "border-destructive/30 bg-destructive/10 text-destructive";
const neutralBadgeClass =
  "border-border bg-secondary/60 text-foreground";

function CustomerPaymentStatusBadge({ status }: { status: CustomerPaymentStatus }) {
  const className =
    status === "paid"
      ? successBadgeClass
      : status === "failed"
        ? dangerBadgeClass
        : neutralBadgeClass;

  return <Badge className={className}>{status.toUpperCase()}</Badge>;
}

function CustomerOrderStatusBadge({ status }: { status: CustomerOrderStatus }) {
  const className =
    status === "delivered"
      ? successBadgeClass
      : status === "returned"
        ? dangerBadgeClass
        : neutralBadgeClass;

  return <Badge className={className}>{status.toUpperCase()}</Badge>;
}

function formatDate(value?: string | null) {
  return value ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-";
}

function canReturnOrder(order: CustomerOrder) {
  if (order.orderStatus !== "delivered" || !order.deliveredAt) return false;
  const diff = Date.now() - new Date(order.deliveredAt).getTime();
  return diff <= 7 * 24 * 60 * 60 * 1000;
}

export function CustomerOrdersDialog() {
  const { isOpen, closeOrders, loading, items, returnOrder, loadOrders } =
    useCustomerOrdersStore((state) => state);

  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  const [reviewModalProduct, setReviewModalProduct] = useState<{
    productId: string;
    productTitle: string;
    productImage?: string;
  } | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeOrders()}>
        <DialogContent className={dialogClass}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
              <ShoppingBasket className="h-5 w-5 text-primary" />
              My Orders & Reviews
            </DialogTitle>
          </DialogHeader>

          <div className={wrapClass}>
            <div className={topRowClass}>
              <p className={metaClass}>Track your orders and rate purchased products</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={buttonClass}
                onClick={() => void loadOrders()}
              >
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="py-12 text-center text-sm text-muted-foreground animate-pulse">
                Loading order history...
              </div>
            ) : null}

            {!loading && !items.length ? (
              <div className={emptyClass}>
                <Package className="h-10 w-10 text-muted-foreground/50" />
                <p className="text-sm font-medium">No orders found yet</p>
                <p className="text-xs text-muted-foreground">
                  Your placed orders and delivery status will appear here.
                </p>
              </div>
            ) : null}

            {!loading && items.length > 0 && (
              <div className="space-y-4">
                {items.map((order) => {
                  const isExpanded = expandedOrders[order._id] ?? true;
                  const orderItems = order.items || [];

                  return (
                    <div
                      key={order._id}
                      className="rounded-2xl border border-border bg-card/80 shadow-sm overflow-hidden transition-all"
                    >
                      {/* Order Header Summary */}
                      <div className="p-4 flex flex-wrap items-center justify-between gap-3 bg-muted/20 border-b border-border/60">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Order ID: </span>
                            <span className="font-mono font-bold text-foreground">
                              {order.code || order._id.slice(-8).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Date: </span>
                            <span className="font-medium text-foreground">
                              {formatDate(order.paidAt || order.createdAt)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Total: </span>
                            <span className="font-bold text-primary">
                              {formatPrice(order.totalAmount)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <CustomerPaymentStatusBadge status={order.paymentStatus} />
                          <CustomerOrderStatusBadge status={order.orderStatus} />
                          <button
                            type="button"
                            onClick={() => toggleExpand(order._id)}
                            className="p-1 rounded-lg hover:bg-muted text-muted-foreground transition"
                            title={isExpanded ? "Collapse" : "Expand"}
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Purchased Items List */}
                      {isExpanded && (
                        <div className="divide-y divide-border/50 p-3 sm:p-4 space-y-3">
                          {orderItems.length === 0 ? (
                            <div className="text-xs text-muted-foreground py-2">
                              {order.totalItems} item(s) in this order
                            </div>
                          ) : (
                            orderItems.map((item, idx) => {
                              const productObj = typeof item.product === "object" ? item.product : null;
                              const productId = productObj?._id || (typeof item.product === "string" ? item.product : "");
                              const productTitle = productObj?.title || "Purchased Product";
                              const productImage = productObj?.images?.[0]?.url;

                              return (
                                <div
                                  key={idx}
                                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 first:pt-0"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    {productImage ? (
                                      <img
                                        src={productImage}
                                        alt={productTitle}
                                        className="h-14 w-14 rounded-xl object-cover border border-border shrink-0 bg-muted"
                                      />
                                    ) : (
                                      <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center border border-border shrink-0">
                                        <Package className="h-6 w-6 text-muted-foreground" />
                                      </div>
                                    )}

                                    <div className="min-w-0">
                                      <p className="text-sm font-semibold text-foreground truncate">
                                        {productTitle}
                                      </p>
                                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                        <span>Qty: {item.quantity}</span>
                                        {item.color && <span>• Color: {item.color}</span>}
                                        {item.size && <span>• Size: {item.size}</span>}
                                        <span className="font-medium text-foreground">
                                          • {formatPrice(item.price)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Rate & Review Button */}
                                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                                    {productId && (
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        className="rounded-xl text-xs gap-1.5 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/60"
                                        onClick={() =>
                                          setReviewModalProduct({
                                            productId,
                                            productTitle,
                                            productImage,
                                          })
                                        }
                                      >
                                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                                        Rate & Review
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          )}

                          {/* Footer action: return button if eligible */}
                          <div className="pt-3 flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {order.deliveredAt ? `Delivered on ${formatDate(order.deliveredAt)}` : ""}
                            </span>
                            {canReturnOrder(order) && (
                              <Button
                                size="sm"
                                variant="destructive"
                                className="rounded-xl text-xs gap-1.5"
                                onClick={() => returnOrder(order._id)}
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Return Order
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Standalone Rating Modal */}
      {reviewModalProduct && (
        <RateProductModal
          open={Boolean(reviewModalProduct)}
          onOpenChange={(open) => !open && setReviewModalProduct(null)}
          productId={reviewModalProduct.productId}
          productTitle={reviewModalProduct.productTitle}
          productImage={reviewModalProduct.productImage}
          onReviewSubmitted={() => {
            setReviewModalProduct(null);
          }}
        />
      )}
    </>
  );
}

export default CustomerOrdersDialog;
