import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, useUser } from "@clerk/react";
import {
  CheckCircle2,
  CreditCard,
  LogIn,
  MapPin,
  Sparkles,
  TicketPercent,
  X,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/features/auth/store";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store";
import { useCustomerProfileStore } from "@/features/customer/profile/store";
import { formatPrice } from "@/lib/utils";
import CustomerCartItems from "./customer-cart-items";

function SummaryRow(props: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm py-1">
      <span className="text-muted-foreground">{props.label}</span>
      <span
        className={`font-semibold ${
          props.highlight ? "text-primary font-bold" : "text-foreground"
        }`}
      >
        {props.value}
      </span>
    </div>
  );
}

export function CustomerCartAndCheckoutDrawer() {
  const { isBootstrapped } = useAuthStore();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const { openProfile } = useCustomerProfileStore((state) => state);

  const {
    isOpen,
    setOpen,
    loadCart,
    selectedAddressId,
    addresses,
    promoInput,
    appliedPromo,
    points,
    promoLoading,
    checkoutLoading,
    pointsCheckoutLoading,
    setPromoInput,
    clearPromo,
    applyPromo,
    startRazorpayCheckout,
    startPointsCheckout,
    loading,
    cart,
  } = useCustomerCartAndCheckoutStore((state) => state);

  useEffect(() => {
    if (!isOpen || !isLoaded || !isBootstrapped) return;
    void loadCart(Boolean(isSignedIn));
  }, [isBootstrapped, isLoaded, isOpen, isSignedIn, loadCart]);

  const selectedAddress =
    addresses.find((item) => item._id === selectedAddressId) || null;

  const subTotal = cart.items.reduce(
    (sum, item) => sum + (item.finalPrice || 0) * item.quantity,
    0,
  );

  const discountAmount = appliedPromo
    ? Math.round((subTotal * appliedPromo.percentage) / 100)
    : 0;

  const shippingCost = subTotal >= 999 || subTotal === 0 ? 0 : 99;
  const totalAmount = Math.max(subTotal - discountAmount + shippingCost, 0);

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent className="ml-auto flex h-[92dvh] max-h-[92dvh] w-full max-w-5xl overflow-hidden rounded-t-3xl border-border bg-background p-0 shadow-2xl">
        <div className="grid h-full min-h-0 w-full lg:grid-cols-[1.5fr_1fr]">
          {/* Left: Cart Items Pane */}
          <div className="min-h-0 border-b border-border lg:border-b-0 lg:border-r bg-background">
            <CustomerCartItems />
          </div>

          {/* Right: Checkout & Order Summary Pane */}
          <aside className="min-h-0 bg-neutral-50/50 flex flex-col justify-between">
            <div className="flex h-full min-h-0 flex-col p-4 sm:p-6">
              <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <DrawerHeader className="border-b border-border px-5 py-4 flex items-center justify-between">
                  <DrawerTitle className="text-base font-black text-foreground flex items-center gap-2">
                    <CreditCard className="h-4.5 w-4.5 text-primary" />
                    <span>Order Summary</span>
                  </DrawerTitle>
                </DrawerHeader>

                {isSignedIn ? (
                  <>
                    <ScrollArea className="min-h-0 flex-1">
                      <div className="space-y-5 px-5 py-4">
                        {/* Delivery Address Section */}
                        <section className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-primary" />
                              Shipping Address
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setOpen(false);
                                void openProfile();
                              }}
                              className="h-6 text-xs text-primary font-semibold hover:bg-primary/10 px-2"
                            >
                              {selectedAddress ? "Change" : "Add Address"}
                            </Button>
                          </div>

                          {selectedAddress ? (
                            <div className="rounded-xl border border-border/80 bg-neutral-50/70 p-3 text-xs space-y-1">
                              <p className="font-bold text-foreground">
                                {selectedAddress.fullName}
                              </p>
                              <p className="text-muted-foreground">
                                {selectedAddress.address}, {selectedAddress.state} - {selectedAddress.postalCode}
                              </p>
                            </div>
                          ) : (
                            <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/60 p-3 text-xs text-amber-800">
                              No delivery address found. Please add your shipping address to proceed.
                            </div>
                          )}
                        </section>

                        <Separator />

                        {/* Promo Code Input */}
                        <section className="space-y-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <TicketPercent className="h-3.5 w-3.5 text-primary" />
                            Discount Coupon
                          </span>

                          {!appliedPromo ? (
                            <div className="flex gap-2">
                              <Input
                                value={promoInput}
                                onChange={(e) => setPromoInput(e.target.value)}
                                placeholder="e.g. WELCOME20"
                                className="h-9 rounded-lg border-border text-xs focus-visible:ring-primary uppercase font-bold"
                              />
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => void applyPromo()}
                                disabled={promoLoading || !promoInput.trim()}
                                className="bg-primary text-white font-bold h-9 px-4 rounded-lg"
                              >
                                {promoLoading ? "Applying..." : "Apply"}
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/10 p-2.5 text-xs text-primary font-bold">
                              <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="h-4 w-4" />
                                {appliedPromo.code} ({appliedPromo.percentage}% applied)
                              </span>
                              <button
                                type="button"
                                onClick={clearPromo}
                                className="text-muted-foreground hover:text-red-500 transition text-xs underline font-normal"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </section>

                        <Separator />

                        {/* Price Breakdown */}
                        <div className="space-y-1">
                          <SummaryRow label={`Items (${cart.totalQuantity})`} value={formatPrice(subTotal)} />

                          {discountAmount > 0 ? (
                            <SummaryRow
                              label={`Coupon Discount (${appliedPromo?.percentage}%)`}
                              value={`-${formatPrice(discountAmount)}`}
                              highlight
                            />
                          ) : null}

                          <SummaryRow
                            label="Shipping"
                            value={shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                            highlight={shippingCost === 0}
                          />

                          {points > 0 ? (
                            <div className="flex items-center justify-between text-xs py-1 text-amber-700 bg-amber-50/70 p-2 rounded-lg border border-amber-200">
                              <span className="flex items-center gap-1.5 font-semibold">
                                <Coins className="h-3.5 w-3.5" /> Reward Points Available:
                              </span>
                              <span className="font-bold">{points} pts</span>
                            </div>
                          ) : null}

                          <div className="flex items-center justify-between border-t border-border pt-3 mt-2">
                            <span className="text-base font-black text-foreground">Total Payable</span>
                            <span className="text-xl font-black text-foreground">
                              {formatPrice(totalAmount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>

                    {/* Checkout Buttons */}
                    <DrawerFooter className="border-t border-border p-5 space-y-2">
                      <Button
                        onClick={() => {
                          void setOpen(false);
                          void startRazorpayCheckout({
                            isSignedIn: Boolean(isSignedIn),
                            name: user?.fullName || "Customer",
                            email: user?.primaryEmailAddress?.emailAddress || "",
                            onSuccess: () => navigate("/order-success"),
                          });
                        }}
                        type="button"
                        disabled={
                          loading ||
                          !cart.items.length ||
                          !selectedAddressId ||
                          checkoutLoading ||
                          pointsCheckoutLoading
                        }
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-xl shadow-lg shadow-primary/25 transition gap-2"
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>{checkoutLoading ? "Processing Payment..." : "Proceed to Pay with Razorpay"}</span>
                      </Button>

                      {points >= totalAmount && totalAmount > 0 ? (
                        <Button
                          onClick={() => {
                            void startPointsCheckout({
                              isSignedIn: Boolean(isSignedIn),
                              onSuccess: () => navigate("/order-success"),
                            });
                          }}
                          disabled={
                            !(
                              Boolean(isSignedIn) &&
                              Boolean(selectedAddressId) &&
                              Boolean(cart.items.length) &&
                              points >= totalAmount &&
                              !checkoutLoading &&
                              !pointsCheckoutLoading
                            )
                          }
                          type="button"
                          variant="outline"
                          className="w-full h-10 border-amber-500/50 text-amber-700 hover:bg-amber-50 font-bold text-xs rounded-xl"
                        >
                          <Coins className="h-3.5 w-3.5 mr-1 text-amber-600" />
                          <span>{pointsCheckoutLoading ? "Processing..." : `Pay ₹${totalAmount} using ${totalAmount} Points`}</span>
                        </Button>
                      ) : null}
                    </DrawerFooter>
                  </>
                ) : (
                  <div className="p-8 text-center space-y-4 flex flex-col items-center justify-center h-full">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <LogIn className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-black text-foreground">Sign In to Checkout</h3>
                      <p className="text-xs text-muted-foreground max-w-xs">
                        Sign in with your account to access saved delivery addresses, apply reward points, and checkout securely.
                      </p>
                    </div>
                    <Button
                      onClick={() => setOpen(false)}
                      asChild
                      className="bg-primary text-white font-bold h-11 px-7 rounded-xl shadow-md"
                    >
                      <Link to="/sign-in">Sign In / Register</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CustomerCartAndCheckoutDrawer;
