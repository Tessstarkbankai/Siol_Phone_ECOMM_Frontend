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
import { AudioShowcaseBanner } from "@/components/home/audio-showcase-banner";
import { SpotlightBanners } from "@/components/home/spotlight-banners";
import { ComingSoonSpotlight } from "@/components/home/coming-soon-spotlight";
import { PortraitVideoStrip } from "@/components/home/portrait-video-strip";
import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { CustomerCareBanner } from "@/components/home/customer-care-banner";
import { CommunityCarousel } from "@/components/home/community-carousel";
import { InteractivePhoneCompare } from "@/components/home/interactive-phone-compare";
import { SiolTeaserBanner } from "@/components/home/siol-teaser-banner";
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
    sizes: (p.sizes as any) || ["256GB"],
    price: p.price,
    salePercentage: p.salePercentage,
    status: "active",
    createdAt: p.createdAt,
    updatedAt: p.createdAt,
  }));

  return (
    <div className="min-h-screen bg-[#ffffff] pb-4 sm:pb-6">
      {/* 1. Rotating Keynote Hero Banner Carousel with Video First Slide */}
      <HeroCarousel banners={data.banners} />

      {/* 2. Hardware Category Strip (Moved Below Hero Section) */}
      <CircularCollectionStrip categories={data.categories} />

      {/* 3. Official Brand Sealed Trust Strip */}
      <TrustStrip />

      {/* 4A. Smartphone Flagship Banner & Live Small Cards Rail */}
      <HeroProductsBanner
        variant="smartphone"
        products={
          data.spotlightSmartphoneProducts && data.spotlightSmartphoneProducts.length > 0
            ? data.spotlightSmartphoneProducts
            : data.spotlightProducts
        }
      />

      {/* 4B. SiOL Buds Pro Audio Spotlight Card */}
      <AudioShowcaseBanner />

      {/* 4C. Feature Phone Classic Banner & Live Small Cards Rail (Duplicated Section) */}
      <HeroProductsBanner
        variant="feature_phone"
        products={data.spotlightFeaturePhoneProducts}
      />

      {/* 5. Interactive Side-by-Side Phone Comparison Matrix (Commented out per request) */}
      {/* <InteractivePhoneCompare /> */}

      {/* 5. SiOL Smartphone Teaser Showcase Banner */}
      <SiolTeaserBanner />

      {/* 6. Trending Flagships & New Arrivals */}
      {mappedProducts.length > 0 ? (
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                  <Flame className="h-3.5 w-3.5" />
                  <span>Flagship Lineup</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl lg:text-4xl mt-1">
                  Trending 5G Flagships & AI Smartphones
                </h2>
              </div>
              <Link
                to="/collections"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition"
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

      {/* 7. Spotlight Feature Banners (AI Camera & Titanium Build) (Commented out per request) */}
      {/* <SpotlightBanners /> */}

      {/* 7. Next-Gen Smartphone Coming Soon Teaser Banner */}
      <ComingSoonSpotlight />

      {/* 8. 4K Video Performance & Camera Tests */}
      <PortraitVideoStrip videos={data.videos} />

      {/* 9. Live Coupons & Exchange Vouchers */}
      {/* {data.coupons.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6">
          <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50/70 via-white to-sky-50/50 border border-blue-100/90 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  <TicketPercent className="h-3.5 w-3.5" />
                  <span>Instant Checkout Savings</span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl mt-2">
                  Exclusive Flagship Discount Codes
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Click any voucher code to copy and apply directly at checkout for instant discounts.
                </p>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Valid on all prepaid & EMI orders across India
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {data.coupons.map((coupon) => (
                <Card
                  key={coupon._id}
                  onClick={() => handleCopyCoupon(coupon.code)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-dashed border-blue-300 bg-white p-5 shadow-xs transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1"
                >
                  <CardContent className="p-0 space-y-4">
                    <div className="flex items-start justify-between">
                      <span className="rounded-md bg-primary text-white text-xs font-bold px-2.5 py-1">
                        {coupon.percentage}% OFF
                      </span>
                      <span className="text-slate-400 group-hover:text-primary transition">
                        <Copy className="h-4 w-4" />
                      </span>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                        Use Code
                      </p>
                      <p className="text-2xl font-bold font-mono tracking-wider text-slate-900 mt-0.5 group-hover:text-primary transition">
                        {coupon.code}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-blue-50 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Min. Order: ₹{coupon.minimumOrderValue}</span>
                      <span className="text-primary font-bold">Copy Code</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null} */}
      {/* 10. OPPO-Style Community Carousel */}
      <CommunityCarousel
        communityImages={data.communityImages}
        banners={data.banners}
      />

      {/* 9. Verified Customer Reviews */}
      <TestimonialsCarousel />



      {/* 11. Proactive Customer Care & Support Section */}
      <CustomerCareBanner />
    </div>
  );
}

export default StoreHome;
