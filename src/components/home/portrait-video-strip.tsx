import { useRef } from "react";
import { ChevronLeft, ChevronRight, Film } from "lucide-react";
import type { CustomerHomeVideo } from "@/features/customer/home/types";
import { UniversalVideoCard } from "@/components/common/universal-video-card";

type PortraitVideoStripProps = {
  videos?: CustomerHomeVideo[];
};

// Bulletproof, high-bandwidth CORS-enabled sample kitchen video reels
const defaultSampleVideos: CustomerHomeVideo[] = [
  {
    _id: "sample-1",
    title: "Air Fryer Crispy Recipe Showcase",
    caption: "Crimson Edge 4.5L",
    videoUrl:
      "https://www.instagram.com/reel/DK11c5-ziIW/?igsi=MTJpOTM5bXFjZ2dncA==",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample-2",
    title: "Nutri-blend 22,000 RPM Smoothie Maker",
    caption: "Nutri-blend 500W",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample-3",
    title: "Barista Italian Espresso Brewing",
    caption: "Regalia 15-Bar Espresso",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample-4",
    title: "Royal Velvet Non-Stick Pan Sauté",
    caption: "Royal Velvet Cookware",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "sample-5",
    title: "Chef Magic Automatic Cooking Robot",
    caption: "Chef Magic 200+ Recipes",
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
    <section className="py-14 bg-neutral-50/70 border-y border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary">
            <Film className="h-3.5 w-3.5" />
            <span>Community Spotlight</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900">
            See What Everyone’s Talking About
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Discover how home chefs and creators use Wonderchef appliances to craft delicious meals every day.
          </p>
        </div>

        {/* Video Cards Carousel */}
        <div className="relative group">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white/90 border border-neutral-300 text-neutral-800 shadow-xl transition hover:bg-white hover:text-primary hover:scale-110 backdrop-blur-md"
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
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white/90 border border-neutral-300 text-neutral-800 shadow-xl transition hover:bg-white hover:text-primary hover:scale-110 backdrop-blur-md"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PortraitVideoStrip;
