import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from "@/lib/api";
import type { Category } from "@/features/admin/products/types";

export type VendorStatus = "pending" | "approved" | "rejected" | "suspended";

export type VendorMedia = {
  url: string;
  publicId: string;
};

export type VendorProfile = {
  _id: string;
  storeName: string;
  storeSlug: string;
  storeLogo?: VendorMedia;
  storeBanner?: VendorMedia;
  description?: string;
  businessEmail?: string;
  businessPhone?: string;
  gstNumber?: string;
  status: VendorStatus;
  rejectionReason?: string;
  commissionRate: number;
  rating: number;
  totalSales: number;
  isFeatured: boolean;
  createdAt: string;
};

export type VendorApplicationStatus = {
  hasApplied: boolean;
  vendorId?: string;
  status?: VendorStatus | null;
  storeName?: string;
  storeSlug?: string;
  rejectionReason?: string;
  commissionRate?: number;
  role: string;
};

export type VendorDashboardStats = {
  totalSales: number;
  totalEarnings: number;
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockCount: number;
  pendingProductsCount: number;
  totalPaidPayouts: number;
  pendingPayoutBalance: number;
  commissionRate: number;
};

export type VendorSubOrder = {
  orderId: string;
  subOrderId: string;
  orderCode: string;
  deliveryName: string;
  deliveryAddress: string;
  customerEmail: string;
  paymentStatus: string;
  createdAt: string;
  items: Array<{
    product: string;
    title: string;
    quantity: number;
    price: number;
    color?: string;
    size?: string;
  }>;
  subtotal: number;
  commissionRate: number;
  commissionAmount: number;
  vendorPayoutAmount: number;
  status: string;
  trackingInfo?: {
    carrier?: string;
    trackingNumber?: string;
    trackingUrl?: string;
  };
  shippedAt?: string | null;
  deliveredAt?: string | null;
};

export type VendorPayout = {
  _id: string;
  amount: number;
  status: "pending" | "processing" | "paid" | "failed";
  paidAt?: string | null;
  transactionReference?: string;
  note?: string;
  createdAt: string;
};

export type VendorPayoutSummary = {
  totalSales: number;
  totalEarnings: number;
  totalPaid: number;
  pendingBalance: number;
  payouts: VendorPayout[];
};

// Vendor onboarding status & application
export async function getVendorStatus() {
  return apiGet<VendorApplicationStatus>("/customer/vendor/status");
}

export async function submitVendorApplication(formData: FormData) {
  return apiPost<{ message: string; vendor: any }, FormData>(
    "/customer/vendor/apply",
    formData,
  );
}

// Vendor dashboard stats
export async function getVendorDashboardStats() {
  return apiGet<VendorDashboardStats>("/vendor/dashboard/stats");
}

// Vendor products
export async function getVendorProducts(search?: string, approvalStatus?: string) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (approvalStatus) params.append("approvalStatus", approvalStatus);
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiGet<any[]>(`/vendor/products${query}`);
}

export async function getVendorProductById(id: string) {
  return apiGet<any>(`/vendor/products/${id}`);
}

export async function createVendorProduct(formData: FormData) {
  return apiPost<any, FormData>("/vendor/products", formData);
}

export async function updateVendorProduct(id: string, formData: FormData) {
  return apiPut<any, FormData>(`/vendor/products/${id}`, formData);
}

export async function deleteVendorProduct(id: string) {
  return apiDelete<{ message: string; id: string }>(`/vendor/products/${id}`);
}

// Vendor orders
export async function getVendorOrders(status?: string) {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return apiGet<VendorSubOrder[]>(`/vendor/orders${query}`);
}

export async function updateVendorSubOrderStatus(
  subOrderId: string,
  body: {
    status: string;
    carrier?: string;
    trackingNumber?: string;
    trackingUrl?: string;
  },
) {
  return apiPatch<{ message: string; subOrder: any }>(
    `/vendor/orders/${subOrderId}/status`,
    body,
  );
}

// Vendor payouts
export async function getVendorPayouts() {
  return apiGet<VendorPayoutSummary>("/vendor/payouts");
}

// Vendor profile
export async function getVendorProfile() {
  return apiGet<VendorProfile>("/vendor/profile");
}

export async function updateVendorProfile(formData: FormData) {
  return apiPut<{ message: string; vendor: VendorProfile }, FormData>(
    "/vendor/profile",
    formData,
  );
}

// Vendor categories & brands
export async function getVendorCategories() {
  return apiGet<Category[]>("/vendor/categories");
}

export async function createVendorCategory(name: string) {
  return apiPost<Category, { name: string }>("/vendor/categories", { name });
}

export async function getVendorBrands() {
  return apiGet<string[]>("/vendor/brands");
}
