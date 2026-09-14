import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Grid2X2,
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Mic,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Sparkles,
  Store,
  Tag,
  User,
} from "lucide-react";
import { isMultiVendorEnabled, isDistributorProgramEnabled } from "@/config/features";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/features/auth/store";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { useCustomerProfileStore } from "@/features/customer/profile/store";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store";
import { useCustomerOrdersStore } from "@/features/customer/orders/store";
import { getCustomerCategories } from "@/features/customer/products/api";
import type { ProductCategory } from "@/features/customer/products/types";
import CustomerWishlistDialog from "../wishlist/customer-wishlist-dialog";
import CustomerProfileDialog from "../profile/customer-profile-dialog";
import CustomerCartAndCheckoutDrawer from "../cart-and-checkout/customer-cart-and-checkout-drawer";
import CustomerOrdersDialog from "../orders/customer-orders-dialog";
import { CustomerMobileNavbar } from "./mobile-navbar";

export function CustomerNavbar() {
  const navigate = useNavigate();
  const { isSignedIn, signOut, isLoaded } = useAuth();
  const { isBootstrapped, user } = useAuthStore();

  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMegaPanelOpen, setIsMegaPanelOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsMegaPanelOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsMegaPanelOpen(false);
    }, 200);
    setCloseTimeout(timeout);
  };

  const {
    items: wishlistItems,
    loadWishlist,
    clear: clearWishlist,
    setOpen: setWishlistOpen,
  } = useCustomerWishlistStore((state) => state);

  const { openProfile, clear: clearProfile } = useCustomerProfileStore(
    (state) => state,
  );

  const { setOpen: setCartOpen, cart, loadCart } = useCustomerCartAndCheckoutStore(
    (state) => state,
  );

  const { openOrders } = useCustomerOrdersStore((state) => state);

  useEffect(() => {
    void getCustomerCategories().then((res) => {
      if (res) setCategories(res);
    });
  }, []);

  useEffect(() => {
    if (!isLoaded || !isBootstrapped) return;

    void loadCart(Boolean(isSignedIn));

    if (!isSignedIn) {
      clearWishlist();
      clearProfile();
      return;
    }

    void loadWishlist();
  }, [
    clearWishlist,
    isBootstrapped,
    clearProfile,
    isSignedIn,
    isLoaded,
    loadWishlist,
    loadCart,
  ]);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  const showSignInUi = isLoaded && isBootstrapped && isSignedIn;
  const wishlistCount = wishlistItems.length;
  const cartItemCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white text-neutral-900 shadow-xs relative">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Nav & Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <CustomerMobileNavbar isSignedIn={!!isSignedIn} />

          <Link to="/" className="flex items-center group py-1" title="SiOL - Home">
            <img
              src="/siol-logo-black.png"
              alt="SiOL"
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none"
            />
          </Link>

          {/* Desktop Navigation Links / Mega Menu Trigger */}
          <div className="hidden lg:flex items-center gap-1 ml-4">
            <button
              type="button"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsMegaPanelOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                isMegaPanelOpen
                  ? "bg-primary/10 text-primary"
                  : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <Grid2X2 className="h-4 w-4 text-primary" />
              <span>Explore</span>
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${
                  isMegaPanelOpen ? "rotate-180 text-primary" : "text-neutral-500"
                }`}
              />
            </button>

            <Link
              to="/collections"
              className="px-3 py-2 text-xs font-semibold rounded-xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition"
            >
              All Phones
            </Link>

            <Link
              to="/collections?sort=recent"
              className="px-3 py-2 text-xs font-semibold rounded-xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition"
            >
              Flagships
            </Link>

            <Link
              to="/collections?sort=price-low"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition"
            >
              <Tag className="h-3.5 w-3.5 text-rose-500" />
              <span>Deals</span>
              <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                20% OFF
              </span>
            </Link>
          </div>
        </div>

        {/* Center: Wide Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-xl items-center relative mx-4"
        >
          <div className="relative w-full">
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="h-11 w-full bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-500 pl-4 pr-20 text-sm focus-visible:ring-primary focus-visible:border-primary rounded-xl shadow-xs"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                aria-label="Voice Search"
                className="text-primary hover:text-primary/80 transition p-1"
                onClick={() => {}}
              >
                <Mic className="h-4.5 w-4.5" />
              </button>
              <button
                type="submit"
                aria-label="Search"
                className="text-neutral-500 hover:text-neutral-900 transition p-1"
              >
                <Search className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </form>

        {/* Right: Account, Wishlist, Cart */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Wishlist */}
          {showSignInUi ? (
            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              aria-label="Wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-neutral-700 hover:bg-neutral-100 hover:text-primary transition"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 ? (
                <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white shadow-xs">
                  {wishlistCount}
                </span>
              ) : null}
            </button>
          ) : null}

          {/* Account Dropdown */}
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Account Menu"
                  className="flex h-10 items-center gap-1.5 rounded-xl px-2.5 text-neutral-700 hover:bg-neutral-100 transition"
                >
                  <User className="h-5 w-5 text-neutral-700" />
                  <span className="hidden sm:inline text-xs font-bold text-neutral-800">
                    {user?.name ? user.name.split(" ")[0] : "Account"}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-neutral-500 hidden sm:inline" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white border border-neutral-200 text-neutral-900 p-2 shadow-xl rounded-xl"
              >
                {user?.role === "admin" ? (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-primary hover:bg-primary/10 transition cursor-pointer"
                    >
                      <LayoutDashboard className="h-4 w-4 text-primary" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                ) : null}

                {isMultiVendorEnabled() ? (
                  user?.role === "vendor" || user?.role === "admin" ? (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/vendor"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                      >
                        <Store className="h-4 w-4 text-emerald-600" />
                        <span>Seller Portal</span>
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/become-seller"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-primary hover:bg-primary/10 transition cursor-pointer"
                      >
                        <Store className="h-4 w-4 text-primary" />
                        <span>Become a Seller</span>
                      </Link>
                    </DropdownMenuItem>
                  )
                ) : isDistributorProgramEnabled() ? (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/become-distributor"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-primary hover:bg-primary/10 transition cursor-pointer"
                    >
                      <Building2 className="h-4 w-4 text-primary" />
                      <span>Become a Distributor</span>
                    </Link>
                  </DropdownMenuItem>
                ) : null}

                <DropdownMenuItem
                  onClick={() => void openProfile()}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => void openOrders()}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
                >
                  <ShoppingBasket className="h-4 w-4" />
                  <span>Order History</span>
                </DropdownMenuItem>

                <div className="my-1 border-t border-neutral-200" />

                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/sign-in"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-xs font-bold text-neutral-700 hover:bg-neutral-100 hover:text-primary transition"
            >
              <User className="h-5 w-5 text-neutral-700" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}

          {/* Cart Icon with Solid Black Round Badge */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label="Shopping Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-neutral-800 hover:bg-neutral-100 transition"
          >
            <ShoppingCart className="h-5.5 w-5.5" />
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-[11px] font-semibold text-white shadow-xs">
              {cartItemCount}
            </span>
          </button>
        </div>

        {/* Modals & Drawers */}
        {showSignInUi ? <CustomerWishlistDialog /> : null}
        {showSignInUi ? <CustomerProfileDialog /> : null}
        {showSignInUi ? <CustomerOrdersDialog /> : null}
        <CustomerCartAndCheckoutDrawer />
      </div>

      {/* Horizontal Dropdown Mega Panel on Desktop Nav Hover */}
      {isMegaPanelOpen ? (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 right-0 top-full z-50 border-b border-neutral-200 bg-white/98 backdrop-blur-md shadow-2xl animate-in fade-in-0 slide-in-from-top-2 duration-200"
        >
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Store Categories */}
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-100">
                <Grid2X2 className="h-4 w-4 text-primary" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Categories
                </h4>
              </div>
              <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <Link
                      key={c._id}
                      to={`/collections?category=${c._id}`}
                      onClick={() => setIsMegaPanelOpen(false)}
                      className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 hover:bg-primary/5 hover:text-primary transition"
                    >
                      <span>{c.name}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-neutral-400 italic">
                    Loading categories...
                  </p>
                )}
              </div>
            </div>

            {/* Column 2: Highlights & Series */}
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-100">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Highlights & Series
                </h4>
              </div>
              <div className="space-y-1.5">
                <Link
                  to="/collections"
                  onClick={() => setIsMegaPanelOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition"
                >
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-semibold text-neutral-900">All Smartphones</p>
                    <p className="text-[11px] text-neutral-500">Explore complete catalog</p>
                  </div>
                </Link>

                <Link
                  to="/collections?sort=recent"
                  onClick={() => setIsMegaPanelOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition"
                >
                  <Grid2X2 className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-semibold text-neutral-900">Flagship & Pro Series</p>
                    <p className="text-[11px] text-neutral-500">Top-tier mobile performance</p>
                  </div>
                </Link>

                <Link
                  to="/collections"
                  onClick={() => setIsMegaPanelOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition"
                >
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="font-semibold text-neutral-900">Foldables & AI Phones</p>
                    <p className="text-[11px] text-neutral-500">Next-gen folding form factors</p>
                  </div>
                </Link>

                <Link
                  to="/collections?sort=price-low"
                  onClick={() => setIsMegaPanelOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-rose-50 transition"
                >
                  <Tag className="h-4 w-4 text-rose-500" />
                  <div>
                    <p className="font-semibold text-rose-600">Special Exchange Deals</p>
                    <p className="text-[11px] text-rose-500">Save up to 20% instant off</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Column 3: Distributor Hub / Seller Services */}
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-100">
                {isMultiVendorEnabled() ? (
                  <>
                    <Store className="h-4 w-4 text-emerald-600" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Seller & Services
                    </h4>
                  </>
                ) : (
                  <>
                    <Building2 className="h-4 w-4 text-primary" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      B2B & Distribution
                    </h4>
                  </>
                )}
              </div>
              <div className="space-y-1.5">
                {isMultiVendorEnabled() ? (
                  <Link
                    to="/become-seller"
                    onClick={() => setIsMegaPanelOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-emerald-50 transition"
                  >
                    <Store className="h-4 w-4 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-700">Become a Seller</p>
                      <p className="text-[11px] text-emerald-600">Start selling to millions</p>
                    </div>
                  </Link>
                ) : isDistributorProgramEnabled() ? (
                  <Link
                    to="/become-distributor"
                    onClick={() => setIsMegaPanelOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-primary/10 transition"
                  >
                    <Building2 className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold text-primary">Become a Distributor</p>
                      <p className="text-[11px] text-neutral-500">Apply for exclusive territory rights</p>
                    </div>
                  </Link>
                ) : null}

                <button
                  type="button"
                  onClick={() => {
                    setIsMegaPanelOpen(false);
                    openOrders();
                  }}
                  className="w-full text-left flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
                >
                  <ShoppingBasket className="h-4 w-4 text-neutral-600" />
                  <div>
                    <p className="font-semibold text-neutral-900">Track Orders</p>
                    <p className="text-[11px] text-neutral-500">View real-time shipments</p>
                  </div>
                </button>

                <Link
                  to="/shipping-policy"
                  onClick={() => setIsMegaPanelOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition"
                >
                  <ShieldCheck className="h-4 w-4 text-neutral-600" />
                  <div>
                    <p className="font-semibold text-neutral-900">Free Express Delivery</p>
                    <p className="text-[11px] text-neutral-500">Safe, insured transit</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Column 4: Premium Showcase Banner */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white uppercase tracking-wider">
                  Exclusive Hub
                </span>
                <h3 className="text-base font-bold leading-snug">
                  Next-Gen Flagships Live on Nexus
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Explore ultra-tier performance, cinematic cameras & multi-vendor warranty.
                </p>
              </div>

              <Link
                to="/collections"
                onClick={() => setIsMegaPanelOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-white text-neutral-950 hover:bg-neutral-100 transition relative z-10 shadow-md"
              >
                <span>Shop Flagships</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default CustomerNavbar;
