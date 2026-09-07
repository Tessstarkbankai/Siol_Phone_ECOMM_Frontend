import { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Edit2,
  Trash2,
  SlidersHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  getVendorProducts,
  deleteVendorProduct,
  getVendorCategories,
} from "@/features/vendor/api";
import type { Category, Product } from "@/features/admin/products/types";
import { VendorProductDialog } from "@/components/vendor/products/vendor-product-dialog";
import { formatPrice } from "@/lib/utils";

export function VendorProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [filterApproval, setFilterApproval] = useState<string>("all");

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    void loadData();
  }, [filterApproval]);

  async function loadData() {
    try {
      setLoading(true);
      const approvalParam = filterApproval === "all" ? undefined : filterApproval;
      const [prodsRes, catsRes] = await Promise.all([
        getVendorProducts(search, approvalParam),
        getVendorCategories(),
      ]);

      if (prodsRes) setProducts(prodsRes);
      if (catsRes) setCategories(catsRes);
    } catch (err: any) {
      toast.error(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    void loadData();
  }

  function handleAddProduct() {
    setEditingProduct(null);
    setDialogOpen(true);
  }

  function handleEditProduct(product: any) {
    setEditingProduct(product);
    setDialogOpen(true);
  }

  async function handleDeleteProduct(id: string) {
    if (!window.confirm("Are you sure you want to delete this product listing?")) {
      return;
    }

    try {
      await deleteVendorProduct(id);
      toast.success("Product deleted");
      void loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete product");
    }
  }

  function getApprovalBadge(status: string, reason?: string) {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending Review
          </Badge>
        );
      case "rejected":
        return (
          <div className="flex flex-col items-start gap-1">
            <Badge className="bg-destructive/10 text-destructive border-destructive/30">
              <XCircle className="h-3 w-3 mr-1" />
              Rejected
            </Badge>
            {reason ? (
              <span className="text-[10px] text-destructive max-w-[180px] leading-tight">
                {reason}
              </span>
            ) : null}
          </div>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            My Product Inventory
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your store catalog. Listings require administrative approval before going public.
          </p>
        </div>
        <Button onClick={handleAddProduct} className="rounded-xl text-xs font-bold shadow-xs">
          <Plus className="h-4 w-4 mr-1.5" />
          Add New Product
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border-border bg-card shadow-xs">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {[
              { id: "all", label: "All Items" },
              { id: "approved", label: "Live / Approved" },
              { id: "pending", label: "Pending Review" },
              { id: "rejected", label: "Needs Revision" },
            ].map((tab) => (
              <Button
                key={tab.id}
                type="button"
                variant={filterApproval === tab.id ? "default" : "ghost"}
                size="sm"
                className="h-8 text-xs font-semibold rounded-lg"
                onClick={() => setFilterApproval(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search my products..."
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
              No products found. Click "Add New Product" to submit your first catalog item.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Catalog Status</TableHead>
                  <TableHead>Moderation Gate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => {
                  const coverImage =
                    p.images?.find((img: any) => img.isCover)?.url ||
                    p.images?.[0]?.url;

                  return (
                    <TableRow key={p._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {coverImage ? (
                            <img
                              src={coverImage}
                              alt={p.title}
                              className="h-10 w-10 rounded-lg object-cover border border-border shrink-0"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                              <Package className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          <span className="font-bold text-sm text-foreground max-w-xs truncate">
                            {p.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {p.category?.name || "General"}
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-xs text-foreground">
                          {formatPrice(p.price)}
                        </span>
                        {p.salePercentage > 0 ? (
                          <span className="text-[10px] text-emerald-600 block">
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
                          {p.stock} in stock
                        </span>
                      </TableCell>
                      <TableCell>
                        {p.status === "active" ? (
                          <Badge variant="outline" className="text-xs">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">
                            Draft
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {getApprovalBadge(p.approvalStatus, p.rejectionReason)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditProduct(p)}
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => void handleDeleteProduct(p._id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
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

      {/* Vendor Product Create / Edit Dialog */}
      <VendorProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        categories={categories}
        product={editingProduct}
        onCategoryAdded={(newCat) => {
          setCategories((prev) => {
            if (prev.some((c) => c._id === newCat._id)) return prev;
            return [...prev, newCat].sort((a, b) => a.name.localeCompare(b.name));
          });
        }}
        onSaved={async () => {
          await loadData();
        }}
      />
    </div>
  );
}

export default VendorProductsPage;
