import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api";
import type { AdminBannersResponse } from "./types";

export async function getAdminBanners() {
  return apiGet<AdminBannersResponse>("/admin/settings/banners");
}

export async function uploadAdminBanners(formData: FormData) {
  return apiPost<AdminBannersResponse, FormData>(
    "/admin/settings/banners",
    formData,
  );
}

export async function createAdminBannerUrl(data: {
  mediaType: "image" | "video";
  videoUrl?: string;
  imageUrl?: string;
  title?: string;
  tagline?: string;
  link?: string;
}) {
  return apiPost<AdminBannersResponse>("/admin/settings/banners", data);
}

export async function deleteAdminBanner(id: string) {
  return apiDelete<AdminBannersResponse>(`/admin/settings/banners/${id}`);
}

export async function reorderAdminBanners(bannerIds: string[]) {
  return apiPatch<AdminBannersResponse, { bannerIds: string[] }>(
    "/admin/settings/banners/reorder",
    { bannerIds },
  );
}

