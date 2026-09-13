import AdminSettingsBannersTable from "@/components/admin/settings/admin-settings-banner-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminSettings } from "@/features/admin/settings/use-admin-settings";
import { AlertCircle, Film, ImagePlus, Link as LinkIcon, Loader2, RefreshCw, UploadCloud } from "lucide-react";

export function AdminSettings() {
  const {
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
    refreshBanners,
    handleUpload,
    uploading,
    handleDelete,
    deletingId,
    handleMove,
    reordering,
    error,
  } = useAdminSettings();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Hero Carousel & Banner Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage the flagship slides, videos, and photos displayed on the customer homepage.
            If no banners are active, the store automatically falls back to default flagship slides.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
          {/* Upload / Add Form Card */}
          <Card className="border-border/60 bg-card/80 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center justify-between">
                <span>Add Banner Media</span>
                <span className="text-xs font-normal text-muted-foreground">
                  Images & Videos
                </span>
              </CardTitle>

              {/* Upload Mode Toggle */}
              <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1 text-xs mt-2">
                <button
                  type="button"
                  onClick={() => setUploadMode("file")}
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded font-medium transition-all ${
                    uploadMode === "file"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <UploadCloud className="h-3.5 w-3.5" />
                  Upload Files
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode("url")}
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded font-medium transition-all ${
                    uploadMode === "url"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                  Media / Video URL
                </button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {uploadMode === "file" ? (
                <div className="space-y-3">
                  <div className="flex min-h-[160px] flex-col items-center justify-center gap-3 border-2 border-dashed border-border/80 bg-background/50 p-5 text-center rounded-lg hover:border-primary/50 transition-colors">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                      <ImagePlus className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Select Photos or Videos
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Supports MP4, WebM, PNG, JPG, WebP (up to 100MB)
                      </p>
                    </div>

                    <Input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      className="cursor-pointer file:cursor-pointer"
                      onChange={(event) =>
                        setFiles(Array.from(event.target.files || []))
                      }
                    />

                    <p className="text-xs font-semibold text-primary">{fileCountLabel}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium">Media Type</Label>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant={directMediaType === "video" ? "default" : "outline"}
                        className="flex-1 gap-1.5 h-8 text-xs"
                        onClick={() => setDirectMediaType("video")}
                      >
                        <Film className="h-3.5 w-3.5" />
                        Video (YouTube / MP4)
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant={directMediaType === "image" ? "default" : "outline"}
                        className="flex-1 gap-1.5 h-8 text-xs"
                        onClick={() => setDirectMediaType("image")}
                      >
                        <ImagePlus className="h-3.5 w-3.5" />
                        Image / Photo URL
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="directUrl" className="text-xs font-medium">
                      {directMediaType === "video"
                        ? "Video or YouTube URL"
                        : "Image Direct URL"}
                    </Label>
                    <Input
                      id="directUrl"
                      placeholder={
                        directMediaType === "video"
                          ? "e.g. https://youtu.be/... or /phone.mp4"
                          : "e.g. https://images.unsplash.com/..."
                      }
                      value={directUrl}
                      onChange={(e) => setDirectUrl(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Optional Metadata Fields */}
              <div className="space-y-3 pt-2 border-t border-border/50">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Slide Details (Optional)
                </p>

                <div className="space-y-1.5">
                  <Label htmlFor="bannerTitle" className="text-xs">
                    Banner Title / Headline
                  </Label>
                  <Input
                    id="bannerTitle"
                    placeholder="e.g. Galaxy S25 Ultra or Summer Mega Sale"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bannerTagline" className="text-xs">
                    Tagline / Subtext
                  </Label>
                  <Input
                    id="bannerTagline"
                    placeholder="e.g. Epic in every way. Built with Grade 5 Titanium."
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bannerLink" className="text-xs">
                    Call-to-Action Link
                  </Label>
                  <Input
                    id="bannerLink"
                    placeholder="e.g. /collections?brand=Samsung"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>
              </div>

              <Button
                className="w-full gap-2 mt-4"
                disabled={uploading}
                onClick={() => handleUpload()}
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading Media...
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-4 w-4" />
                    Save & Add to Carousel
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Current Banners List Card */}
          <Card className="border-border/60 bg-card/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-3 pb-4">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Active Homepage Banners ({items.length})
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Ordered as they will appear on the homepage hero carousel.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 h-8 text-xs"
                disabled={loading}
                onClick={() => refreshBanners()}
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              {loading && items.length === 0 ? (
                <div className="flex items-center justify-center p-8 text-muted-foreground gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading banners...</span>
                </div>
              ) : !items.length ? (
                <div className="rounded-lg border border-dashed border-border bg-background/40 p-8 text-center space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    No custom banners added yet
                  </p>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    The customer homepage is currently displaying the built-in default flagship slides.
                    Upload photos or videos on the left to activate dynamic carousel slides!
                  </p>
                </div>
              ) : (
                <AdminSettingsBannersTable
                  items={items}
                  onDelete={handleDelete}
                  deletingId={deletingId}
                  onMove={handleMove}
                  reordering={reordering}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;

