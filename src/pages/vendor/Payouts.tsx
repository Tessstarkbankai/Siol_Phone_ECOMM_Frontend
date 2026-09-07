import { useState, useEffect } from "react";
import {
  IndianRupee,
  CheckCircle2,
  Clock,
  Building2,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Commonloader } from "@/components/common/Loader";
import { toast } from "sonner";
import { getVendorPayouts, type VendorPayoutSummary } from "@/features/vendor/api";
import { formatPrice } from "@/lib/utils";

export function VendorPayoutsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<VendorPayoutSummary | null>(null);

  useEffect(() => {
    void loadPayouts();
  }, []);

  async function loadPayouts() {
    try {
      setLoading(true);
      const res = await getVendorPayouts();
      if (res) {
        setData(res);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load payout details");
    } finally {
      setLoading(false);
    }
  }

  if (loading || !data) {
    return (
      <div className="p-8">
        <Commonloader />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <IndianRupee className="h-6 w-6 text-primary" />
          Earnings & Bank Settlements
        </h1>
        <p className="text-sm text-muted-foreground">
          Track revenue generated across all fulfilled orders and historical settlement disbursements.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-5 border-border bg-card">
          <span className="text-xs font-semibold text-muted-foreground uppercase">
            Gross Sales
          </span>
          <p className="text-2xl font-bold text-foreground mt-2">
            {formatPrice(data.totalSales)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Total customer checkout value
          </p>
        </Card>

        <Card className="p-5 border-emerald-500/30 bg-emerald-500/5">
          <span className="text-xs font-semibold text-emerald-700 uppercase">
            Net Earnings
          </span>
          <p className="text-2xl font-bold text-emerald-800 mt-2">
            {formatPrice(data.totalEarnings)}
          </p>
          <p className="text-[11px] text-emerald-600/80 mt-1">
            After marketplace commission
          </p>
        </Card>

        <Card className="p-5 border-border bg-card">
          <span className="text-xs font-semibold text-muted-foreground uppercase">
            Total Disbursed
          </span>
          <p className="text-2xl font-bold text-foreground mt-2">
            {formatPrice(data.totalPaid)}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">
            Settled to your registered bank account
          </p>
        </Card>

        <Card className="p-5 border-amber-500/30 bg-amber-500/5">
          <span className="text-xs font-semibold text-amber-700 uppercase">
            Pending Balance
          </span>
          <p className="text-2xl font-bold text-amber-800 mt-2">
            {formatPrice(data.pendingBalance)}
          </p>
          <p className="text-[11px] text-amber-600/80 mt-1">
            Owed in next settlement cycle
          </p>
        </Card>
      </div>

      {/* Payout History Ledger */}
      <Card className="border-border bg-card shadow-xs">
        <CardHeader>
          <CardTitle className="text-base">Settlement History</CardTitle>
          <CardDescription>
            All past payouts transferred to your account with bank UTR reference numbers.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {data.payouts.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No payouts have been processed yet. Orders will settle as they are fulfilled.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction / UTR Reference</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Date Disbursed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.payouts.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell className="font-bold text-sm text-foreground">
                      {formatPrice(p.amount)}
                    </TableCell>
                    <TableCell>
                      {p.status === "paid" ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                          Settled / Paid
                        </Badge>
                      ) : p.status === "processing" ? (
                        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">
                          Processing
                        </Badge>
                      ) : (
                        <Badge variant="destructive">{p.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-foreground">
                      {p.transactionReference || "Direct Bank Transfer"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-xs truncate">
                      {p.note || "-"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground text-right">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default VendorPayoutsPage;
