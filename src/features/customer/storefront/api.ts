import { apiGet } from "@/lib/api";
import type { CustomerProduct } from "@/features/customer/products/types";

export type PublicStorefrontData = {
  vendor: {
    _id: string;
    storeName: string;
    storeSlug: string;
    storeLogo?: { url: string; publicId: string };
    storeBanner?: { url: string; publicId: string };
    description?: string;
    rating: number;
    totalSales: number;
    isFeatured: boolean;
  };
  products: CustomerProduct[];
};

export async function getStorefrontBySlug(slug: string) {
  return apiGet<PublicStorefrontData>(`/customer/store/${slug}`);
}
