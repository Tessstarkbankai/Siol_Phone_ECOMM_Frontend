import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { useEffect, useMemo } from "react";

const wrapperClass = "space-y-4 rounded-xl border border-border/70 bg-card/60 p-4";
const headerClass = "space-y-1";
const titleClass = "text-sm font-semibold text-foreground flex items-center gap-2";
const descriptionClass = "text-xs text-muted-foreground";
const uploadLabelClass =
  "flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/30 bg-primary/5 px-4 py-5 text-center transition hover:bg-primary/10 hover:border-primary/50";
const uploadIconClass = "mb-1.5 h-5 w-5 text-primary";
const uploadTitleClass = "text-sm font-medium text-foreground";
const uploadSubtitleClass = "mt-0.5 text-xs text-muted-foreground";
const hiddenInputClass = "hidden";
const sectionClass = "space-y-2";
const sectionTitleClass = "text-xs font-semibold uppercase tracking-wider text-muted-foreground";
const gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3";
const bannerCardClass =
  "relative overflow-hidden rounded-xl border border-border bg-card group shadow-sm";
const bannerImgClass = "h-24 w-full object-cover transition-transform group-hover:scale-105 duration-300";
const removeBtnClass =
  "absolute top-2 right-2 h-7 w-7 rounded-full bg-background/85 backdrop-blur text-destructive hover:bg-destructive hover:text-white p-0 shadow transition flex items-center justify-center";

type BannerPickerProps = {
  existingBanners: Array<{ url: string; publicId: string }>;
  newBannerFiles: File[];
  onFilesAdd: (files: FileList | null) => void;
  onExistingRemove: (publicId: string) => void;
  onNewFileRemove: (index: number) => void;
};

export function BannerPicker({
  existingBanners,
  newBannerFiles,
  onFilesAdd,
  onExistingRemove,
  onNewFileRemove,
}: BannerPickerProps) {
  const previewUrls = useMemo(
    () => newBannerFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [newBannerFiles],
  );

  useEffect(() => {
    return () => {
      previewUrls.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [previewUrls]);

  return (
    <div className={wrapperClass}>
      <div className={headerClass}>
        <div className={titleClass}>
          <span>Showcase Banner Photos</span>
          <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            PDP Banner Strip
          </span>
        </div>
        <p className={descriptionClass}>
          Upload wide landscape showcase banners displayed directly below the main product card and above reviews.
        </p>
      </div>

      <label className={uploadLabelClass}>
        <ImagePlus className={uploadIconClass} />
        <span className={uploadTitleClass}>Add Showcase Banners</span>
        <span className={uploadSubtitleClass}>Supports PNG, JPG, WEBP (Multiple allowed)</span>

        <input
          type="file"
          accept="image/*"
          multiple
          className={hiddenInputClass}
          onChange={(event) => {
            onFilesAdd(event.target.files);
            event.target.value = "";
          }}
        />
      </label>

      {existingBanners.length > 0 && (
        <div className={sectionClass}>
          <p className={sectionTitleClass}>Active Showcase Banners ({existingBanners.length})</p>
          <div className={gridClass}>
            {existingBanners.map((banner) => (
              <div key={banner.publicId} className={bannerCardClass}>
                <img src={banner.url} alt="showcase banner" className={bannerImgClass} />
                <button
                  type="button"
                  onClick={() => onExistingRemove(banner.publicId)}
                  className={removeBtnClass}
                  title="Remove banner"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {previewUrls.length > 0 && (
        <div className={sectionClass}>
          <p className={sectionTitleClass}>New Banners to Upload ({previewUrls.length})</p>
          <div className={gridClass}>
            {previewUrls.map((item, idx) => (
              <div key={idx} className={bannerCardClass}>
                <img src={item.url} alt="new banner preview" className={bannerImgClass} />
                <button
                  type="button"
                  onClick={() => onNewFileRemove(idx)}
                  className={removeBtnClass}
                  title="Remove pending banner"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-background/80 backdrop-blur px-2 py-1 text-[10px] truncate text-muted-foreground">
                  {item.file.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
