import { useState } from "react";
import { Card } from "@/components/ui/card";
import { getCoverImage } from "@/features/customer/products/product-list.shared";
import type { CustomerProduct } from "@/features/customer/products/types";

type CustomerProductDetailsGalleryProps = {
  product: CustomerProduct;
  selectedImage: string;
  setSelectedImage: (value: string) => void;
};

export function CustomerProductDetailsGallery({
  product,
  selectedImage,
  setSelectedImage,
}: CustomerProductDetailsGalleryProps) {
  const galleryImages = product.images || [];
  const displayImage = selectedImage || getCoverImage(product);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <Card className="group relative overflow-hidden rounded-2xl border border-border/80 bg-neutral-100 shadow-sm">
        <div
          className="relative aspect-[4/5] w-full overflow-hidden cursor-crosshair flex items-center justify-center"
          onMouseEnter={() => setZoomed(true)}
          onMouseLeave={() => setZoomed(false)}
        >
          {displayImage ? (
            <img
              src={displayImage}
              alt={product.title}
              className={`h-full w-full object-cover object-center transition-transform duration-500 ease-out ${
                zoomed ? "scale-125" : "scale-100"
              }`}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No Image Available
            </div>
          )}

          {product.salePercentage > 0 ? (
            <div className="absolute top-4 left-4 rounded-md bg-primary text-white text-xs font-black px-2.5 py-1 shadow-md">
              {product.salePercentage}% OFF
            </div>
          ) : null}
        </div>
      </Card>

      {/* Thumbnails Row */}
      {galleryImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {galleryImages.map((item, idx) => {
            const isActive = displayImage === item.url;

            return (
              <button
                key={item.publicId || idx}
                type="button"
                className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                  isActive
                    ? "border-primary ring-2 ring-primary/20 scale-105"
                    : "border-border/80 hover:border-primary/50 opacity-75 hover:opacity-100"
                }`}
                onClick={() => setSelectedImage(item.url)}
              >
                <img
                  src={item.url}
                  alt={`${product.title} thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default CustomerProductDetailsGallery;
