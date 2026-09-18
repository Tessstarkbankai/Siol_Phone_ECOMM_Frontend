import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api";
import type { AdminBannersResponse, AdminCommunityResponse } from "./types";

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

export async function getAdminCommunityImages() {
  return apiGet<AdminCommunityResponse>("/admin/settings/community");
}

export async function uploadAdminCommunityImages(formData: FormData) {
  return apiPost<AdminCommunityResponse, FormData>(
    "/admin/settings/community",
    formData,
  );
}

export async function createAdminCommunityImageUrl(data: {
  imageUrl: string;
  title?: string;
  hashtag?: string;
  link?: string;
}) {
  return apiPost<AdminCommunityResponse>("/admin/settings/community", data);
}

export async function deleteAdminCommunityImage(id: string) {
  return apiDelete<AdminCommunityResponse>(`/admin/settings/community/${id}`);
}

export async function reorderAdminCommunityImages(imageIds: string[]) {
  return apiPatch<AdminCommunityResponse, { imageIds: string[] }>(
    "/admin/settings/community/reorder",
    { imageIds },
  );
}

