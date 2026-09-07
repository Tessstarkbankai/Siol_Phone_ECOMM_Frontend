import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IndianRupee,
  ShoppingBag,
  Package,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  Store,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Commonloader } from "@/components/common/Loader";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import {
  getVendorDashboardStats,
  type VendorDashboardStats,
} from "@/features/vendor/api";

export function VendorDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<VendorDashboardStats | null>(null);

  useEffect(() => {
    void loadStats();
  }, []);

  async function loadStats() {
    try {
      setLoading(true);
      const res = await getVendorDashboardStats();
      if (res) {
        setStats(res);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  }

  if (loading || !stats) {
    return (
      <div className="p-8">
        <Commonloader />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Seller Dashboard Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor real-time fulfillment, net earnings, and stock health for your store.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-xl text-xs font-bold shadow-xs">
            <Link to="/vendor/products">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add Product
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="rounded-xl text-xs font-semibold">
            <Link to="/vendor/orders">
              <ShoppingBag className="h-3.5 w-3.5 mr-1" />
              Fulfill Orders
            </Link>
          </Button>
        </div>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-border bg-card shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-muted-foreground">
              Total Store Sales
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground mt-3">
            {formatPrice(stats.totalSales)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Gross sales from verified customer orders
          </p>
        </Card>

        <Card className="p-5 border-emerald-500/30 bg-emerald-500/5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-emerald-700">
              Net Earnings
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600">
              <IndianRupee className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-800 mt-3">
            {formatPrice(stats.totalEarnings)}
          </p>
          <p className="text-[11px] text-emerald-600/80 mt-1">
            After {stats.commissionRate}% platform commission
          </p>
        </Card>

        <Card className="p-5 border-amber-500/30 bg-amber-500/5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-amber-700">
              Pending Orders
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-800 mt-3">
            {stats.pendingOrders}
          </p>
          <p className="text-[11px] text-amber-600/80 mt-1">
            Awaiting packing or shipment dispatch
          </p>
        </Card>

        <Card className="p-5 border-border bg-card shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-muted-foreground">
              Unpaid Settlement Balance
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-foreground">
              <IndianRupee className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-foreground mt-3">
            {formatPrice(stats.pendingPayoutBalance)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Ready for next payout disbursement
          </p>
        </Card>
      </div>

      {/* Alerts & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Low Stock Card */}
        <Card className="p-5 border-border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Low-Stock Alert</h4>
              <p className="text-xs text-muted-foreground">
                {stats.lowStockCount} products have 5 or fewer units left
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="w-full text-xs font-semibold rounded-lg">
            <Link to="/vendor/products">Manage Inventory</Link>
          </Button>
        </Card>

        {/* Catalog Moderation Card */}
        <Card className="p-5 border-border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Catalog Status</h4>
              <p className="text-xs text-muted-foreground">
                {stats.pendingProductsCount} items pending admin review
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="w-full text-xs font-semibold rounded-lg">
            <Link to="/vendor/products">View Catalog</Link>
          </Button>
        </Card>

        {/* Store Profile Card */}
        <Card className="p-5 border-border bg-card">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground">
              <Store className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Storefront Branding</h4>
              <p className="text-xs text-muted-foreground">
                Customize your logo, hero banner, and store bio
              </p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="w-full text-xs font-semibold rounded-lg">
            <Link to="/vendor/profile">Edit Storefront</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default VendorDashboardPage;
