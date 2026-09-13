import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Film,
  Image as ImageIcon,
  Loader2,
  Play,
  Trash2,
} from "lucide-react";
import type { AdminBanner } from "@/features/admin/settings/types";

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
  );
  return match ? match[1] : null;
}

function formatDateTime(value: string) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString();
}

type AdminSettingsBannersTableProps = {
  items: AdminBanner[];
  onDelete: (id: string) => void;
  deletingId: string | null;
  onMove: (index: number, direction: "up" | "down") => void;
  reordering?: boolean;
};

function AdminSettingsBannersTable({
  items,
  onDelete,
  deletingId,
  onMove,
  reordering,
}: AdminSettingsBannersTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Order</TableHead>
            <TableHead className="w-[140px]">Preview</TableHead>
            <TableHead className="w-[90px]">Type</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="w-[110px]">Created</TableHead>
            <TableHead className="w-[130px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item, index) => {
            const isVideo =
              item.mediaType === "video" ||
              Boolean(item.videoUrl) ||
              (item.imageUrl && item.imageUrl.endsWith(".mp4"));
            const ytId = isVideo ? getYouTubeId(item.videoUrl || item.imageUrl) : null;
            const mediaSource = isVideo
              ? item.videoUrl || item.imageUrl
              : item.imageUrl;

            return (
              <TableRow key={item._id} className="transition-colors hover:bg-muted/40">
                {/* Order Index & Reorder Controls */}
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-secondary text-xs font-bold text-secondary-foreground">
                      #{index + 1}
                    </span>
                    <div className="flex flex-col">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 p-0 hover:bg-secondary"
                        disabled={index === 0 || reordering}
                        onClick={() => onMove(index, "up")}
                        title="Move Up"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 p-0 hover:bg-secondary"
                        disabled={index === items.length - 1 || reordering}
                        onClick={() => onMove(index, "down")}
                        title="Move Down"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </TableCell>

                {/* Media Preview */}
                <TableCell>
                  <div className="relative h-16 w-28 overflow-hidden rounded border border-border bg-muted/70">
                    {isVideo ? (
                      ytId ? (
                        <img
                          src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                          alt="video thumbnail"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="relative h-full w-full bg-black">
                          <video
                            src={mediaSource}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <Play className="h-4 w-4 text-white fill-white" />
                          </div>
                        </div>
                      )
                    ) : (
                      <img
                        src={mediaSource}
                        alt="banner"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    )}
                  </div>
                </TableCell>

                {/* Media Type Badge */}
                <TableCell>
                  {isVideo ? (
                    <span className="inline-flex items-center gap-1 rounded bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-400 border border-purple-500/20">
                      <Film className="h-3 w-3" />
                      Video
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-400 border border-sky-500/20">
                      <ImageIcon className="h-3 w-3" />
                      Photo
                    </span>
                  )}
                </TableCell>

                {/* Title & Metadata */}
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground line-clamp-1">
                      {item.title || (isVideo ? "Featured Video" : "Featured Banner")}
                    </p>
                    {item.tagline && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {item.tagline}
                      </p>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
                      >
                        {item.link}
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                </TableCell>

                {/* Created Date */}
                <TableCell className="text-xs text-muted-foreground">
                  {formatDateTime(item.createdAt)}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="h-8 gap-1 px-2.5 text-xs"
                    disabled={deletingId === item._id}
                    onClick={() => onDelete(item._id)}
                  >
                    {deletingId === item._id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminSettingsBannersTable;

