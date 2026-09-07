import { apiGet, apiPost } from "@/lib/api";

export type ProductReviewItem = {
  _id: string;
  product: string;
  user: string;
  userName: string;
  userEmail?: string;
  rating: number;
  title?: string;
  comment: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ProductReviewsResponse = {
  reviews: ProductReviewItem[];
  stats: {
    averageRating: number;
    totalReviews: number;
    breakdown: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
};

export async function getProductReviews(productId: string) {
  return apiGet<ProductReviewsResponse>(
    `/customer/products/${productId}/reviews`,
  );
}

export async function submitProductReview(
  productId: string,
  body: { rating: number; comment: string; title?: string },
) {
  return apiPost<{ message: string; review: ProductReviewItem }, typeof body>(
    `/customer/products/${productId}/reviews`,
    body,
  );
}
