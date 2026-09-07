export type UserRole = "user" | "admin" | "vendor";

export type AppUser = {
  id: string;
  clerkUserId: string;
  email?: string;
  name?: string;
  role: UserRole;
  vendorId?: string;
  vendorStatus?: "pending" | "approved" | "rejected" | "suspended";
  storeSlug?: string;
};

export type ApiErrorItem = {
  message: string;
  code?: string;
};

export type ApiEnvelope<T> = {
  status: "success" | "error";
  data: T | null;
  meta?: Record<string, unknown>;
  errors?: ApiErrorItem[];
};
