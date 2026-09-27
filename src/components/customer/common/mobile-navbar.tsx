import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import {
  Building2,
  Headphones,
  Heart,
  Laptop,
  LayoutDashboard,
  LayoutGrid,
  LogIn,
  LogOut,
  Menu,
  Phone,
  Search,
  Shield,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Store,
  Tablet,
  User,
  Watch,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { isMultiVendorEnabled, isDistributorProgramEnabled } from "@/config/features";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/features/auth/store";
import { useCustomerCartAndCheckoutStore } from "@/features/customer/cart-and-checkout/store";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { useCustomerOrdersStore } from "@/features/customer/orders/store";
import { useCustomerProfileStore } from "@/features/customer/profile/store";
import { getCustomerCategories } from "@/features/customer/products/api";
import type { ProductCategory } from "@/features/customer/products/types";

type CustomerMobileNavbarProps = {
  isSignedIn: boolean;
};

export type NavItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon: LucideIcon;
  badge?: string;
};

function getCategoryIcon(name: string): LucideIcon {
  const lower = name.toLowerCase();
  if (
    lower.includes("smart") ||
    lower.includes("flagship") ||
    lower.includes("android") ||
    lower.includes("ios") ||
    lower.includes("iphone") ||
    lower.includes("mobile")
  ) {
    if (lower.includes("feature") || lower.includes("keypad") || lower.includes("basic")) {
      return Phone;
    }
    return Smartphone;
  }
  if (lower.includes("feature") || lower.includes("keypad") || lower.includes("basic") || lower.includes("bar")) {
    return Phone;
  }
  if (lower.includes("tablet") || lower.includes("ipad")) {
    return Tablet;
  }
  if (lower.includes("laptop") || lower.includes("macbook") || lower.includes("pc")) {
    return Laptop;
  }
  if (
    lower.includes("audio") ||
    lower.includes("bud") ||
    lower.includes("headphone") ||
    lower.includes("earbud") ||
    lower.includes("sound") ||
    lower.includes("tws")
  ) {
    return Headphones;
  }
  if (lower.includes("watch") || lower.includes("band") || lower.includes("wearable")) {
    return Watch;
  }
  if (
    lower.includes("charge") ||
    lower.includes("power") ||
    lower.includes("cable") ||
    lower.includes("magsafe") ||
    lower.includes("gan")
  ) {
    return Zap;
  }
  if (lower.includes("case") || lower.includes("cover") || lower.includes("protect") || lower.includes("glass")) {
    return Shield;
  }
  if (lower.includes("phone")) {
    return Smartphone;
  }
  return LayoutGrid;
}

