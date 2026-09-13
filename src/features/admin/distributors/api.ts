import { apiGet, apiPatch } from "@/lib/api";
import type {
  DistributorApplicationItem,
  DistributorStatus,
} from "@/features/customer/distributor/api";

export type AdminDistributorsCounts = {
  total: number;
  pending: number;
  approved: number;
  disapproved: number;
  withdrawn?: number;
};

export type AdminDistributorsResponse = {
  applications: DistributorApplicationItem[];
  counts: AdminDistributorsCounts;
};

export async function getAdminDistributors(status?: string, search?: string) {
  const params = new URLSearchParams();
  if (status && status !== "all") params.append("status", status);
  if (search?.trim()) params.append("search", search.trim());
  const query = params.toString() ? `?${params.toString()}` : "";

  return apiGet<AdminDistributorsResponse>(`/admin/distributors${query}`);
}

export async function getAdminDistributorById(id: string) {
  return apiGet<DistributorApplicationItem>(`/admin/distributors/${id}`);
}

export async function updateDistributorStatus(
  id: string,
  status: DistributorStatus,
  adminNotes?: string,
) {
  return apiPatch<
    { message: string; application: DistributorApplicationItem },
    { status: DistributorStatus; adminNotes?: string }
  >(`/admin/distributors/${id}/status`, {
    status,
    adminNotes,
  });
}
