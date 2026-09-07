import { Link } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store";
import { formatPrice } from "@/lib/utils";

export function CustomerCartItems() {
  const { isSignedIn } = useAuth();
  const { cart, setOpen, increase, decrease, remove } =
    useCustomerCartAndCheckoutStore((state) => state);

  const subtotal = cart.items.reduce(
    (acc, item) => acc + (item.finalPrice || 0) * item.quantity,
    0,
  );
  const freeShippingThreshold = 999;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100),
  );

  return (
    <div className="flex h-full min-h-0 flex-col bg-card">
      {/* Header */}
      <div className="border-b border-border px-5 py-4 flex items-center justify-between bg-neutral-50">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">
            Shopping Cart ({cart.items.length})
          </h2>
        </div>
      </div>

      {/* Free Shipping Progress Indicator */}
      {cart.items.length > 0 ? (
        <div className="bg-primary/5 border-b border-primary/20 px-5 py-3 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-foreground">
              <Truck className="h-4 w-4 text-primary" />
              {remainingForFreeShipping > 0
                ? `Add ₹${remainingForFreeShipping} more for FREE Delivery`
                : "🎉 You unlocked FREE Express Delivery!"}
            </span>
            <span className="text-primary font-bold">{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      ) : null}

      {/* Cart Items List */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="space-y-4 p-5">
          {!cart.items.length ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-neutral-50 px-6 text-center space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">Your cart is empty</p>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Looks like you haven't added any items to your cart yet. Explore our curated collections!
                </p>
              </div>
              <Button
                onClick={() => setOpen(false)}
                asChild
                className="bg-primary text-white font-semibold h-10 px-6 rounded-lg shadow-sm"
              >
                <Link to="/collections">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            cart.items.map((item, index) => (
              <div
                key={`${item.productId}-${index}`}
                className="group flex gap-4 rounded-xl border border-border/80 bg-card p-3.5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-20 shrink-0 rounded-lg border border-border/60 object-cover object-center bg-neutral-100"
                />

                <div className="min-w-0 flex-1 flex flex-col justify-between space-y-1.5">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {item.brand}
                    </span>
                    <Link
                      to={`/collection/${item.productId}`}
                      className="block line-clamp-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary tracking-tight"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {[item.color, item.size].filter(Boolean).join(" • ") || "Standard"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/40">
                    <p className="text-sm font-semibold text-foreground">
                      {formatPrice(item.finalPrice * item.quantity)}
                    </p>

                    <div className="flex items-center gap-2">
                      {/* Qty Controls */}
                      <div className="flex items-center rounded-lg border border-border bg-neutral-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => void decrease(item, Boolean(isSignedIn))}
                          className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:bg-neutral-200 transition"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="flex h-7 min-w-8 items-center justify-center px-1 text-xs font-bold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => void increase(item, Boolean(isSignedIn))}
                          className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:bg-neutral-200 transition"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => void remove(item, Boolean(isSignedIn))}
                        aria-label="Remove item"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default CustomerCartItems;
