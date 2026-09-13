import {
  BadgePercent,
  BarChart3,
  Building2,
  Film,
  IndianRupee,
  LayoutDashboard,
  Package,
  Settings2,
  ShieldCheck,
  Store,
  type LucideIcon,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { isMultiVendorEnabled, isDistributorProgramEnabled } from "@/config/features";

type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const items: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  ...(isDistributorProgramEnabled()
    ? [{ label: "Distributor Requests", href: "/admin/distributors", icon: Building2 }]
    : []),
  ...(isMultiVendorEnabled()
    ? [
        { label: "Moderation", href: "/admin/moderation", icon: ShieldCheck },
        { label: "Vendors", href: "/admin/vendors", icon: Store },
        { label: "Payouts", href: "/admin/payouts", icon: IndianRupee },
      ]
    : []),
  { label: "Orders", href: "/admin/orders", icon: BarChart3 },
  { label: "Coupons", href: "/admin/coupons", icon: BadgePercent },
  { label: "Videos", href: "/admin/videos", icon: Film },
  { label: "Settings", href: "/admin/settings", icon: Settings2 },
];

const sidebarRoot =
  "hidden w-[300px] shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col";

const brandRow =
  "flex h-[72px] items-center border-b border-sidebar-border px-5";
const navWrap = "space-y-2";
const navItemBase =
  "flex h-11 items-center gap-3 px-4 text-[15px] font-medium transition-colors";

const navItemDesktop = `${navItemBase} rounded-none`;
const navItemMobile = navItemBase;

const activeItem = "bg-sidebar-primary text-sidebar-primary-foreground";
const idleItem =
  "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

function SidebarNav() {
  return (
    <nav className={navWrap}>
      {items.map((item) => {
        const Icon = item.icon;
        const link = (
          <NavLink
            key={item.label}
            to={item.href}
            end={item.href === "/admin"}
            className={({ isActive }) =>
              `${navItemDesktop} ${isActive ? activeItem : idleItem}`
            }
          >
            <Icon className="h-[18px] w-[18px]" />
            <span>{item.label}</span>
          </NavLink>
        );

        return link;
      })}
    </nav>
  );
}

export function AdminSidebar() {
  return (
    <aside className={sidebarRoot}>
      <div className={brandRow}>
        <Link
          to="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
          title="Return to Customer Storefront"
        >
          <Store className="w-10 h-10 text-primary" />
          <span className="text-[25px] font-semibold text-foreground">
            E-Shopify
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>
  );
}
