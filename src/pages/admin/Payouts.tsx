import { useState, useEffect } from "react";
import {
  IndianRupee,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Commonloader } from "@/components/common/Loader";
import { toast } from "sonner";
import {
  getAdminPayouts,
  createAdminPayout,
  updateAdminPayoutStatus,
  type AdminPayoutRecord,
  type AdminVendorBalance,
} from "@/features/admin/vendors/api";
import { formatPrice } from "@/lib/utils";

export function AdminPayoutsPage() {
  const [loading, setLoading] = useState(true);
  const [payouts, setPayouts] = useState<AdminPayoutRecord[]>([]);
  const [vendorBalances, setVendorBalances] = useState<AdminVendorBalance[]>([]);

  // Create Payout Dialog
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState("");
  const [payoutAmount, setPayoutAmount] = useState<number>(0);
  const [transactionRef, setTransactionRef] = useState("");
  const [note, setNote] = useState("");
  const [payoutStatus, setPayoutStatus] = useState("paid");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    void loadPayouts();
  }, []);

  async function loadPayouts() {
    try {
      setLoading(true);
      const res = await getAdminPayouts();
      if (res) {
        setPayouts(res.payouts);
        setVendorBalances(res.vendorBalances);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load payouts");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenCreate(balanceItem?: AdminVendorBalance) {
    if (balanceItem) {
      setSelectedVendorId(balanceItem.vendorId);
      setPayoutAmount(balanceItem.pendingBalance);
    } else {
      setSelectedVendorId(vendorBalances[0]?.vendorId || "");
      setPayoutAmount(vendorBalances[0]?.pendingBalance || 0);
    }
    setTransactionRef("");
    setNote("");
    setPayoutStatus("paid");
    setCreateDialogOpen(true);
  }

  async function handleRecordPayout(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedVendorId) {
      toast.error("Please select a vendor");
      return;
    }
    if (payoutAmount <= 0) {
      toast.error("Payout amount must be greater than zero");
      return;
    }

    try {
      setActionLoading(true);
      const res = await createAdminPayout({
        vendorId: selectedVendorId,
        amount: payoutAmount,
        transactionReference: transactionRef.trim(),
        note: note.trim(),
        status: payoutStatus,
      });

      toast.success(res.message || "Payout recorded successfully");
      setCreateDialogOpen(false);
      void loadPayouts();
    } catch (err: any) {
      toast.error(err.message || "Failed to record payout");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleUpdateStatus(payoutId: string, status: string) {
    try {
      setActionLoading(true);
      const res = await updateAdminPayoutStatus(payoutId, { status });
      toast.success(res.message || "Payout status updated");
      void loadPayouts();
    } catch (err: any) {
      toast.error(err.message || "Failed to update payout status");
    } finally {
      setActionLoading(false);
    }
  }

  const totalEarnedAcrossVendors = vendorBalances.reduce(
    (sum, v) => sum + v.totalEarned,
    0,
  );
  const totalSettledAcrossVendors = vendorBalances.reduce(
    (sum, v) => sum + v.totalPaid,
    0,
  );
  const totalPendingAcrossVendors = vendorBalances.reduce(
    (sum, v) => sum + v.pendingBalance,
    0,
  );

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <IndianRupee className="h-6 w-6 text-primary" />
            Vendor Payouts & Settlement Ledger
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor vendor earnings, pending balances, and record manual bank transfers/UPI settlements.
          </p>
        </div>
        <Button
          onClick={() => handleOpenCreate()}
          className="rounded-xl text-xs font-bold"
        >
          <ArrowUpRight className="h-4 w-4 mr-1.5" />
          Record New Payout
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-border bg-card">
          <p className="text-xs text-muted-foreground font-semibold uppercase">
            Total Vendor Earnings
          </p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {formatPrice(totalEarnedAcrossVendors)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Net payout owed from all completed orders
          </p>
        </Card>
        <Card className="p-4 border-emerald-500/30 bg-emerald-500/5">
          <p className="text-xs text-emerald-600 font-semibold uppercase flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Total Settled Payouts
          </p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">
            {formatPrice(totalSettledAcrossVendors)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Disbursed via bank transfer/UPI
          </p>
        </Card>
        <Card className="p-4 border-amber-500/30 bg-amber-500/5">
          <p className="text-xs text-amber-600 font-semibold uppercase flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Outstanding Balances
          </p>
          <p className="text-2xl font-bold text-amber-700 mt-1">
            {formatPrice(totalPendingAcrossVendors)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Pending disbursement across active sellers
          </p>
        </Card>
      </div>

      {/* Section 1: Active Vendor Balances */}
      <Card className="border-border bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base">Outstanding Balances by Vendor</CardTitle>
          <CardDescription>
            Calculated in real-time from verified paid sub-orders minus platform commission.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-8">
              <Commonloader />
            </div>
          ) : vendorBalances.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No vendors registered.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor Store</TableHead>
                  <TableHead>Settlement Account</TableHead>
                  <TableHead>Total Earned</TableHead>
                  <TableHead>Total Disbursed</TableHead>
                  <TableHead>Pending Balance</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendorBalances.map((v) => (
                  <TableRow key={v.vendorId}>
                    <TableCell>
                      <p className="font-bold text-sm text-foreground">{v.storeName}</p>
                      <p className="text-xs text-muted-foreground font-mono">/store/{v.storeSlug}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs font-mono font-semibold text-foreground">
                        {v.bankDetails?.accountNumberMasked || "No account set"}
                      </p>
                      <p className="text-[11px] text-muted-foreground uppercase">
                        {v.bankDetails?.ifsc} {v.bankDetails?.upiId ? `• ${v.bankDetails.upiId}` : ""}
                      </p>
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-foreground">
                      {formatPrice(v.totalEarned)}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-emerald-600">
                      {formatPrice(v.totalPaid)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs font-bold ${
                          v.pendingBalance > 0 ? "text-amber-600" : "text-muted-foreground"
                        }`}
                      >
                        {formatPrice(v.pendingBalance)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant={v.pendingBalance > 0 ? "default" : "outline"}
                        className="h-8 text-xs font-semibold rounded-lg"
                        onClick={() => handleOpenCreate(v)}
                      >
                        Disburse Payout
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Section 2: Payout History Ledger */}
      <Card className="border-border bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base">Payout Transactions Ledger</CardTitle>
          <CardDescription>
            Historical record of all platform disbursements and transaction references.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-8">
              <Commonloader />
            </div>
          ) : payouts.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No payout transactions recorded yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Disbursed Amount</TableHead>
                  <TableHead>Bank / UTR Reference</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Recorded</TableHead>
                  <TableHead className="text-right">Status Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell>
                      <p className="font-bold text-sm text-foreground">
                        {p.vendor?.storeName || "Vendor"}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        {p.vendor?.bankDetails?.accountNumberMasked}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm font-bold text-foreground">
                      {formatPrice(p.amount)}
                    </TableCell>
                    <TableCell>
                      <p className="text-xs font-mono text-foreground font-semibold">
                        {p.transactionReference || "Direct Bank Transfer"}
                      </p>
                      {p.note ? (
                        <p className="text-[11px] text-muted-foreground">{p.note}</p>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      {p.status === "paid" ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                          Paid
                        </Badge>
                      ) : p.status === "processing" ? (
                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                          Processing
                        </Badge>
                      ) : (
                        <Badge variant="destructive">{p.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {p.status !== "paid" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-emerald-600 font-bold"
                          onClick={() => void handleUpdateStatus(p._id, "paid")}
                        >
                          Mark Paid
                        </Button>
                      ) : (
                        <span className="text-[11px] text-muted-foreground">Settled</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Record Payout Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Record Vendor Payout
            </DialogTitle>
            <DialogDescription>
              Record an offline bank transfer or UPI transaction settling outstanding vendor balance.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRecordPayout} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Recipient Vendor
              </label>
              <Select
                value={selectedVendorId}
                onValueChange={(val) => {
                  setSelectedVendorId(val);
                  const found = vendorBalances.find((v) => v.vendorId === val);
                  if (found) setPayoutAmount(found.pendingBalance);
                }}
              >
                <SelectTrigger className="h-10 text-xs rounded-xl">
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {vendorBalances.map((v) => (
                    <SelectItem key={v.vendorId} value={v.vendorId}>
                      {v.storeName} (Pending: ₹{v.pendingBalance.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Disbursement Amount (₹)
              </label>
              <Input
                type="number"
                required
                min={1}
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(Number(e.target.value))}
                className="h-10 text-sm font-bold rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Bank UTR / Transaction Reference
              </label>
              <Input
                placeholder="e.g. UTR1234567890 / IMPS Reference"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                className="h-10 text-xs font-mono rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Internal Note (Optional)
              </label>
              <Input
                placeholder="e.g. Weekly settlement for fulfilled electronics orders"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCreateDialogOpen(false)}
                className="rounded-lg text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={actionLoading || payoutAmount <= 0}
                className="rounded-lg text-xs font-bold"
              >
                Confirm Payout
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminPayoutsPage;
