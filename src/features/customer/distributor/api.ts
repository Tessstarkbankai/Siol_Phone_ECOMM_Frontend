import { apiGet, apiPatch, apiPost } from "@/lib/api";

export type DistributorStatus = "pending" | "approved" | "disapproved" | "withdrawn";

export type DistributorApplicationItem = {
  _id: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  } | null;
  companyName: string;
  entityType: string;
  yearsInBusiness: number;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  gstNumber: string;
  panNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  operatingTerritory: string[];
  warehouseArea: string;
  logisticsFleet?: string;
  annualTurnover: string;
  expectedMonthlyVolume: string;
  preferredCategories: string[];
  proposalNote?: string;
  status: DistributorStatus;
  attemptNumber?: number;
  withdrawnAt?: string | null;
  adminNotes?: string;
  reviewedBy?: {
    _id: string;
    name: string;
    email: string;
  } | null;
  reviewedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DistributorApplyPayload = {
  companyName: string;
  entityType: string;
  yearsInBusiness: number;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  gstNumber: string;
  panNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  operatingTerritory: string[];
  warehouseArea: string;
  logisticsFleet?: string;
  annualTurnover: string;
  expectedMonthlyVolume: string;
  preferredCategories: string[];
  proposalNote?: string;
};

export type MyDistributorApplicationResponse = {
  application: DistributorApplicationItem | null;
  rejectionCount: number;
  remainingAttempts: number;
  canReapply: boolean;
  canWithdraw: boolean;
};

export async function submitDistributorApplication(
  payload: DistributorApplyPayload,
) {
  return apiPost<
    { message: string; application: DistributorApplicationItem },
    DistributorApplyPayload
  >("/customer/distributor/apply", payload);
}

export async function getMyDistributorApplication() {
  return apiGet<MyDistributorApplicationResponse>(
    "/customer/distributor/my-application",
  );
}

export async function withdrawDistributorApplication() {
  return apiPatch<
    { message: string; application: DistributorApplicationItem },
    Record<string, never>
  >("/customer/distributor/withdraw", {});
}
