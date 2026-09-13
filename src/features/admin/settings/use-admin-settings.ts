import { useEffect, useMemo, useState } from "react";
import type { AdminBanner } from "./types";
import {
  createAdminBannerUrl,
  deleteAdminBanner,
  getAdminBanners,
  reorderAdminBanners,
  uploadAdminBanners,
} from "./api";

export function useAdminSettings() {
  const [items, setItems] = useState<AdminBanner[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [link, setLink] = useState("");
  const [directUrl, setDirectUrl] = useState("");
  const [directMediaType, setDirectMediaType] = useState<"image" | "video">("image");
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refreshBanners() {
    try {
      setLoading(true);
      setError(null);
      const response = await getAdminBanners();
      setItems(response?.items ?? []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load banners";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshBanners();
  }, []);

  async function handleUpload() {
    try {
      setError(null);
      setUploading(true);

      if (uploadMode === "file") {
        if (!files.length) {
          setError("Please select at least one image or video file.");
          return;
        }

        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        if (title.trim()) formData.append("title", title.trim());
        if (tagline.trim()) formData.append("tagline", tagline.trim());
        if (link.trim()) formData.append("link", link.trim());

        const response = await uploadAdminBanners(formData);
        setItems(response?.items ?? []);
        setFiles([]);
        setTitle("");
        setTagline("");
        setLink("");
      } else {
        if (!directUrl.trim()) {
          setError("Please enter a media or YouTube URL.");
          return;
        }

        const response = await createAdminBannerUrl({
          mediaType: directMediaType,
          videoUrl: directMediaType === "video" ? directUrl.trim() : undefined,
          imageUrl: directMediaType === "image" ? directUrl.trim() : undefined,
          title: title.trim() || undefined,
          tagline: tagline.trim() || undefined,
          link: link.trim() || undefined,
        });

        setItems(response?.items ?? []);
        setDirectUrl("");
        setTitle("");
        setTagline("");
        setLink("");
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      setError(msg);
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this banner?")) return;
    try {
      setDeletingId(id);
      setError(null);
      const res = await deleteAdminBanner(id);
      setItems(res?.items ?? items.filter((item) => item._id !== id));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to delete banner";
      setError(msg);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleMove(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);

    // Optimistic update
    setItems(newItems);

    try {
      setReordering(true);
      setError(null);
      const res = await reorderAdminBanners(newItems.map((b) => b._id));
      if (res?.items) {
        setItems(res.items);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to save banner order";
      setError(msg);
      // Revert if failed
      void refreshBanners();
    } finally {
      setReordering(false);
    }
  }

  const fileCountLabel = useMemo(() => {
    if (!files.length) return "No files selected";
    if (files.length === 1) return files[0].name;
    return `${files.length} files selected`;
  }, [files]);

  return {
    items,
    files,
    setFiles,
    title,
    setTitle,
    tagline,
    setTagline,
    link,
    setLink,
    directUrl,
    setDirectUrl,
    directMediaType,
    setDirectMediaType,
    uploadMode,
    setUploadMode,
    fileCountLabel,
    loading,
    setLoading,
    refreshBanners,
    handleUpload,
    uploading,
    handleDelete,
    deletingId,
    handleMove,
    reordering,
    error,
    setError,
  };
}

