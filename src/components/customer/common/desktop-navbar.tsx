import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  ChevronRight,
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
  Zap,
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
import { getCustomerCategories, getCustomerProducts } from "@/features/customer/products/api";
import type { ProductCategory, CustomerProduct } from "@/features/customer/products/types";
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
  const [products, setProducts] = useState<CustomerProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string>("smartphones");
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

    let isMounted = true;
    setIsLoadingProducts(true);
    getCustomerProducts({ sort: "recent" })
      .then((res) => {
        if (isMounted && res) {
          setProducts(res);
        }
      })
      .catch((err) => {
        console.error("Failed to load products for mega menu:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingProducts(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const megaTabs = useMemo(
    () => [
      { id: "smartphones", label: "Smartphones" },
      { id: "feature_phones", label: "Feature Phones" },
      { id: "tablets_laptops", label: "Tablets & Laptops" },
      { id: "audio", label: "Audio" },
    ],
    [],
  );

  const displayedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    let filtered: CustomerProduct[] = [];
    if (activeMegaCategory === "smartphones") {
      filtered = products.filter((p) => {
        const cat = (p.category?.name || "").toLowerCase();
        const title = p.title.toLowerCase();
        const isOther =
          cat.includes("feature") ||
          cat.includes("tablet") ||
          cat.includes("laptop") ||
          cat.includes("ipad") ||
          cat.includes("audio") ||
          cat.includes("bud") ||
          cat.includes("watch") ||
          cat.includes("charger") ||
          cat.includes("power") ||
          cat.includes("case") ||
          title.includes("keypad") ||
          title.includes("feature") ||
          title.includes("tablet") ||
          title.includes("laptop") ||
          title.includes("ipad") ||
          title.includes("macbook") ||
          title.includes("zephyrus") ||
          title.includes("airpod") ||
          title.includes("headphone") ||
          title.includes("watch") ||
          title.includes("charger");

        if (isOther) return false;

        return (
          cat.includes("smartphone") ||
          cat.includes("phone") ||
          cat.includes("flagship") ||
          cat.includes("camera") ||
          cat.includes("foldable") ||
          cat.includes("flip") ||
          cat.includes("5g") ||
          cat.includes("gaming") ||
          title.includes("iphone") ||
          title.includes("galaxy") ||
          title.includes("pixel") ||
          title.includes("xiaomi") ||
          title.includes("oneplus") ||
          title.includes("nothing") ||
          title.includes("rog phone") ||
          title.includes("siol")
        );
      });
    } else if (activeMegaCategory === "feature_phones") {
      filtered = products.filter((p) => {
        const cat = (p.category?.name || "").toLowerCase();
        const title = p.title.toLowerCase();
        return (
          cat.includes("feature") ||
          cat.includes("keypad") ||
          title.includes("keypad") ||
          title.includes("classic 4g") ||
          title.includes("3210") ||
          title.includes("prima") ||
          title.includes("power 1000") ||
          title.includes("feature phone")
        );
      });
    } else if (activeMegaCategory === "tablets_laptops") {
      filtered = products.filter((p) => {
        const cat = (p.category?.name || "").toLowerCase();
        const title = p.title.toLowerCase();
        return (
          cat.includes("tablet") ||
          cat.includes("laptop") ||
          cat.includes("ipad") ||
          title.includes("ipad") ||
          title.includes("tab") ||
          title.includes("macbook") ||
          title.includes("laptop") ||
          title.includes("zephyrus")
        );
      });
    } else if (activeMegaCategory === "audio") {
      filtered = products.filter((p) => {
        const cat = (p.category?.name || "").toLowerCase();
        const title = p.title.toLowerCase();
        return (
          cat.includes("audio") ||
          cat.includes("bud") ||
          cat.includes("headphone") ||
          cat.includes("earbud") ||
          cat.includes("tws") ||
          title.includes("airpod") ||
          title.includes("bud") ||
          title.includes("headphone") ||
          title.includes("wh-1000") ||
          title.includes("quietcomfort")
        );
      });
    }

    if (filtered.length === 0) {
      filtered = products;
    }

    return filtered.slice(0, 5);
  }, [products, activeMegaCategory]);

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
              className="h-6 sm:h-6 w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none"
            />
          </Link>

          {/* Desktop Navigation Links / Mega Menu Trigger */}
          <div className="hidden lg:flex items-center gap-1 ml-4">
            <button
              type="button"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsMegaPanelOpen((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${isMegaPanelOpen
                  ? "bg-primary/10 text-primary"
                  : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
            >
              <Grid2X2 className="h-4 w-4 text-primary" />
              <span>Explore</span>
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${isMegaPanelOpen ? "rotate-180 text-primary" : "text-neutral-500"
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
              to="/support"
              className="px-3 py-2 text-xs font-semibold rounded-xl text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition"
            >
              Support
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
                onClick={() => { }}
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

      {/* Horizontal Dropdown Mega Panel on Desktop Nav Hover (Samsung-Inspired Animated Image Cards) */}
      {isMegaPanelOpen ? (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 right-0 top-full z-50 border-b border-neutral-200 bg-white/98 backdrop-blur-xl shadow-2xl animate-in fade-in-0 slide-in-from-top-2 duration-200"
        >
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 space-y-4">
            {/* Top Navigation Strip: Samsung-style Minimal Category Tabs + View All CTA */}
            <div className="flex items-center justify-between border-b border-neutral-200/90 pb-3 gap-4">
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
                {megaTabs.map((tab) => {
                  const isActive = activeMegaCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveMegaCategory(tab.id)}
                      className={`relative px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer rounded-none select-none shrink-0 ${
                        isActive
                          ? "text-neutral-950 font-bold"
                          : "text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <span className="absolute inset-x-2 -bottom-3 h-[2px] bg-neutral-950 transition-all duration-300" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <Link
                  to="/collections"
                  onClick={() => setIsMegaPanelOpen(false)}
                  className="group inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 hover:text-primary transition"
                >
                  <span>Explore All Products ({products.length})</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Main Product Showcase: Samsung-Inspired Minimal UN-ROUNDED Image Cards with Hover Reveal */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 pt-1">
              {isLoadingProducts && displayedProducts.length === 0 ? (
                // Skeleton loading state with unrounded cards
                Array.from({ length: 5 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-[345px] bg-[#f8f9fa] border border-neutral-200/70 rounded-none animate-pulse p-4 flex flex-col justify-between"
                  >
                    <div className="h-4 w-20 bg-neutral-200 rounded-none" />
                    <div className="h-36 w-full bg-neutral-200/60 rounded-none mx-auto my-4" />
                    <div className="space-y-2">
                      <div className="h-3 w-16 bg-neutral-200 rounded-none" />
                      <div className="h-4 w-full bg-neutral-200 rounded-none" />
                      <div className="h-4 w-24 bg-neutral-300 rounded-none" />
                    </div>
                  </div>
                ))
              ) : displayedProducts.length > 0 ? (
                displayedProducts.map((p) => {
                  const coverImage =
                    p.images?.find((img) => img.isCover)?.url ||
                    p.images?.[0]?.url ||
                    "/categories/smartphone.png";
                  const finalPrice =
                    p.salePercentage > 0
                      ? Math.round(p.price * (1 - p.salePercentage / 100))
                      : p.price;

                  return (
                    <div
                      key={p._id}
                      className="group relative flex flex-col justify-between bg-[#f8f9fa] hover:bg-white border border-neutral-200/90 hover:border-neutral-950 transition-all duration-300 rounded-none overflow-hidden p-3.5 text-left cursor-pointer h-[345px] select-none"
                    >
                      {/* Top Header inside Card */}
                      <div className="flex items-center justify-between gap-1 z-10">
                        {p.salePercentage > 0 ? (
                          <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-neutral-950 text-white rounded-none">
                            Save {p.salePercentage}%
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-neutral-200/80 text-neutral-800 rounded-none">
                            {p.category?.name || "Flagship"}
                          </span>
                        )}

                        <span className="text-[10px] font-medium text-emerald-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          In Stock
                        </span>
                      </div>

                      {/* Product Image Stage (Floating & Smooth Zoom Animation) */}
                      <div className="relative h-44 w-full flex items-center justify-center p-2 my-auto overflow-hidden">
                        <img
                          src={coverImage}
                          alt={p.title}
                          className="max-h-full max-w-full object-contain filter drop-shadow-sm select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2"
                          loading="lazy"
                        />
                      </div>

                      {/* Resting Product Info */}
                      <div className="space-y-1 z-10">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 truncate">
                          {p.brand || "SiOL"}
                        </p>
                        <h4 className="text-xs font-bold text-neutral-900 tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                          {p.title}
                        </h4>
                        <div className="flex items-baseline gap-1.5 pt-0.5">
                          <span className="text-xs font-bold text-neutral-950">
                            ₹{finalPrice.toLocaleString("en-IN")}
                          </span>
                          {p.salePercentage > 0 && (
                            <span className="text-[10px] text-neutral-400 line-through">
                              ₹{p.price.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Samsung-Inspired On-Hover Detail Drawer (Slides Up Seamlessly) */}
                      <div className="absolute inset-x-0 bottom-0 bg-white/98 backdrop-blur-md p-3.5 border-t border-neutral-200/90 shadow-xl translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col gap-2.5 z-20">
                        {/* Specs Highlight */}
                        <div className="space-y-1">
                          {p.sizes && p.sizes.length > 0 ? (
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-neutral-500">Storage:</span>
                              <span className="font-bold text-neutral-900">
                                {p.sizes.slice(0, 3).join(" • ")}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-neutral-500">Edition:</span>
                              <span className="font-bold text-neutral-900">Official Direct</span>
                            </div>
                          )}

                          {p.colors && p.colors.length > 0 && (
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-neutral-500">Finishes:</span>
                              <div className="flex items-center gap-1">
                                {p.colors.slice(0, 4).map((c, i) => (
                                  <span
                                    key={i}
                                    className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                                    style={{ backgroundColor: c }}
                                    title={c}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Dual Action Buttons (Completely Un-rounded) */}
                        <div className="flex items-center gap-2 pt-0.5">
                          <Link
                            to={`/collection/${p._id}`}
                            onClick={() => setIsMegaPanelOpen(false)}
                            className="flex-1 py-1.5 px-2 text-center text-[11px] font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300/80 rounded-none transition"
                          >
                            Learn More
                          </Link>
                          <Link
                            to={`/collection/${p._id}`}
                            onClick={() => setIsMegaPanelOpen(false)}
                            className="flex-1 py-1.5 px-2 text-center text-[11px] font-bold text-white bg-neutral-950 hover:bg-primary rounded-none transition flex items-center justify-center gap-1"
                          >
                            <span>Buy</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-12 text-center text-neutral-500 text-xs">
                  No products found in this category.
                </div>
              )}

              {/* Complementary Fill Card if less than 5 products are returned */}
              {displayedProducts.length > 0 && displayedProducts.length < 5 && (
                <Link
                  to="/collections"
                  onClick={() => setIsMegaPanelOpen(false)}
                  className="group flex flex-col justify-between bg-[#f8f9fa] hover:bg-neutral-900 text-neutral-900 hover:text-white border border-dashed border-neutral-300 hover:border-neutral-900 transition-all duration-300 rounded-none p-5 h-[345px] text-center"
                >
                  <div className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                    SiOL Ecosystem
                  </div>
                  <div className="space-y-2">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-none bg-neutral-200/80 group-hover:bg-white/10 transition">
                      <Grid2X2 className="h-5 w-5" />
                    </div>
                    <h4 className="text-sm font-bold tracking-tight">
                      Browse All Models
                    </h4>
                    <p className="text-xs text-neutral-500 group-hover:text-neutral-400 transition">
                      Discover complete range of 5G flagships, foldables & audio.
                    </p>
                  </div>
                  <div className="inline-flex items-center justify-center gap-1 text-xs font-bold underline underline-offset-4">
                    <span>View Catalog</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              )}
            </div>

            {/* Bottom Samsung-Style Utility Bar (Warranty, Orders, B2B) */}
            <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 font-semibold text-neutral-800">
                  <ShieldCheck className="h-3.5 w-3.5 text-neutral-950" />
                  SiOL Direct Warranty
                </span>
                <span>•</span>
                <span className="hidden md:inline">Free Insured Express Delivery</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">7-Day Return Guarantee</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold">
                {isDistributorProgramEnabled() && (
                  <Link
                    to="/become-distributor"
                    onClick={() => setIsMegaPanelOpen(false)}
                    className="hover:text-neutral-900 transition"
                  >
                    B2B & Distribution
                  </Link>
                )}
                {isMultiVendorEnabled() && (
                  <Link
                    to="/become-seller"
                    onClick={() => setIsMegaPanelOpen(false)}
                    className="hover:text-neutral-900 transition"
                  >
                    Seller Portal
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsMegaPanelOpen(false);
                    openOrders();
                  }}
                  className="hover:text-neutral-900 transition cursor-pointer"
                >
                  Track Orders
                </button>
                <Link
                  to="/support"
                  onClick={() => setIsMegaPanelOpen(false)}
                  className="hover:text-neutral-900 transition"
                >
                  Support & Lounges
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default CustomerNavbar;
