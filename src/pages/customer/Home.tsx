import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Copy,
  Flame,
  Sparkles,
  TicketPercent,
} from "lucide-react";
import { toast } from "sonner";
import { Commonloader } from "@/components/common/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCustomerHomeStore } from "@/features/customer/home/store";
import { CircularCollectionStrip } from "@/components/home/circular-collection-strip";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { TrustStrip } from "@/components/home/trust-strip";
import { HeroProductsBanner } from "@/components/home/hero-products-banner";
import { SpotlightBanners } from "@/components/home/spotlight-banners";
import { PortraitVideoStrip } from "@/components/home/portrait-video-strip";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { StoreLocator } from "@/components/home/store-locator";
import { CustomerProductCard } from "@/components/customer/products/customer-product-card";
import type { CustomerProduct } from "@/features/customer/products/types";

export function StoreHome() {
  const { data, loading, loadHome } = useCustomerHomeStore((state) => state);

  useEffect(() => {
    void loadHome();
  }, [loadHome]);

  if (loading) {
    return <Commonloader text="Loading your store..." />;
  }

  function handleCopyCoupon(code: string) {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon "${code}" copied to clipboard! Apply at checkout.`);
  }

  // Map recent products to CustomerProduct shape for CustomerProductCard
  const mappedProducts: CustomerProduct[] = data.recentProducts.map((p) => ({
    _id: p._id,
    title: p.title,
    description: p.description || "",
    category: { _id: "cat", name: p.brand },
    brand: p.brand,
    stock: p.stock ?? 20,
    images: [{ url: p.image, publicId: "img", isCover: true }],
    colors: p.colors || [],
    sizes: (p.sizes as any) || ["M"],
    price: p.price,
    salePercentage: p.salePercentage,
    status: "active",
    createdAt: p.createdAt,
    updatedAt: p.createdAt,
  }));

  return (
    <div className="min-h-screen bg-[#ffffff] pb-4 sm:pb-6">
      {/* 1. Round Appliance Collection Strip (Below Navbar, Above Hero Banner) */}
      <CircularCollectionStrip categories={data.categories} />

      {/* 2. Rotating Hero Banner Carousel */}
      <HeroCarousel banners={data.banners} />

      {/* 3. Trust Credibility Strip */}
      <TrustStrip />

      {/* 4. Magic Series Hero Products Banner & Small Cards from DB */}
      <HeroProductsBanner products={data.spotlightProducts} />

      {/* 5. Best Sellers & Trending Appliances */}
      {mappedProducts.length > 0 ? (
        <section className="py-4">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  <Flame className="h-3.5 w-3.5" />
                  <span>Chef's Choice</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl mt-1">
                  Trending & Best Selling Appliances
                </h2>
              </div>
              <Link
                to="/collections"
                className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:text-primary/80 transition"
              >
                <span>View Full Catalogue</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
              {mappedProducts.slice(0, 4).map((product) => (
                <CustomerProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 6. Spotlight Feature Banners */}
      <SpotlightBanners />

      {/* 7. Portrait Community Video Reels ("See What Everyone's Talking About") */}
      <PortraitVideoStrip videos={data.videos} />

      {/* 8. Live Coupons & Promo Offers (Clean Light Theme) */}
      {data.coupons.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  <TicketPercent className="h-3.5 w-3.5" />
                  <span>Instant Savings</span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl mt-2">
                  Exclusive Festive Discount Coupons
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  Click any coupon to copy and apply directly at checkout for instant discount.
                </p>
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                Valid on all prepaid orders across India
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.coupons.map((coupon) => (
                <Card
                  key={coupon._id}
                  onClick={() => handleCopyCoupon(coupon.code)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-white p-5 shadow-xs transition-all duration-300 hover:border-primary hover:shadow-md hover:-translate-y-1"
                >
                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="rounded-md bg-primary text-white text-xs font-black px-2.5 py-1">
                        {coupon.percentage}% OFF
                      </span>
                      <span className="text-neutral-400 group-hover:text-primary transition">
                        <Copy className="h-4 w-4" />
                      </span>
                    </div>

                    <div>
                      <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
                        Use Code
                      </p>
                      <p className="text-2xl font-black tracking-widest text-neutral-900 mt-0.5 group-hover:text-primary transition">
                        {coupon.code}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                      <span>Min. Order: ₹{coupon.minimumOrderValue}</span>
                      <span className="text-primary font-bold">Copy Code</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 9. Verified Customer Reviews */}
      <TestimonialsCarousel />

      {/* 10. Flagship Experience Store Locator with 3D Globe */}
      <StoreLocator />
    </div>
  );
}

export default StoreHome;
