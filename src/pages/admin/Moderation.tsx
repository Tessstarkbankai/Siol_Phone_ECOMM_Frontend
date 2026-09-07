import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Package,
  Store,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Commonloader } from "@/components/common/Loader";
import { toast } from "sonner";
import {
  getAdminProductModeration,
  moderateAdminProduct,
  type AdminModerationProduct,
} from "@/features/admin/vendors/api";
import { formatPrice } from "@/lib/utils";

export function AdminModerationPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<AdminModerationProduct[]>([]);
  const [counts, setCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [search, setSearch] = useState("");

  // Rejection dialog
  const [rejectDialogProduct, setRejectDialogProduct] =
    useState<AdminModerationProduct | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    void loadModeration();
  }, [activeTab]);

  async function loadModeration() {
    try {
      setLoading(true);
      const res = await getAdminProductModeration(activeTab, search);
      if (res) {
        setProducts(res.products);
        setCounts(res.counts);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load moderation queue");
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    void loadModeration();
  }

  async function handleApprove(productId: string) {
    try {
      setActionLoading(true);
      const res = await moderateAdminProduct(productId, "approved");
      toast.success(res.message || "Product approved and published to storefront");
      void loadModeration();
    } catch (err: any) {
      toast.error(err.message || "Failed to approve product");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleConfirmReject() {
    if (!rejectDialogProduct) return;
    if (!rejectionReason.trim()) {
      toast.error("Please enter a reason for rejection");
      return;
    }

    try {
      setActionLoading(true);
      const res = await moderateAdminProduct(
        rejectDialogProduct._id,
        "rejected",
        rejectionReason.trim(),
      );
      toast.success(res.message || "Product rejected");
      setRejectDialogProduct(null);
      setRejectionReason("");
      void loadModeration();
    } catch (err: any) {
      toast.error(err.message || "Failed to reject product");
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          Product Moderation Queue
        </h1>
        <p className="text-sm text-muted-foreground">
          Review seller-submitted listings before they appear on the public storefront.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <Card className="border-border bg-card shadow-xs">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {[
              { id: "pending", label: `Pending Queue (${counts.pending})` },
              { id: "approved", label: `Approved (${counts.approved})` },
              { id: "rejected", label: `Rejected (${counts.rejected})` },
            ].map((tab) => (
              <Button
                key={tab.id}
                type="button"
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                className="h-8 text-xs font-semibold rounded-lg"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-56 pl-8 text-xs rounded-lg"
              />
            </div>
            <Button type="submit" size="sm" variant="outline" className="h-8 text-xs rounded-lg">
              Search
            </Button>
          </form>
        </div>

        <CardContent className="p-0">
          {loading ? (
            <div className="py-12">
              <Commonloader />
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No products found in the {activeTab} moderation queue.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Vendor / Store</TableHead>
                  <TableHead>Price / Sale</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Submitted On</TableHead>
                  <TableHead className="text-right">Moderation Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => {
                  const coverImage =
                    p.images.find((img) => img.isCover)?.url ||
                    p.images[0]?.url;

                  return (
                    <TableRow key={p._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {coverImage ? (
                            <img
                              src={coverImage}
                              alt={p.title}
                              className="h-11 w-11 rounded-lg object-cover border border-border shrink-0"
                            />
                          ) : (
                            <div className="h-11 w-11 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                              <Package className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div className="max-w-xs">
                            <p className="font-bold text-sm text-foreground truncate">
                              {p.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {p.category?.name || "General"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Store className="h-3.5 w-3.5 text-primary" />
                          <span className="text-xs font-bold text-foreground">
                            {p.vendor?.storeName || "Vendor"}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          {p.vendor?.businessEmail}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-xs text-foreground">
                          {formatPrice(p.price)}
                        </p>
                        {p.salePercentage > 0 ? (
                          <span className="text-[10px] text-emerald-600 font-semibold">
                            {p.salePercentage}% OFF
                          </span>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs font-semibold ${
                            p.stock <= 5 ? "text-amber-600" : "text-foreground"
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {p.approvalStatus === "pending" ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs text-destructive hover:bg-destructive/10"
                                onClick={() => {
                                  setRejectDialogProduct(p);
                                  setRejectionReason("");
                                }}
                              >
                                <XCircle className="h-3.5 w-3.5 mr-1" />
                                Reject
                              </Button>
                              <Button
                                size="sm"
                                className="h-8 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={() => void handleApprove(p._id)}
                                disabled={actionLoading}
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                Approve
                              </Button>
                            </>
                          ) : p.approvalStatus === "approved" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs text-destructive hover:bg-destructive/10"
                              onClick={() => {
                                setRejectDialogProduct(p);
                                setRejectionReason("");
                              }}
                            >
                              Revoke Approval
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="h-8 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
                              onClick={() => void handleApprove(p._id)}
                            >
                              Re-Approve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Rejection Reason Dialog */}
      {rejectDialogProduct ? (
        <Dialog
          open={Boolean(rejectDialogProduct)}
          onOpenChange={(open) => !open && setRejectDialogProduct(null)}
        >
          <DialogContent className="max-w-md rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Reject Product Listing
              </DialogTitle>
              <DialogDescription>
                Provide feedback to {rejectDialogProduct.vendor?.storeName || "the vendor"} explaining why this listing did not meet guidelines.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Textarea
                required
                rows={3}
                placeholder="e.g. Images do not show authentic product packaging, or description lacks technical specifications."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="rounded-xl text-sm resize-none"
              />
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRejectDialogProduct(null)}
                  className="rounded-lg text-xs"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={actionLoading || !rejectionReason.trim()}
                  onClick={handleConfirmReject}
                  className="rounded-lg text-xs font-bold"
                >
                  Confirm Rejection
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}

export default AdminModerationPage;
