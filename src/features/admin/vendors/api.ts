import { apiGet, apiPatch, apiPost } from "@/lib/api";

export type AdminVendorItem = {
  _id: string;
  storeName: string;
  storeSlug: string;
  storeLogo?: { url: string; publicId: string };
  storeBanner?: { url: string; publicId: string };
  description?: string;
  businessEmail: string;
  businessPhone: string;
  gstNumber?: string;
  bankDetails?: {
    accountHolderName: string;
    accountNumberMasked: string;
    ifsc: string;
    upiId?: string;
  };
  status: "pending" | "approved" | "rejected" | "suspended";
  rejectionReason?: string;
  commissionRate: number;
  rating: number;
  totalSales: number;
  isFeatured: boolean;
  createdAt: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
};

export type AdminVendorsResponse = {
  vendors: AdminVendorItem[];
  counts: {
    total: number;
    pending: number;
    approved: number;
    suspended: number;
  };
};

export type AdminModerationProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  salePercentage: number;
  stock: number;
  images: Array<{ url: string; publicId: string; isCover: boolean }>;
  colors: string[];
  sizes: string[];
  status: "active" | "inactive";
  approvalStatus: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  category?: { _id: string; name: string };
  vendor?: {
    _id: string;
    storeName: string;
    storeSlug: string;
    rating: number;
    businessEmail: string;
  };
  createdAt: string;
};

export type AdminModerationResponse = {
  products: AdminModerationProduct[];
  counts: {
    pending: number;
    approved: number;
    rejected: number;
  };
};

export type AdminVendorBalance = {
  vendorId: string;
  storeName: string;
  storeSlug: string;
  status: string;
  bankDetails?: {
    accountHolderName: string;
    accountNumberMasked: string;
    ifsc: string;
    upiId?: string;
  };
  totalEarned: number;
  totalPaid: number;
  pendingBalance: number;
};

export type AdminPayoutRecord = {
  _id: string;
  vendor: {
    _id: string;
    storeName: string;
    storeSlug: string;
    bankDetails?: {
      accountHolderName: string;
      accountNumberMasked: string;
      ifsc: string;
      upiId?: string;
    };
    commissionRate: number;
  };
  amount: number;
  status: "pending" | "processing" | "paid" | "failed";
  paidAt?: string | null;
  transactionReference?: string;
  note?: string;
  createdAt: string;
};

export type AdminPayoutsResponse = {
  payouts: AdminPayoutRecord[];
  vendorBalances: AdminVendorBalance[];
};

// Admin Vendor APIs
export async function getAdminVendors(status?: string, search?: string) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (search) params.append("search", search);
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiGet<AdminVendorsResponse>(`/admin/vendors${query}`);
}

export async function getAdminVendorById(id: string, revealBank?: boolean) {
  const query = revealBank ? "?revealBank=true" : "";
  return apiGet<{
    vendor: AdminVendorItem;
    productCount: number;
    pendingProductCount: number;
    decryptedAccountNumber?: string;
  }>(`/admin/vendors/${id}${query}`);
}

export async function updateAdminVendorStatus(
  id: string,
  status: string,
  rejectionReason?: string,
) {
  return apiPatch<{ message: string; vendor: AdminVendorItem }>(
    `/admin/vendors/${id}/status`,
    { status, rejectionReason },
  );
}

export async function updateAdminVendorCommission(
  id: string,
  commissionRate: number,
) {
  return apiPatch<{ message: string; vendor: AdminVendorItem }>(
    `/admin/vendors/${id}/commission`,
    { commissionRate },
  );
}

// Admin Moderation APIs
export async function getAdminProductModeration(
  status?: string,
  search?: string,
) {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (search) params.append("search", search);
  const query = params.toString() ? `?${params.toString()}` : "";
  return apiGet<AdminModerationResponse>(`/admin/products/moderation${query}`);
}

export async function moderateAdminProduct(
  id: string,
  approvalStatus: "approved" | "rejected",
  rejectionReason?: string,
) {
  return apiPatch<{ message: string; product: AdminModerationProduct }>(
    `/admin/products/${id}/moderation`,
    { approvalStatus, rejectionReason },
  );
}

// Admin Payouts APIs
export async function getAdminPayouts() {
  return apiGet<AdminPayoutsResponse>("/admin/payouts");
}

export async function createAdminPayout(body: {
  vendorId: string;
  amount: number;
  transactionReference?: string;
  note?: string;
  status?: string;
}) {
  return apiPost<{ message: string; payout: AdminPayoutRecord }, typeof body>(
    "/admin/payouts/create",
    body,
  );
}

export async function updateAdminPayoutStatus(
  id: string,
  body: {
    status: string;
    transactionReference?: string;
    note?: string;
  },
) {
  return apiPatch<{ message: string; payout: AdminPayoutRecord }, typeof body>(
    `/admin/payouts/${id}/status`,
    body,
  );
}
