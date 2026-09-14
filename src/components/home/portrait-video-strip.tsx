import { useRef } from "react";
import { ChevronLeft, ChevronRight, Film } from "lucide-react";
import type { CustomerHomeVideo } from "@/features/customer/home/types";
import { UniversalVideoCard } from "@/components/common/universal-video-card";

type PortraitVideoStripProps = {
  videos?: CustomerHomeVideo[];
};

// High-bandwidth CORS-enabled tech smartphone video reels
const defaultSampleVideos: CustomerHomeVideo[] = [
  {
    _id: "sample-1",
    title: "iPhone 16 Pro Max 4K 120fps Cinematic Test",
    caption: "A18 Pro Camera Review",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample-2",
    title: "Galaxy S25 Ultra 100x Space Zoom & AI Nightography",
    caption: "Galaxy AI Zoom Test",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample-3",
    title: "Galaxy Z Fold6 Multitasking & S-Pen Experience",
    caption: "Dual Display Productivity",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample-4",
    title: "Pixel 9 Pro XL Gemini Live & Magic Audio Eraser",
    caption: "Google Tensor G4 AI",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample-5",
    title: "OnePlus 13 120Hz Ray Tracing Gaming Benchmark",
    caption: "Snapdragon 8 Elite 6000mAh",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    createdAt: new Date().toISOString(),
  },
];

export function PortraitVideoStrip({ videos = [] }: PortraitVideoStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const displayVideos =
    videos && videos.length > 0 ? videos : defaultSampleVideos;

  function scroll(direction: "left" | "right") {
    if (scrollRef.current) {
      const offset = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  }

  return (
    <section className="py-14 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/50 text-slate-900 border-y border-blue-100/70 mb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Film className="h-3.5 w-3.5" />
            <span>Real-World Performance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            See Flagships In Action
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Witness 4K 120fps cinema camera tests, ray-tracing gaming speed runs, and AI live demonstrations.
          </p>
        </div>

        {/* Video Cards Carousel */}
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white border border-blue-200/80 text-slate-800 shadow-lg transition hover:bg-neutral-50 hover:text-primary hover:scale-110"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Videos Rail */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto py-3 px-1 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayVideos.map((video) => (
              <div
                key={video._id}
                className="w-[240px] sm:w-[260px] md:w-[280px] shrink-0 transition-all duration-300 hover:-translate-y-1.5"
              >
                <UniversalVideoCard
                  videoUrl={video.videoUrl}
                  title={video.title}
                  caption={video.caption}
                  autoPlay={true}
                />
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white border border-blue-200/80 text-slate-800 shadow-lg transition hover:bg-neutral-50 hover:text-primary hover:scale-110"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PortraitVideoStrip;
