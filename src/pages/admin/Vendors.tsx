import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Store,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Search,
  IndianRupee,
  ShieldCheck,
  Eye,
  SlidersHorizontal,
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
  getAdminVendors,
  getAdminVendorById,
  updateAdminVendorStatus,
  updateAdminVendorCommission,
  type AdminVendorItem,
} from "@/features/admin/vendors/api";

export function AdminVendorsPage() {
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState<AdminVendorItem[]>([]);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    suspended: 0,
  });
  const [activeTab, setActiveTab] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Review Dialog
  const [selectedVendor, setSelectedVendor] = useState<AdminVendorItem | null>(
    null,
  );
  const [vendorDetailLoading, setVendorDetailLoading] = useState(false);
  const [decryptedAccount, setDecryptedAccount] = useState<string | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [newCommission, setNewCommission] = useState<number>(10);

  // Reject Prompt Dialog
  const [rejectPromptOpen, setRejectPromptOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    void loadVendors();
  }, [activeTab]);

  async function loadVendors() {
    try {
      setLoading(true);
      const statusParam = activeTab === "all" ? undefined : activeTab;
      const res = await getAdminVendors(statusParam, search);
      if (res) {
        setVendors(res.vendors);
        setCounts(res.counts);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load vendors");
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    void loadVendors();
  }

  async function handleOpenReview(vendor: AdminVendorItem) {
    setSelectedVendor(vendor);
    setNewCommission(vendor.commissionRate ?? 10);
    setDecryptedAccount(null);
    setReviewOpen(true);

    try {
      setVendorDetailLoading(true);
      const res = await getAdminVendorById(vendor._id, false);
      if (res) {
        setSelectedVendor(res.vendor);
      }
    } catch {
      // fallback to current vendor
    } finally {
      setVendorDetailLoading(false);
    }
  }

  async function handleRevealBank() {
    if (!selectedVendor) return;
    try {
      const res = await getAdminVendorById(selectedVendor._id, true);
      if (res?.decryptedAccountNumber) {
        setDecryptedAccount(res.decryptedAccountNumber);
        toast.success("Bank details decrypted for verification");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to decrypt account");
    }
  }

  async function handleStatusChange(
    status: "approved" | "rejected" | "suspended",
  ) {
    if (!selectedVendor) return;

    if (status === "rejected") {
      setRejectPromptOpen(true);
      return;
    }

    try {
      setActionLoading(true);
      const res = await updateAdminVendorStatus(selectedVendor._id, status);
      toast.success(res.message);
      setReviewOpen(false);
      void loadVendors();
    } catch (err: any) {
      toast.error(err.message || "Failed to update vendor status");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleConfirmReject() {
    if (!selectedVendor) return;
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    try {
      setActionLoading(true);
      const res = await updateAdminVendorStatus(
        selectedVendor._id,
        "rejected",
        rejectionReason.trim(),
      );
      toast.success(res.message);
      setRejectPromptOpen(false);
      setReviewOpen(false);
      setRejectionReason("");
      void loadVendors();
    } catch (err: any) {
      toast.error(err.message || "Failed to reject vendor");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleSaveCommission() {
    if (!selectedVendor) return;
    try {
      setActionLoading(true);
      const res = await updateAdminVendorCommission(
        selectedVendor._id,
        newCommission,
      );
      toast.success(res.message);
      setSelectedVendor(res.vendor);
      void loadVendors();
    } catch (err: any) {
      toast.error(err.message || "Failed to update commission rate");
    } finally {
      setActionLoading(false);
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 font-semibold">
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30 font-semibold">
            Pending Review
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/30 font-semibold">
            Suspended
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-neutral-500/10 text-neutral-600 border-neutral-500/30 font-semibold">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Vendors & Sellers Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Approve onboarding applications, configure commission overrides, and manage seller statuses.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-border bg-card">
          <p className="text-xs text-muted-foreground font-semibold uppercase">Total Vendors</p>
          <p className="text-2xl font-bold text-foreground mt-1">{counts.total}</p>
        </Card>
        <Card className="p-4 border-amber-500/30 bg-amber-500/5">
          <p className="text-xs text-amber-600 font-semibold uppercase flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Pending Review
          </p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{counts.pending}</p>
        </Card>
        <Card className="p-4 border-emerald-500/30 bg-emerald-500/5">
          <p className="text-xs text-emerald-600 font-semibold uppercase flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Active Approved
          </p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{counts.approved}</p>
        </Card>
        <Card className="p-4 border-destructive/30 bg-destructive/5">
          <p className="text-xs text-destructive font-semibold uppercase flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" />
            Suspended
          </p>
          <p className="text-2xl font-bold text-destructive mt-1">{counts.suspended}</p>
        </Card>
      </div>

      {/* Filter Tabs & Search Bar */}
      <Card className="border-border bg-card shadow-xs">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", label: "All Sellers" },
              { id: "pending", label: `Pending (${counts.pending})` },
              { id: "approved", label: "Approved" },
              { id: "suspended", label: "Suspended" },
              { id: "rejected", label: "Rejected" },
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

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search vendor or email..."
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

        {/* Vendors Table */}
        <CardContent className="p-0">
          {loading ? (
            <div className="py-12">
              <Commonloader />
            </div>
          ) : vendors.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No vendors found matching your criteria.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store & Brand</TableHead>
                  <TableHead>Owner / Account</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {vendor.storeLogo?.url ? (
                          <img
                            src={vendor.storeLogo.url}
                            alt={vendor.storeName}
                            className="h-9 w-9 rounded-lg object-cover border border-border shrink-0"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0 font-bold text-xs">
                            {vendor.storeName.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-sm text-foreground">{vendor.storeName}</p>
                          <p className="text-xs text-muted-foreground font-mono">/store/{vendor.storeSlug}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs font-semibold text-foreground">
                        {vendor.user?.name || "Unassigned"}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {vendor.user?.email}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs text-foreground">{vendor.businessPhone || "-"}</p>
                      <p className="text-[11px] text-muted-foreground">{vendor.businessEmail}</p>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-xs text-primary">
                        {vendor.commissionRate ?? 10}%
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(vendor.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs font-semibold rounded-lg"
                        onClick={() => handleOpenReview(vendor)}
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Review Application & Details Modal */}
      {selectedVendor ? (
        <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
            <DialogHeader>
              <div className="flex items-center justify-between gap-3">
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <Store className="h-5 w-5 text-primary" />
                  {selectedVendor.storeName}
                </DialogTitle>
                {getStatusBadge(selectedVendor.status)}
              </div>
              <DialogDescription>
                Registered on {new Date(selectedVendor.createdAt).toLocaleString()} • Store Slug: /store/{selectedVendor.storeSlug}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-2">
              {/* Store Description */}
              <div className="rounded-xl bg-secondary/40 p-4 border border-border text-sm">
                <p className="font-semibold text-xs text-muted-foreground uppercase mb-1">Store Description</p>
                <p className="text-foreground leading-relaxed">
                  {selectedVendor.description || "No description provided."}
                </p>
              </div>

              {/* Contact & Business Info */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl bg-card p-3 border border-border">
                  <p className="text-muted-foreground uppercase font-semibold">Business Email</p>
                  <p className="text-foreground font-bold mt-0.5">{selectedVendor.businessEmail}</p>
                </div>
                <div className="rounded-xl bg-card p-3 border border-border">
                  <p className="text-muted-foreground uppercase font-semibold">Business Phone</p>
                  <p className="text-foreground font-bold mt-0.5">{selectedVendor.businessPhone}</p>
                </div>
                <div className="rounded-xl bg-card p-3 border border-border">
                  <p className="text-muted-foreground uppercase font-semibold">GST Registration</p>
                  <p className="text-foreground font-mono font-bold mt-0.5">{selectedVendor.gstNumber || "Not provided"}</p>
                </div>
                <div className="rounded-xl bg-card p-3 border border-border">
                  <p className="text-muted-foreground uppercase font-semibold">Total Verified Sales</p>
                  <p className="text-foreground font-bold mt-0.5">₹{selectedVendor.totalSales?.toLocaleString() || 0}</p>
                </div>
              </div>

              {/* Bank Settlement Details */}
              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Encrypted Bank Settlement Details
                  </h4>
                  {!decryptedAccount ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRevealBank}
                      className="h-7 text-xs text-primary font-semibold hover:bg-primary/10"
                    >
                      Audit / Decrypt Number
                    </Button>
                  ) : null}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground block">Account Holder:</span>
                    <span className="font-semibold text-foreground">
                      {selectedVendor.bankDetails?.accountHolderName || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Account Number:</span>
                    <span className="font-mono font-bold text-foreground">
                      {decryptedAccount || selectedVendor.bankDetails?.accountNumberMasked || "••••••••"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">IFSC Code:</span>
                    <span className="font-mono font-semibold text-foreground uppercase">
                      {selectedVendor.bankDetails?.ifsc || "-"}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">UPI ID:</span>
                    <span className="font-semibold text-foreground">
                      {selectedVendor.bankDetails?.upiId || "None"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Commission Override Setting */}
              <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-foreground">Commission Rate</p>
                  <p className="text-[11px] text-muted-foreground">
                    Platform fee percentage charged per transaction for this vendor.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative w-24">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={newCommission}
                      onChange={(e) => setNewCommission(Number(e.target.value))}
                      className="h-9 text-xs text-center font-bold"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                      %
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSaveCommission}
                    disabled={actionLoading || newCommission === selectedVendor.commissionRate}
                    className="h-9 text-xs font-semibold rounded-lg"
                  >
                    Save
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-border flex flex-wrap items-center justify-between gap-3">
                <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  <Link to={`/store/${selectedVendor.storeSlug}`} target="_blank">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                    Preview Storefront
                  </Link>
                </Button>

                <div className="flex items-center gap-2">
                  {selectedVendor.status === "pending" ? (
                    <>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={actionLoading}
                        onClick={() => handleStatusChange("rejected")}
                        className="rounded-lg text-xs"
                      >
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                        Reject Application
                      </Button>
                      <Button
                        size="sm"
                        disabled={actionLoading}
                        onClick={() => handleStatusChange("approved")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                        Approve Seller
                      </Button>
                    </>
                  ) : selectedVendor.status === "approved" ? (
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={actionLoading}
                      onClick={() => handleStatusChange("suspended")}
                      className="rounded-lg text-xs"
                    >
                      <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                      Suspend Account
                    </Button>
                  ) : selectedVendor.status === "suspended" ? (
                    <Button
                      size="sm"
                      disabled={actionLoading}
                      onClick={() => handleStatusChange("approved")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                      Reinstate Seller
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}

      {/* Reject Prompt Dialog */}
      <Dialog open={rejectPromptOpen} onOpenChange={setRejectPromptOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Reject Seller Application
            </DialogTitle>
            <DialogDescription>
              Please provide a clear reason so the seller knows what corrections to make before re-applying.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Textarea
              required
              rows={4}
              placeholder="e.g. Bank IFSC code does not match account name. Please update with matching details."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="resize-none rounded-xl text-sm"
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRejectPromptOpen(false)}
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
    </div>
  );
}

export default AdminVendorsPage;
