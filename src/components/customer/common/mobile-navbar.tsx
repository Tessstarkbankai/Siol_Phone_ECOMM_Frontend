import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import {
  Grid2X2,
  Heart,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Tag,
  User,
  type LucideIcon,
} from "lucide-react";
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

export function CustomerMobileNavbar({
  isSignedIn,
}: CustomerMobileNavbarProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const shopItems: NavItem[] = [
    { label: "All Collections", href: "/collections", icon: ShoppingBag },
    { label: "New Arrivals", href: "/collections?sort=recent", icon: Grid2X2 },
    {
      label: "Special Offers",
      href: "/collections?sort=price-low",
      icon: Tag,
      badge: "SALE",
    },
  ];

  return (
    <div className="flex items-center">
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
                className="flex items-center gap-2.5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-xl font-black tracking-tight text-primary uppercase">
                  WONDERCHEF<span className="text-neutral-900">.</span>
                </span>
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
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-primary transition"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-primary" />
                      {item.label}
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
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-primary hover:bg-primary/10 transition"
                    >
                      <LayoutDashboard className="h-4 w-4 text-primary" />
                      <span>Admin Dashboard</span>
                    </Link>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setWishlistOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-primary transition"
                  >
                    <span className="flex items-center gap-3">
                      <Heart className="h-4 w-4 text-primary" />
                      My Wishlist
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
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-primary transition text-left"
                  >
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    <span>My Orders</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      void openProfile();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-primary transition text-left"
                  >
                    <User className="h-4 w-4 text-primary" />
                    <span>My Profile & Addresses</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/sign-in"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-primary hover:bg-primary/10 transition"
                >
                  <LogIn className="h-4 w-4 text-primary" />
                  <span>Login / Register</span>
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
