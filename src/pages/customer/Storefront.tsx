import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Store,
  ShieldCheck,
  Star,
  Sparkles,
  ShoppingBag,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Commonloader } from "@/components/common/Loader";
import { CustomerProductCard } from "@/components/customer/products/customer-product-card";
import {
  getStorefrontBySlug,
  type PublicStorefrontData,
} from "@/features/customer/storefront/api";

export function StorefrontPage() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [storeData, setStoreData] = useState<PublicStorefrontData | null>(null);

  useEffect(() => {
    if (!slug) return;
    void loadStorefront(slug);
  }, [slug]);

  async function loadStorefront(storeSlug: string) {
    try {
      setLoading(true);
      const res = await getStorefrontBySlug(storeSlug);
      if (res) {
        setStoreData(res);
      }
    } catch {
      setStoreData(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-24">
        <Commonloader />
      </div>
    );
  }

  if (!storeData || !storeData.vendor) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground mb-4">
          <Store className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Store Not Found</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          This seller storefront is either inactive, undergoing administrative verification, or does not exist.
        </p>
        <Link
          to="/collections"
          className="mt-6 inline-flex items-center text-xs font-semibold text-primary hover:underline"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  const { vendor, products } = storeData;

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero Banner Section */}
      <div className="relative border-b border-border/80 bg-white">
        {/* Banner Image */}
        <div className="h-48 sm:h-64 w-full bg-gradient-to-r from-blue-900 via-primary/80 to-blue-950 overflow-hidden relative">
          {vendor.storeBanner?.url ? (
            <img
              src={vendor.storeBanner.url}
              alt={vendor.storeName}
              className="h-full w-full object-cover opacity-90"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center opacity-20">
              <Store className="h-28 w-28 text-white" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Store Header Details */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-16 sm:-mt-20 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/60">
            <div className="flex items-end gap-4 sm:gap-6">
              {/* Store Avatar */}
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-4 border-white bg-white shadow-lg shrink-0 flex items-center justify-center">
                {vendor.storeLogo?.url ? (
                  <img
                    src={vendor.storeLogo.url}
                    alt={vendor.storeName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-primary/10 flex items-center justify-center text-2xl font-black text-primary">
                    {vendor.storeName.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name & Badges */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    {vendor.storeName}
                  </h1>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-xs font-bold gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    Verified Seller
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {vendor.rating > 0 ? vendor.rating.toFixed(1) : "5.0"} Retailer Rating
                  </span>
                  <span>•</span>
                  <span>{products.length} Products Cataloged</span>
                  {vendor.totalSales > 0 ? (
                    <>
                      <span>•</span>
                      <span>Verified Orders Fulfilled</span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Bio Description */}
          {vendor.description ? (
            <div className="py-4 text-xs text-muted-foreground max-w-3xl leading-relaxed">
              {vendor.description}
            </div>
          ) : null}
        </div>
      </div>

      {/* Products Catalog Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-primary" />
              Products by {vendor.storeName}
            </h2>
            <p className="text-xs text-muted-foreground">
              Direct dispatch and official sealed packaging by this seller
            </p>
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {products.length} {products.length === 1 ? "item" : "items"}
          </span>
        </div>

        {products.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted-foreground bg-card rounded-2xl border border-border">
            This seller currently has no active products cataloged.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <CustomerProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StorefrontPage;
