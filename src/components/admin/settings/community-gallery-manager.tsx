import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDown,
  ArrowUp,
  ImagePlus,
  Link as LinkIcon,
  Loader2,
  RefreshCw,
  Trash2,
  UploadCloud,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  getAdminCommunityImages,
  uploadAdminCommunityImages,
  createAdminCommunityImageUrl,
  deleteAdminCommunityImage,
  reorderAdminCommunityImages,
} from "@/features/admin/settings/api";
import type { AdminCommunityImage } from "@/features/admin/settings/types";

export function CommunityGalleryManager() {
  const [items, setItems] = useState<AdminCommunityImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);

  // Form states
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");
  const [files, setFiles] = useState<FileList | null>(null);
  const [directUrl, setDirectUrl] = useState("");
  const [title, setTitle] = useState("");
  const [hashtag, setHashtag] = useState("#SiOLCommunity");
  const [link, setLink] = useState("");

  const loadImages = async () => {
    try {
      setLoading(true);
      const res = await getAdminCommunityImages();
      setItems(res?.items || []);
    } catch {
      toast.error("Failed to load community images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadImages();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadMode === "file") {
      if (!files || files.length === 0) {
        toast.error("Please select at least one image file to upload");
        return;
      }

      try {
        setUploading(true);
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("files", file);
        });
        formData.append("title", title);
        formData.append("hashtag", hashtag || "#SiOLCommunity");
        formData.append("link", link);

        const res = await uploadAdminCommunityImages(formData);
        setItems(res?.items || []);
        toast.success("Community images uploaded successfully!");

        // Reset form
        setFiles(null);
        setTitle("");
        setHashtag("#SiOLCommunity");
        setLink("");
      } catch (err: any) {
        toast.error(err?.message || "Failed to upload community images");
      } finally {
        setUploading(false);
      }
    } else {
      if (!directUrl.trim()) {
        toast.error("Please enter a valid image URL");
        return;
      }

      try {
        setUploading(true);
        const res = await createAdminCommunityImageUrl({
          imageUrl: directUrl.trim(),
          title: title.trim(),
          hashtag: hashtag.trim() || "#SiOLCommunity",
          link: link.trim(),
        });
        setItems(res?.items || []);
        toast.success("Community image added successfully!");

        // Reset form
        setDirectUrl("");
        setTitle("");
        setHashtag("#SiOLCommunity");
        setLink("");
      } catch (err: any) {
        toast.error(err?.message || "Failed to add community image");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this community image?")) return;

    try {
      setDeletingId(id);
      const res = await deleteAdminCommunityImage(id);
      setItems(res?.items || []);
      toast.success("Community image removed");
    } catch {
      toast.error("Failed to delete community image");
    } finally {
      setDeletingId(null);
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);

    setItems(newItems);

    try {
      setReordering(true);
      const ids = newItems.map((it) => it._id);
      const res = await reorderAdminCommunityImages(ids);
      if (res?.items) setItems(res.items);
    } catch {
      toast.error("Failed to update order");
      void loadImages();
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>OPPO-Style Community Carousel Gallery</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage photography cards displayed in the horizontal moving community showcase.
            By default, the carousel falls back to hero banners and curated flagship photos.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={loadImages}
          disabled={loading}
          className="self-start sm:self-auto gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[400px_minmax(0,1fr)]">
        {/* Upload / Add Form Card */}
        <Card className="border-border/60 bg-card/80 shadow-xs h-fit">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Add Community Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              {/* Mode Toggle */}
              <div className="flex rounded-lg border border-border p-1 bg-muted/40 text-xs">
                <button
                  type="button"
                  onClick={() => setUploadMode("file")}
                  className={`flex-1 py-1.5 rounded-md font-medium transition flex items-center justify-center gap-1.5 ${
                    uploadMode === "file"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <UploadCloud className="h-3.5 w-3.5" />
                  <span>Upload File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode("url")}
                  className={`flex-1 py-1.5 rounded-md font-medium transition flex items-center justify-center gap-1.5 ${
                    uploadMode === "url"
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                  <span>Direct URL</span>
                </button>
              </div>

              {uploadMode === "file" ? (
                <div className="space-y-2">
                  <Label htmlFor="community-file" className="text-xs">
                    Choose Image(s)
                  </Label>
                  <Input
                    id="community-file"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    className="cursor-pointer text-xs file:mr-2 file:text-xs"
                  />
                  {files && files.length > 0 && (
                    <p className="text-[11px] text-muted-foreground">
                      {files.length} file(s) selected
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="community-url" className="text-xs">
                    Image URL
                  </Label>
                  <Input
                    id="community-url"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={directUrl}
                    onChange={(e) => setDirectUrl(e.target.value)}
                    className="text-xs"
                  />
                </div>
              )}

              {/* Title & Hashtag */}
              <div className="space-y-2">
                <Label htmlFor="community-title" className="text-xs">
                  Card Title
                </Label>
                <Input
                  id="community-title"
                  placeholder="e.g. Quick reply speech to text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="community-hashtag" className="text-xs">
                  Hashtag / Subtitle
                </Label>
                <Input
                  id="community-hashtag"
                  placeholder="e.g. #SiOLCommunity or #ShotOnSiOL"
                  value={hashtag}
                  onChange={(e) => setHashtag(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="community-link" className="text-xs">
                  Target Link (Optional)
                </Label>
                <Input
                  id="community-link"
                  placeholder="e.g. /products or article link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="text-xs"
                />
              </div>

              <Button
                type="submit"
                disabled={uploading}
                className="w-full gap-2 text-xs font-semibold"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Adding to Community...</span>
                  </>
                ) : (
                  <>
                    <ImagePlus className="h-4 w-4" />
                    <span>Add to Showcase</span>
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Community Images List Table */}
        <Card className="border-border/60 bg-card/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">
              Active Community Cards ({items.length})
            </CardTitle>
            {reordering && (
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving order...
              </span>
            )}
          </CardHeader>
          <CardContent className="p-0">
            {items.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                <p>No custom community images uploaded yet.</p>
                <p className="text-xs mt-1 text-slate-500">
                  The homepage carousel is currently active using default hero banner images and curated flagship photography.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Order</TableHead>
                      <TableHead className="w-[120px]">Preview</TableHead>
                      <TableHead>Card Info</TableHead>
                      <TableHead className="w-[110px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-mono text-xs text-muted-foreground w-4 text-center">
                              {index + 1}
                            </span>
                            <div className="flex flex-col">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                disabled={index === 0 || reordering}
                                onClick={() => handleMove(index, "up")}
                              >
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                disabled={index === items.length - 1 || reordering}
                                onClick={() => handleMove(index, "down")}
                              >
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="relative h-16 w-24 overflow-hidden rounded-sm border border-border bg-slate-100">
                            <img
                              src={item.imageUrl}
                              alt={item.title || "Community"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </TableCell>

                        <TableCell>
                          <div className="space-y-0.5 max-w-[280px]">
                            <p className="font-medium text-sm text-foreground truncate">
                              {item.title || "(Untitled)"}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {item.hashtag || "#SiOLCommunity"}
                            </p>
                            {item.link && (
                              <p className="text-[11px] text-primary truncate">
                                {item.link}
                              </p>
                            )}
                          </div>
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={deletingId === item._id}
                            onClick={() => handleDelete(item._id)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                          >
                            {deletingId === item._id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
