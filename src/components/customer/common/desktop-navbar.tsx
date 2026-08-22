import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import {
  ChevronDown,
  Grid2X2,
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Mic,
  Search,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Sparkles,
  Store,
  User,
} from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white text-neutral-900 shadow-xs">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Nav & Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <CustomerMobileNavbar isSignedIn={!!isSignedIn} />

          <Link to="/" className="flex items-center gap-2 group">
            {/* Red Star Icon */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-primary uppercase">
              WONDERCHEF<span className="text-neutral-900">.</span>
            </span>
          </Link>
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
            <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-900 px-1 text-[11px] font-black text-white shadow-xs">
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
    </header>
  );
}

export default CustomerNavbar;
