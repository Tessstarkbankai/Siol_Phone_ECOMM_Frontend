import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getCoverImage } from "@/features/customer/products/product-list.shared";
import type { CustomerProduct } from "@/features/customer/products/types";
import { Maximize2, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePosition({ x, y });
  };

  const openLightbox = () => {
    const activeIdx = galleryImages.findIndex((img) => img.url === displayImage);
    setLightboxIndex(activeIdx >= 0 ? activeIdx : 0);
    setLightboxOpen(true);
  };

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Image Container */}
      <Card className="group relative overflow-hidden rounded-2xl border border-border/80 bg-neutral-50/70 dark:bg-neutral-900/60 shadow-sm">
        <div
          ref={imageContainerRef}
          className="relative aspect-square max-h-[460px] sm:max-h-[490px] w-full overflow-hidden cursor-crosshair flex items-center justify-center p-6 sm:p-8 select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePosition({ x: 50, y: 50 });
          }}
        >
          {displayImage ? (
            <img
              src={displayImage}
              alt={product.title}
              style={{
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                transform: isHovered ? "scale(2.35)" : "scale(1)",
                transition: isHovered ? "transform 0.08s ease-out" : "transform 0.25s ease-out",
              }}
              className="h-full w-full object-contain pointer-events-none drop-shadow-sm select-none"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No Image Available
            </div>
          )}

          {/* Sale Percentage Chip */}
          {product.salePercentage > 0 ? (
            <div className="absolute top-3.5 left-3.5 z-10 rounded-lg bg-primary text-white text-[11px] font-black px-2.5 py-1 shadow-sm tracking-wide">
              {product.salePercentage}% OFF
            </div>
          ) : null}

          {/* Lightbox / Expand Fullscreen Trigger */}
          {displayImage ? (
            <button
              type="button"
              onClick={openLightbox}
              title="Expand full screen"
              className="absolute top-3.5 right-3.5 z-10 h-8 w-8 rounded-lg bg-white/90 dark:bg-neutral-800/90 hover:bg-white dark:hover:bg-neutral-800 backdrop-blur-sm shadow-sm border border-border/80 flex items-center justify-center text-neutral-700 dark:text-neutral-200 transition opacity-80 group-hover:opacity-100 cursor-pointer"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          ) : null}

          {/* Useful Hover-to-Zoom Tooltip Hint */}
          <div
            className={`absolute bottom-3 right-3 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900/75 backdrop-blur-md text-[11px] font-medium text-white shadow-sm transition-opacity duration-200 ${
              isHovered ? "opacity-0" : "opacity-90 group-hover:opacity-100"
            }`}
          >
            <ZoomIn className="h-3.5 w-3.5 text-primary" />
            <span>Hover to inspect details</span>
          </div>
        </div>
      </Card>

      {/* Thumbnails Row */}
      {galleryImages.length > 1 ? (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none">
          {galleryImages.map((item, idx) => {
            const isActive = displayImage === item.url;

            return (
              <button
                key={item.publicId || idx}
                type="button"
                onMouseEnter={() => setSelectedImage(item.url)}
                onClick={() => setSelectedImage(item.url)}
                className={`relative aspect-square w-16 sm:w-18 h-16 sm:h-18 shrink-0 overflow-hidden rounded-xl border-2 p-1 bg-white dark:bg-neutral-900 transition-all cursor-pointer ${
                  isActive
                    ? "border-primary ring-2 ring-primary/20 shadow-sm"
                    : "border-border/80 hover:border-primary/50 opacity-75 hover:opacity-100"
                }`}
                title={`View image ${idx + 1}`}
              >
                <img
                  src={item.url}
                  alt={`${product.title} thumbnail ${idx + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Fullscreen Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-4 bg-background/95 backdrop-blur-xl border border-border">
          <DialogTitle className="text-base font-semibold text-foreground flex items-center justify-between pr-8">
            <span className="line-clamp-1">{product.title}</span>
            {galleryImages.length > 1 ? (
              <span className="text-xs text-muted-foreground font-normal">
                {lightboxIndex + 1} / {galleryImages.length}
              </span>
            ) : null}
          </DialogTitle>

          <div className="relative flex items-center justify-center min-h-[350px] max-h-[70vh] p-4 bg-neutral-50/50 dark:bg-neutral-900/50 rounded-xl overflow-hidden my-2">
            {galleryImages.length > 0 ? (
              <img
                src={galleryImages[lightboxIndex]?.url || displayImage}
                alt={product.title}
                className="max-h-[60vh] max-w-full object-contain"
              />
            ) : null}

            {galleryImages.length > 1 ? (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevLightbox}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full h-9 w-9 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm shadow-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextLightbox}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full h-9 w-9 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm shadow-sm"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            ) : null}
          </div>

          {galleryImages.length > 1 ? (
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-14 h-14 rounded-lg border-2 p-1 overflow-hidden transition ${
                    lightboxIndex === idx
                      ? "border-primary ring-1 ring-primary"
                      : "border-border/70 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomerProductDetailsGallery;
