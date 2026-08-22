import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createAdminVideo } from "@/features/admin/videos/api";
import { Film, UploadCloud, Video } from "lucide-react";
import { UniversalVideoCard } from "@/components/common/universal-video-card";

type VideoDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => Promise<void>;
};

export function VideoDialog({
  open,
  onOpenChange,
  onSaved,
}: VideoDialogProps) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [productLink, setProductLink] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [saving, setSaving] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  }

  function handleUrlChange(url: string) {
    setVideoUrl(url);
    if (!file && url.trim()) {
      setPreviewUrl(url.trim());
    }
  }

  function resetForm() {
    setTitle("");
    setCaption("");
    setProductLink("");
    setVideoUrl("");
    setFile(null);
    setPreviewUrl("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a video title");
      return;
    }

    if (!file && !videoUrl.trim()) {
      toast.error("Please select a video file or enter a video URL");
      return;
    }

    try {
      setSaving(true);
      await createAdminVideo(
        {
          title: title.trim(),
          caption: caption.trim(),
          productLink: productLink.trim(),
          videoUrl: videoUrl.trim() || undefined,
        },
        file || undefined,
      );

      toast.success("Video uploaded and saved successfully!");
      resetForm();
      onOpenChange(false);
      await onSaved();
    } catch {
      toast.error("Failed to upload video");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black">
            <Video className="h-5 w-5 text-primary" />
            <span>Upload Community Video / Reel</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="video-title" className="font-bold text-xs uppercase tracking-wider text-neutral-700">
              Video Title *
            </Label>
            <Input
              id="video-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Crispy Paneer Tikka in Air Fryer"
              required
            />
          </div>

          {/* Caption / Tag */}
          <div className="space-y-1.5">
            <Label htmlFor="video-caption" className="font-bold text-xs uppercase tracking-wider text-neutral-700">
              Overlay Caption / Product Tag
            </Label>
            <Input
              id="video-caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Crimson Edge 4.5L Air Fryer"
            />
          </div>

          {/* Product Link (Optional) */}
          <div className="space-y-1.5">
            <Label htmlFor="video-link" className="font-bold text-xs uppercase tracking-wider text-neutral-700">
              Product Link (Optional)
            </Label>
            <Input
              id="video-link"
              value={productLink}
              onChange={(e) => setProductLink(e.target.value)}
              placeholder="e.g. /collections"
            />
          </div>

          {/* Video File Upload */}
          <div className="space-y-2">
            <Label className="font-bold text-xs uppercase tracking-wider text-neutral-700">
              Upload Video File (MP4, WebM, MOV)
            </Label>
            <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50/70 p-5 text-center hover:bg-neutral-50 transition cursor-pointer relative">
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center gap-2">
                <UploadCloud className="h-8 w-8 text-neutral-400" />
                <p className="text-xs font-semibold text-neutral-700">
                  {file ? file.name : "Click or drag video file here to upload"}
                </p>
                <p className="text-[11px] text-neutral-500">
                  Recommended: 9:16 portrait orientation (max 100MB)
                </p>
              </div>
            </div>
          </div>

          {/* Or Direct Video URL */}
          <div className="space-y-1.5">
            <Label htmlFor="direct-video-url" className="font-bold text-xs uppercase tracking-wider text-neutral-700">
              Or Enter Direct Video URL
            </Label>
            <Input
              id="direct-video-url"
              value={videoUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://..."
            />
          </div>

          {/* Live Preview Player */}
          {previewUrl ? (
            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-wider text-neutral-700">
                Live Video Preview
              </Label>
              <div className="mx-auto w-48 shadow-lg">
                <UniversalVideoCard
                  videoUrl={previewUrl}
                  title={title || "Video Preview"}
                  caption={caption}
                  autoPlay={true}
                />
              </div>
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-neutral-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-white font-bold"
            >
              {saving ? "Uploading to Cloudinary..." : "Save & Publish Video"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default VideoDialog;