export function CustomerMobileNavbar({
  isSignedIn,
}: CustomerMobileNavbarProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  useEffect(() => {
    let isMounted = true;
    getCustomerCategories()
      .then((data) => {
        if (isMounted && data) {
          setCategories(data);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const { items: wishlistItems, setOpen: setWishlistOpen } =
    useCustomerWishlistStore((state) => state);
  const { openOrders } = useCustomerOrdersStore((state) => state);
  const { openProfile } = useCustomerProfileStore((state) => state);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setOpen(false);
    }
  }

  const shopItems: NavItem[] = useMemo(() => {
    const smartphoneCat = categories.find((c) =>
      c.name.toLowerCase().includes("smart") || c.name.toLowerCase().includes("flagship")
    );
    const featureCat = categories.find((c) =>
      c.name.toLowerCase().includes("feature") || c.name.toLowerCase().includes("keypad")
    );
    const tabletCat = categories.find(
      (c) =>
        c.name.toLowerCase().includes("tablet") ||
        c.name.toLowerCase().includes("laptop")
    );
    const audioCat = categories.find(
      (c) =>
        c.name.toLowerCase().includes("audio") ||
        c.name.toLowerCase().includes("bud") ||
        c.name.toLowerCase().includes("headphone")
    );

    const baseItems: NavItem[] = [
      {
        label: "Smartphones",
        href: smartphoneCat
          ? `/collections?category=${smartphoneCat._id}`
          : "/collections?category=smartphones",
        icon: Smartphone,
      },
      {
        label: "Feature Phones",
        href: featureCat
          ? `/collections?category=${featureCat._id}`
          : "/collections?category=feature-phones",
        icon: Phone,
      },
      {
        label: "Tablets & Laptops",
        href: tabletCat
          ? `/collections?category=${tabletCat._id}`
          : "/collections?category=tablets-laptops",
        icon: Laptop,
      },
      {
        label: "Audio & Wearables",
        href: audioCat
          ? `/collections?category=${audioCat._id}`
          : "/collections?category=audio",
        icon: Headphones,
      },
    ];

    // Include any additional categories from the database not covered in base categories
    const matchedIds = [
      smartphoneCat?._id,
      featureCat?._id,
      tabletCat?._id,
      audioCat?._id,
    ].filter(Boolean);

    const extraItems: NavItem[] = categories
      .filter((cat) => !matchedIds.includes(cat._id))
      .map((cat) => ({
        label: cat.name,
        href: `/collections?category=${cat._id}`,
        icon: getCategoryIcon(cat.name),
      }));

    return [
      ...baseItems,
      ...extraItems,
      { label: "All Products", href: "/collections", icon: LayoutGrid },
      { label: "Support & Repairs", href: "/support", icon: ShieldCheck },
    ];
  }, [categories]);

  return (
    <div className="flex items-center md:hidden">
      {/* Hamburger Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-neutral-800 hover:bg-neutral-100 rounded-xl"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[320px] sm:w-[380px] bg-white text-neutral-900 border-r border-neutral-200 p-0 flex flex-col justify-between"
        >
          <div>
            <SheetHeader className="sr-only">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {/* Brand Logo Header */}
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="flex items-center py-0.5"
                title="SiOL - Home"
              >
                <img
                  src="/siol-logo-black.png"
                  alt="SiOL"
                  className="h-7 w-auto object-contain select-none"
                />
              </Link>
            </div>

            {/* Search Input in Mobile Drawer */}
            <div className="p-4 border-b border-neutral-200">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-neutral-50 border-neutral-300 text-neutral-900 text-xs h-10 placeholder:text-neutral-500 focus-visible:ring-primary rounded-lg"
                />
                <Button type="submit" size="sm" className="bg-primary text-white h-10 px-3.5 rounded-lg">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Shop Links */}
            <div className="p-4 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 px-3 py-1">
                Explore Departments
              </p>
              {shopItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.href || "/"}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-primary transition"
                  >
                    <span className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-[13px]">{item.label}</span>
                    </span>
                    {item.badge ? (
                      <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>

            <Separator className="bg-neutral-200" />

            {/* B2B / Partner Program */}
            <div className="p-4 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 px-3 py-1">
                B2B & Partnerships
              </p>
              {isMultiVendorEnabled() ? (
                <Link
                  to="/become-seller"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100/70 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Store className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-[13px]">Become a Seller</span>
                </Link>
              ) : isDistributorProgramEnabled() ? (
                <Link
                  to="/become-distributor"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-primary hover:bg-primary/10 transition"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-[13px]">Become a Distributor</span>
                </Link>
              ) : null}
            </div>

            <Separator className="bg-neutral-200" />

            {/* Account & Profile */}
            <div className="p-4 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 px-3 py-1">
                Account & Orders
              </p>

              {isSignedIn ? (
                <>
                  {user?.role === "admin" ? (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-primary hover:bg-primary/10 transition"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <LayoutDashboard className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-[13px]">Admin Dashboard</span>
                    </Link>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setWishlistOpen(true);
                    }}
                    className="group w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-primary transition text-left"
                  >
                    <span className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Heart className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-[13px]">My Wishlist</span>
                    </span>
                    {wishlistItems.length > 0 ? (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-bold">
                        {wishlistItems.length}
                      </span>
                    ) : null}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      void openOrders();
                    }}
                    className="group w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-primary transition text-left"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-[13px]">My Orders</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      void openProfile();
                    }}
                    className="group w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-primary transition text-left"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-[13px]">My Profile & Addresses</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/sign-in"
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-primary hover:bg-primary/10 transition"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <LogIn className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-[13px]">Login / Register</span>
                </Link>
              )}
            </div>
          </div>

          {/* Footer of Drawer */}
          {isSignedIn ? (
            <div className="p-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  void signOut();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CustomerMobileNavbar;
