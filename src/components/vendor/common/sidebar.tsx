import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  IndianRupee,
  Store,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store";

type VendorNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

const items: VendorNavItem[] = [
  { label: "Dashboard", href: "/vendor", icon: LayoutDashboard, exact: true },
  { label: "My Products", href: "/vendor/products", icon: Package },
  { label: "Fulfill Orders", href: "/vendor/orders", icon: ShoppingBag },
  { label: "Earnings & Payouts", href: "/vendor/payouts", icon: IndianRupee },
  { label: "Storefront Settings", href: "/vendor/profile", icon: Store },
];

const sidebarRoot =
  "hidden w-[280px] shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col";
const brandRow =
  "flex h-[72px] items-center justify-between border-b border-sidebar-border px-5";
const navWrap = "space-y-1.5 p-3";
const navItemBase =
  "flex h-11 items-center gap-3 px-4 text-[14px] font-medium rounded-xl transition-all";

const activeItem = "bg-primary text-primary-foreground font-semibold shadow-xs";
const idleItem =
  "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

export function VendorSidebar() {
  const { user } = useAuthStore();
  const storeSlug = user?.storeSlug;

  return (
    <aside className={sidebarRoot}>
      {/* Brand & Store Header */}
      <div className={brandRow}>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
            <Store className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-foreground leading-none">
              Seller Portal
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Marketplace
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className={navWrap}>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.exact}
                className={({ isActive }) =>
                  `${navItemBase} ${isActive ? activeItem : idleItem}`
                }
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Public Storefront Link at bottom */}
      {storeSlug ? (
        <div className="p-3 border-t border-sidebar-border">
          <a
            href={`/store/${storeSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary text-xs font-semibold text-foreground transition"
          >
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-primary" />
              <span>View Public Store</span>
            </div>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </a>
        </div>
      ) : null}
    </aside>
  );
}

export default VendorSidebar;
