import { useEffect, useState } from "react";
import { Plus, Trash2, Video, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Commonloader } from "@/components/common/Loader";
import { getAdminVideos, deleteAdminVideo } from "@/features/admin/videos/api";
import type { AdminVideo } from "@/features/admin/videos/types";
import { VideoDialog } from "@/components/admin/videos/video-dialog";
import { UniversalVideoCard } from "@/components/common/universal-video-card";

export function AdminVideos() {
  const [videos, setVideos] = useState<AdminVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadVideos() {
    try {
      setLoading(true);
      const res = await getAdminVideos();
      setVideos(res || []);
    } catch {
      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadVideos();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      setDeletingId(id);
      await deleteAdminVideo(id);
      toast.success("Video deleted successfully");
      await loadVideos();
    } catch {
      toast.error("Failed to delete video");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <Commonloader text="Loading videos..." />;
  }

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Film className="h-3.5 w-3.5" />
            <span>Community Video Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 mt-1">
            Storefront Video Reels
          </h1>
          <p className="text-sm text-neutral-500">
            Upload MP4 video files saved to Cloudinary or paste direct links (Instagram Reels, YouTube Shorts, or video URLs).
          </p>
        </div>

        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-5 rounded-xl shadow-md flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Upload New Video</span>
        </Button>
      </div>

      {/* Video Cards Grid */}
      {videos.length === 0 ? (
        <Card className="rounded-3xl border border-dashed border-neutral-300 p-12 text-center bg-white">
          <CardContent className="space-y-4 p-0">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
              <Video className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-neutral-900">
                No Videos Uploaded Yet
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                The storefront is currently showing fallback sample kitchen reels. Upload an MP4 video file or Instagram Reel link to showcase your products!
              </p>
            </div>
            <Button
              onClick={() => setDialogOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white font-bold"
            >
              Upload First Video
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="group relative rounded-3xl bg-white border border-neutral-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-300"
            >
              {/* Universal Video Player */}
              <div className="w-full">
                <UniversalVideoCard
                  videoUrl={video.videoUrl}
                  title={video.title}
                  caption={video.caption}
                  autoPlay={false}
                />
              </div>

              {/* Card Meta & Delete */}
              <div className="p-4 space-y-3">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-neutral-900 leading-tight truncate">
                    {video.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    Uploaded {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Live on Storefront
                  </span>

                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={deletingId === video._id}
                    onClick={() => handleDelete(video._id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2.5 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Video Dialog */}
      <VideoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSaved={loadVideos}
      />
    </div>
  );
}

export default AdminVideos;
