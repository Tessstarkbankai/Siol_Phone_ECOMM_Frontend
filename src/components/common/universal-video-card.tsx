import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, AlertCircle } from "lucide-react";
import { env } from "@/lib/env";

export type ParsedMedia = {
  type: "direct" | "instagram" | "youtube";
  embedUrl: string;
  rawUrl: string;
};

export function parseVideoUrl(url: string): ParsedMedia {
  if (!url) return { type: "direct", embedUrl: "", rawUrl: "" };

  let trimmed = url.trim();
  if (trimmed.startsWith("/uploads/")) {
    trimmed = `${env.backendUrl}${trimmed}`;
  }

  // 1. Instagram: https://www.instagram.com/reel/CODE/... or /p/CODE/
  const igMatch = trimmed.match(
    /instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i,
  );
  if (igMatch && igMatch[1]) {
    const igId = igMatch[1];
    return {
      type: "instagram",
      embedUrl: `https://www.instagram.com/reel/${igId}/embed/captioned`,
      rawUrl: trimmed,
    };
  }

  // 2. YouTube Shorts or standard YouTube
  const ytShortsMatch = trimmed.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]+)/i);
  if (ytShortsMatch && ytShortsMatch[1]) {
    const id = ytShortsMatch[1];
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0`,
      rawUrl: trimmed,
    };
  }

  const ytWatchMatch = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/i,
  );
  if (ytWatchMatch && ytWatchMatch[1]) {
    const id = ytWatchMatch[1];
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0`,
      rawUrl: trimmed,
    };
  }

  return {
    type: "direct",
    embedUrl: trimmed,
    rawUrl: trimmed,
  };
}

type UniversalVideoCardProps = {
  videoUrl: string;
  title: string;
  caption?: string;
  className?: string;
  autoPlay?: boolean;
};

export function UniversalVideoCard({
  videoUrl,
  title,
  caption,
  className = "",
  autoPlay = true,
}: UniversalVideoCardProps) {
  const parsed = parseVideoUrl(videoUrl);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (parsed.type === "direct" && videoRef.current) {
      const vid = videoRef.current;
      vid.muted = true;
      if (autoPlay) {
        const tryPlay = () => {
          vid
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              // Autoplay policy fallback
            });
        };
        tryPlay();
        vid.addEventListener("canplay", tryPlay, { once: true });
        return () => {
          vid.removeEventListener("canplay", tryPlay);
        };
      }
    }
  }, [parsed.embedUrl, autoPlay, parsed.type]);

  function togglePlay(e?: React.MouseEvent) {
    e?.stopPropagation();
    if (parsed.type !== "direct" || !videoRef.current) return;

    const vid = videoRef.current;
    if (vid.paused) {
      vid
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }

  function toggleMute(e?: React.MouseEvent) {
    e?.stopPropagation();
    if (parsed.type !== "direct" || !videoRef.current) return;

    const vid = videoRef.current;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  }

  // Render Instagram Embed
  if (parsed.type === "instagram") {
    return (
      <div
        className={`relative aspect-[9/16] w-full bg-black overflow-hidden rounded-3xl ${className}`}
      >
        <iframe
          src={parsed.embedUrl}
          title={title}
          className="h-full w-full border-0 rounded-3xl"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
        {caption ? (
          <div className="absolute top-3 left-3 pointer-events-none z-10">
            <span className="rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/20">
              {caption}
            </span>
          </div>
        ) : null}
      </div>
    );
  }

  // Render YouTube Embed
  if (parsed.type === "youtube") {
    return (
      <div
        className={`relative aspect-[9/16] w-full bg-black overflow-hidden rounded-3xl ${className}`}
      >
        <iframe
          src={parsed.embedUrl}
          title={title}
          className="h-full w-full border-0 scale-[1.03] origin-center rounded-3xl pointer-events-auto"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        {caption ? (
          <div className="absolute top-3 left-3 pointer-events-none z-10">
            <span className="rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/20">
              {caption}
            </span>
          </div>
        ) : null}
      </div>
    );
  }

  // Render Direct MP4 / Cloudinary Video
  return (
    <div
      className={`relative aspect-[9/16] w-full bg-black overflow-hidden rounded-3xl group/player ${className}`}
    >
      {hasError ? (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center text-neutral-400 bg-neutral-900 space-y-2">
          <AlertCircle className="h-8 w-8 text-amber-500" />
          <p className="text-xs font-semibold text-white">Video unavailable</p>
          <p className="text-[10px] text-neutral-400 max-w-[160px] truncate">{title}</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={parsed.embedUrl}
          autoPlay={autoPlay}
          loop
          muted={isMuted}
          playsInline
          crossOrigin="anonymous"
          preload="metadata"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover rounded-3xl"
        />
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

      {/* Top Product Caption Badge */}
      {caption ? (
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-10">
          <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md border border-white/20 truncate max-w-[85%]">
            {caption}
          </span>
        </div>
      ) : null}

      {/* Bottom Title & Control Bar */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between z-10 pointer-events-auto">
        <div className="space-y-0.5 max-w-[65%] pointer-events-none">
          <h4 className="text-xs sm:text-sm font-black text-white leading-tight drop-shadow-md truncate">
            {title}
          </h4>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Play / Pause Toggle */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md border border-white/20 transition hover:bg-black/90 hover:scale-110 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-white" />
            ) : (
              <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-white" />
            )}
          </button>

          {/* Mute / Unmute Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md border border-white/20 transition hover:bg-black/90 hover:scale-110 active:scale-95"
          >
            {isMuted ? (
              <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UniversalVideoCard;
