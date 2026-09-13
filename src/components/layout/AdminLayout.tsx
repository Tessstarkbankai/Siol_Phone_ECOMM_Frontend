import { Link, Outlet } from "react-router-dom";
import { AdminSidebar } from "../admin/common/sidebar";
import { UserButton } from "@clerk/react";
import { ExternalLink, Store } from "lucide-react";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-secondary/45">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border px-4 backdrop-blur bg-background/80 lg:px-6">
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold text-foreground hover:opacity-80 transition-opacity lg:hidden"
              title="Return to Customer Storefront"
            >
              <Store className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">E-Shopify</span>
            </Link>

            <div className="ml-auto flex items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full border border-border bg-card/60 hover:bg-muted transition-colors shadow-xs"
                title="View Customer Storefront"
              >
                <span>Store Home</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
              <UserButton />
            </div>
          </header>

          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

