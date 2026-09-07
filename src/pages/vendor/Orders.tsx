import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Truck,
  PackageCheck,
  Clock,
  CheckCircle2,
  MapPin,
  Mail,
  IndianRupee,
  ExternalLink,
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
import { Commonloader } from "@/components/common/Loader";
import { toast } from "sonner";
import {
  getVendorOrders,
  updateVendorSubOrderStatus,
  type VendorSubOrder,
} from "@/features/vendor/api";
import { formatPrice } from "@/lib/utils";

export function VendorOrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<VendorSubOrder[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Status update dialog
  const [selectedSubOrder, setSelectedSubOrder] =
    useState<VendorSubOrder | null>(null);
  const [newStatus, setNewStatus] = useState<string>("confirmed");
  const [carrier, setCarrier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    void loadOrders();
  }, [filterStatus]);

  async function loadOrders() {
    try {
      setLoading(true);
      const statusParam = filterStatus === "all" ? undefined : filterStatus;
      const res = await getVendorOrders(statusParam);
      if (res) {
        setOrders(res);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load vendor orders");
    } finally {
      setLoading(false);
    }
  }

  function handleOpenStatusDialog(order: VendorSubOrder) {
    setSelectedSubOrder(order);
    setNewStatus(order.status || "confirmed");
    setCarrier(order.trackingInfo?.carrier || "Delhivery Express");
    setTrackingNumber(order.trackingInfo?.trackingNumber || "");
    setTrackingUrl(order.trackingInfo?.trackingUrl || "");
  }

  async function handleUpdateStatus(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSubOrder) return;

    try {
      setActionLoading(true);
      const res = await updateVendorSubOrderStatus(selectedSubOrder.subOrderId, {
        status: newStatus,
        carrier: carrier.trim(),
        trackingNumber: trackingNumber.trim(),
        trackingUrl: trackingUrl.trim(),
      });

      toast.success(res.message || "Order fulfillment status updated");
      setSelectedSubOrder(null);
      void loadOrders();
    } catch (err: any) {
      toast.error(err.message || "Failed to update order status");
    } finally {
      setActionLoading(false);
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "delivered":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
            Delivered
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30">
            Shipped
          </Badge>
        );
      case "packed":
        return (
          <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/30">
            Packed
          </Badge>
        );
      case "confirmed":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">
            Confirmed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-neutral-500/10 text-neutral-600 border-neutral-500/30">
            Pending Payment
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          Fulfill Customer Orders
        </h1>
        <p className="text-sm text-muted-foreground">
          View line-items belonging to your store, mark packages as packed, and dispatch with tracking information.
        </p>
      </div>

      {/* Filter Tabs */}
      <Card className="border-border bg-card shadow-xs">
        <div className="p-4 border-b border-border flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: "all", label: "All Orders" },
            { id: "confirmed", label: "Ready to Pack" },
            { id: "packed", label: "Ready to Ship" },
            { id: "shipped", label: "In Transit" },
            { id: "delivered", label: "Delivered" },
          ].map((tab) => (
            <Button
              key={tab.id}
              type="button"
              variant={filterStatus === tab.id ? "default" : "ghost"}
              size="sm"
              className="h-8 text-xs font-semibold rounded-lg shrink-0"
              onClick={() => setFilterStatus(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <CardContent className="p-0">
          {loading ? (
            <div className="py-12">
              <Commonloader />
            </div>
          ) : orders.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No orders found matching this fulfillment stage.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Code</TableHead>
                  <TableHead>Customer / Delivery Address</TableHead>
                  <TableHead>Items & Variants</TableHead>
                  <TableHead>Subtotal / Commission</TableHead>
                  <TableHead>Net Payout</TableHead>
                  <TableHead>Fulfillment Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((o) => (
                  <TableRow key={o.subOrderId}>
                    <TableCell>
                      <p className="font-bold text-sm text-foreground font-mono">
                        #{o.orderCode}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-xs text-foreground">
                        {o.deliveryName}
                      </p>
                      <p className="text-[11px] text-muted-foreground max-w-xs truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 shrink-0 text-primary" />
                        {o.deliveryAddress}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 max-w-xs">
                        {o.items.map((item, idx) => (
                          <div key={idx} className="text-xs text-foreground">
                            <span className="font-bold">{item.quantity}x</span>{" "}
                            {item.title}{" "}
                            {item.size || item.color ? (
                              <span className="text-[10px] text-muted-foreground">
                                ({[item.size, item.color].filter(Boolean).join(", ")})
                              </span>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs font-semibold text-foreground">
                        {formatPrice(o.subtotal)}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Fee ({o.commissionRate}%): -{formatPrice(o.commissionAmount)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-xs text-emerald-600">
                        {formatPrice(o.vendorPayoutAmount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(o.status)}
                      {o.trackingInfo?.trackingNumber ? (
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                          {o.trackingInfo.carrier}: {o.trackingInfo.trackingNumber}
                        </p>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs font-semibold rounded-lg"
                        onClick={() => handleOpenStatusDialog(o)}
                      >
                        Update Stage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Update Fulfillment Status Dialog */}
      {selectedSubOrder ? (
        <Dialog
          open={Boolean(selectedSubOrder)}
          onOpenChange={(open) => !open && setSelectedSubOrder(null)}
        >
          <DialogContent className="max-w-md rounded-2xl p-6">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Update Fulfillment Status
              </DialogTitle>
              <DialogDescription>
                Order #{selectedSubOrder.orderCode} • Deliver to: {selectedSubOrder.deliveryName}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleUpdateStatus} className="space-y-4 py-2">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Fulfillment Status
                </label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="h-10 text-xs rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="packed">Packed / Box Sealed</SelectItem>
                    <SelectItem value="shipped">Shipped (In Transit)</SelectItem>
                    <SelectItem value="delivered">Delivered to Customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newStatus === "shipped" || selectedSubOrder.status === "shipped" ? (
                <div className="space-y-3 p-3.5 bg-secondary/40 rounded-xl border border-border">
                  <p className="text-xs font-bold text-foreground">
                    Shipment Tracking Details
                  </p>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Carrier Name
                    </label>
                    <Input
                      placeholder="e.g. BlueDart, Delhivery, DTDC"
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                      className="h-9 text-xs rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Tracking / AWB Number
                    </label>
                    <Input
                      placeholder="e.g. AWB987654321"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="h-9 text-xs font-mono rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground block mb-1">
                      Tracking URL (Optional)
                    </label>
                    <Input
                      placeholder="https://track.carrier.com/..."
                      value={trackingUrl}
                      onChange={(e) => setTrackingUrl(e.target.value)}
                      className="h-9 text-xs rounded-lg"
                    />
                  </div>
                </div>
              ) : null}

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubOrder(null)}
                  className="rounded-lg text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={actionLoading}
                  className="rounded-lg text-xs font-bold"
                >
                  Save Status
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}

export default VendorOrdersPage;
