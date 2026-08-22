import { apiDelete, apiGet, apiPost } from "@/lib/api";
import type { AdminVideo, CreateVideoBody } from "./types";

export async function getAdminVideos() {
  return apiGet<AdminVideo[]>("/admin/videos");
}

export async function createAdminVideo(body: CreateVideoBody, file?: File) {
  const formData = new FormData();
  formData.append("title", body.title);
  if (body.caption) formData.append("caption", body.caption);
  if (body.productLink) formData.append("productLink", body.productLink);
  if (body.videoUrl) formData.append("videoUrl", body.videoUrl);
  if (file) formData.append("video", file);

  return apiPost<AdminVideo, FormData>("/admin/videos", formData);
}

export async function deleteAdminVideo(id: string) {
  return apiDelete<{ message: string }>(`/admin/videos/${id}`);
}
