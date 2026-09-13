import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Commonloader } from "@/components/common/Loader";
import CustomerProductDetailsGallery from "@/components/customer/products/details/customer-product-details-gallery";
import CustomerProductDetailsSummary from "@/components/customer/products/details/customer-product-details-summary";
import CustomerProductCard from "@/components/customer/products/customer-product-card";
import CustomerShowcaseBanners from "@/components/customer/products/details/customer-showcase-banners";
import CustomerReviews from "@/components/customer/products/details/customer-reviews";
import { useAuthStore } from "@/features/auth/store";
import { useCustomerProductDetailsStore } from "@/features/customer/products/details/store";
import { useCustomerWishlistStore } from "@/features/customer/wishlist/store";
import { formatPrice } from "@/lib/utils";
import { extractSalePrice } from "@/features/customer/products/product-list.shared";

export function CollectionDetails() {
  const { id = "" } = useParams();
  const { isLoaded, isSignedIn } = useAuth();
  const { isBootstrapped } = useAuthStore();

  const {
    loadProduct,
    clear,
    data,
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    toggleWishlist,
    addToCart,
  } = useCustomerProductDetailsStore((state) => state);

  const wishlistItems = useCustomerWishlistStore((state) => state.items);

  const product = data?.product ?? null;
  const relatedProducts = data?.relatedProducts ?? [];
  const isWishlistActive = !!product
    ? wishlistItems.some((item) => item.productId === product._id)
    : false;

  useEffect(() => {
    void loadProduct(id);
    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      clear();
    };
  }, [clear, id, loadProduct]);

  if (!product) return <Commonloader text="Loading product details..." />;

  const salePrice = extractSalePrice(product);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Breadcrumb Header Bar */}
      <section className="border-b border-border/80 bg-white py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
              <span>/</span>
              <Link to="/collections" className="hover:text-primary transition">
                Collections
              </Link>
              <span>/</span>
              <span className="text-foreground font-semibold line-clamp-1 max-w-[200px] sm:max-w-none">
                {product.title}
              </span>
            </nav>

            <Button asChild variant="ghost" size="sm" className="text-xs font-bold text-muted-foreground hover:text-foreground">
              <Link to="/collections" className="inline-flex items-center gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to All
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main PDP 2-Column Grid */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24">
            <CustomerProductDetailsGallery
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>

          <div className="lg:col-span-7 xl:col-span-7">
            <CustomerProductDetailsSummary
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              setSelectedColor={setSelectedColor}
              setSelectedSize={setSelectedSize}
              toggleWishlist={() =>
                toggleWishlist(
                  isLoaded,
                  isBootstrapped,
                  Boolean(isSignedIn),
                  isWishlistActive,
                )
              }
              isWishlistActive={isWishlistActive}
              onAddToCart={() =>
                addToCart(isLoaded, isBootstrapped, Boolean(isSignedIn))
              }
            />
          </div>
        </div>

        {/* Product Showcase Banners (wide banner format below product card, above review card) */}
        <CustomerShowcaseBanners
          banners={product.showcaseBanners}
          fallbackImages={product.images}
          productTitle={product.title}
        />

        {/* Flipkart-Style Customer Ratings & Reviews */}
        <CustomerReviews
          productId={product._id}
          productTitle={product.title}
        />

        {/* Related / You May Also Like Section */}
        {relatedProducts.length > 0 ? (
          <section className="mt-20 border-t border-border/80 pt-12 space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Curated Picks</span>
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl mt-1">
                  You May Also Like
                </h2>
              </div>
              <Link
                to="/collections"
                className="text-xs font-semibold text-primary hover:text-primary/80 transition"
              >
                Browse All Collection →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((item) => (
                <CustomerProductCard key={item._id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      {/* Sticky Mobile "Add to Cart" Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0e] text-white p-3 border-t border-white/10 shadow-2xl flex items-center justify-between sm:hidden">
        <div>
          <p className="text-xs text-neutral-400 font-medium">Total Price</p>
          <p className="text-base font-bold text-white">{formatPrice(salePrice)}</p>
        </div>
        <Button
          onClick={() => addToCart(isLoaded, isBootstrapped, Boolean(isSignedIn))}
          disabled={product.stock < 1}
          className="bg-primary hover:bg-primary/90 text-white font-semibold h-10 px-5 rounded-lg gap-2"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
}

export default CollectionDetails;
