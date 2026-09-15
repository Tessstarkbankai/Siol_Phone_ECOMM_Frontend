import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Pause } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import type { CustomerHomeCommunityImage, CustomerHomeBanner } from "@/features/customer/home/types";

// Curated high-res flagship community photography fallback items matching OPPO style
const DEFAULT_COMMUNITY_ITEMS: Array<{
  id: string;
  imageUrl: string;
  title: string;
  hashtag: string;
  link?: string;
}> = [
  {
    id: "comm-1",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    title: "Unboxing the Flagship Series",
    hashtag: "#InspirationAcademy",
    link: "/products",
  },
  {
    id: "comm-2",
    imageUrl:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop",
    title: "Quick reply speech to text",
    hashtag: "#SiOLFindFold",
    link: "/products",
  },
  {
    id: "comm-3",
    imageUrl:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    title: "Night neon light trail masterclass",
    hashtag: "#ShotOnSiOL",
    link: "/products",
  },
  {
    id: "comm-4",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    title: "Studio portraiture with Hasselblad colors",
    hashtag: "#SiOLPortrait",
    link: "/products",
  },
  {
    id: "comm-5",
    imageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    title: "Find Academy Masterclass - Mumbai Chapter",
    hashtag: "#FindAcademy",
    link: "/products",
  },
  {
    id: "comm-6",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    title: "Titanium chassis architecture breakdown",
    hashtag: "#SiOLInnovation",
    link: "/products",
  },
  {
    id: "comm-7",
    imageUrl:
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=1200&auto=format&fit=crop",
    title: "Macro photography & periscope telephoto",
    hashtag: "#UltraClearScene",
    link: "/products",
  },
  {
    id: "comm-8",
    imageUrl:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    title: "Creators meet & creative workshop",
    hashtag: "#SiOLCommunity",
    link: "/products",
  },
  {
    id: "comm-9",
    imageUrl:
      "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=1200&auto=format&fit=crop",
    title: "Sunset reflections & dynamic range test",
    hashtag: "#ShotOnSiOL",
    link: "/products",
  },
  {
    id: "comm-10",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
    title: "Ecosystem connectivity across devices",
    hashtag: "#SmartLife",
    link: "/products",
  },
];

interface CommunityCarouselProps {
  communityImages?: CustomerHomeCommunityImage[];
  banners?: CustomerHomeBanner[];
  title?: string;
  description?: string;
  viewAllLink?: string;
}

export function CommunityCarousel({
  communityImages = [],
  banners = [],
  title = "SiOL Community",
  description = "A home for all SiOL fans to experience content, inspiration, and our beautiful technology.",
  viewAllLink = "/products",
}: CommunityCarouselProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  // Combine data sources: server community images > server hero banners > high-res defaults
  const activeItems = React.useMemo(() => {
    const items: Array<{
      id: string;
      imageUrl: string;
      title: string;
      hashtag: string;
      link?: string;
    }> = [];

    if (communityImages && communityImages.length > 0) {
      communityImages.forEach((img) => {
        if (img.imageUrl) {
          items.push({
            id: img._id,
            imageUrl: img.imageUrl,
            title: img.title || "SiOL Community",
            hashtag: img.hashtag || "#SiOLCommunity",
            link: img.link || "/products",
          });
        }
      });
    }

    if (banners && banners.length > 0) {
      banners.forEach((b) => {
        if (b.imageUrl && !items.some((it) => it.imageUrl === b.imageUrl)) {
          items.push({
            id: b._id,
            imageUrl: b.imageUrl,
            title: b.title || "Flagship Showcase",
            hashtag: "#SiOLFlagship",
            link: b.link || "/products",
          });
        }
      });
    }

    // Fill with default items if fewer than 10 to ensure a rich multi-slide staggered layout
    if (items.length < 10) {
      DEFAULT_COMMUNITY_ITEMS.forEach((def) => {
        if (!items.some((it) => it.id === def.id)) {
          items.push(def);
        }
      });
    }

    return items;
  }, [communityImages, banners]);

  // Split items into clusters of 5 to recreate the exact OPPO 2-row layout:
  // 1 tall featured portrait card (left) + 4 cards in 2x2 grid (right)
  const clusters = React.useMemo(() => {
    const list: Array<{
      featured: (typeof activeItems)[0];
      topRow: [(typeof activeItems)[0], (typeof activeItems)[0]];
      bottomRow: [(typeof activeItems)[0], (typeof activeItems)[0]];
    }> = [];

    const total = activeItems.length;
    // Build at least 3 clusters for infinite loop
    const clusterCount = Math.max(3, Math.ceil(total / 5));

    for (let i = 0; i < clusterCount; i++) {
      const idx = (i * 5) % total;
      list.push({
        featured: activeItems[idx % total],
        topRow: [activeItems[(idx + 1) % total], activeItems[(idx + 2) % total]],
        bottomRow: [activeItems[(idx + 3) % total], activeItems[(idx + 4) % total]],
      });
    }

    return list;
  }, [activeItems]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
      containScroll: false,
    },
    [
      AutoScroll({
        speed: 0.85,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  );

  const toggleAutoScroll = useCallback(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins().autoScroll;
    if (!autoScroll) return;

    if (autoScroll.isPlaying()) {
      autoScroll.stop();
      setIsPlaying(false);
    } else {
      autoScroll.play();
      setIsPlaying(true);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins().autoScroll;
    if (!autoScroll) return;

    const onAutoScrollPlay = () => setIsPlaying(true);
    const onAutoScrollStop = () => setIsPlaying(false);

    emblaApi.on("autoScroll:play", onAutoScrollPlay);
    emblaApi.on("autoScroll:stop", onAutoScrollStop);

    return () => {
      emblaApi.off("autoScroll:play", onAutoScrollPlay);
      emblaApi.off("autoScroll:stop", onAutoScrollStop);
    };
  }, [emblaApi]);

  return (
    <section className="w-full bg-transparent pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16 overflow-hidden select-none">
      {/* 1. Header Section - Recreating OPPO Header Placement & Typography */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 mb-5 sm:mb-8">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            {title}
          </span>
          <Link
            to={viewAllLink}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-900 hover:text-primary transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-normal leading-snug tracking-tight text-slate-900 max-w-2xl">
            {description}
          </h2>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-end">
            <button
              type="button"
              onClick={toggleAutoScroll}
              aria-label={isPlaying ? "Pause community carousel" : "Play community carousel"}
              className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-slate-300 bg-white/80 hover:bg-slate-100 hover:border-slate-400 transition-all text-slate-800 shadow-xs active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 fill-current text-slate-800" />
              ) : (
                <Play className="h-4 w-4 fill-current text-slate-800 ml-0.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Embla AutoScroll Track (Desktop / Tablet: OPPO 2-Row Cluster Layout) */}
      <div className="hidden sm:block w-full">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-2 pl-4 sm:pl-8 lg:pl-14">
            {clusters.map((cluster, clusterIndex) => (
              <div
                key={`cluster-${clusterIndex}`}
                className="flex shrink-0 gap-2 items-stretch"
                style={{
                  height: "clamp(350px, 34vw, 530px)",
                }}
              >
                {/* 1. Tall Left Featured Card (Proportion ~ 0.77 AR) */}
                <div
                  className="group relative overflow-hidden bg-slate-100 shrink-0"
                  style={{
                    width: "clamp(270px, 26vw, 410px)",
                  }}
                >
                  <img
                    src={cluster.featured.imageUrl}
                    alt={cluster.featured.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* OPPO-style bottom badge */}
                  <div className="absolute bottom-3.5 left-3.5 max-w-[calc(100%-28px)]">
                    <div className="rounded-[4px] bg-[#EFEDE9]/95 backdrop-blur-xs px-3 py-2 shadow-xs transition-transform duration-300 group-hover:-translate-y-0.5">
                      <p className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                        {cluster.featured.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-normal mt-0.5">
                        {cluster.featured.hashtag}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. 2-Row Grid Right Section */}
                <div className="flex flex-col gap-2 shrink-0">
                  {/* Row 1 (Top): Narrow card + Wide card */}
                  <div className="flex gap-2 flex-1">
                    {/* Top Card 1 (Narrow) */}
                    <div
                      className="group relative overflow-hidden bg-slate-100 h-full"
                      style={{
                        width: "clamp(190px, 19vw, 340px)",
                      }}
                    >
                      <img
                        src={cluster.topRow[0].imageUrl}
                        alt={cluster.topRow[0].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 max-w-[calc(100%-24px)]">
                        <div className="rounded-[4px] bg-[#EFEDE9]/95 backdrop-blur-xs px-2.5 py-1.5 shadow-xs transition-transform duration-300 group-hover:-translate-y-0.5">
                          <p className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                            {cluster.topRow[0].title}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-500 font-normal mt-0.5">
                            {cluster.topRow[0].hashtag}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Top Card 2 (Wide) */}
                    <div
                      className="group relative overflow-hidden bg-slate-100 h-full"
                      style={{
                        width: "clamp(250px, 25vw, 450px)",
                      }}
                    >
                      <img
                        src={cluster.topRow[1].imageUrl}
                        alt={cluster.topRow[1].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 max-w-[calc(100%-24px)]">
                        <div className="rounded-[4px] bg-[#EFEDE9]/95 backdrop-blur-xs px-2.5 py-1.5 shadow-xs transition-transform duration-300 group-hover:-translate-y-0.5">
                          <p className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                            {cluster.topRow[1].title}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-500 font-normal mt-0.5">
                            {cluster.topRow[1].hashtag}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2 (Bottom): Wide card + Narrow card - Inverted for brick rhythm! */}
                  <div className="flex gap-2 flex-1">
                    {/* Bottom Card 1 (Wide) */}
                    <div
                      className="group relative overflow-hidden bg-slate-100 h-full"
                      style={{
                        width: "clamp(250px, 25vw, 450px)",
                      }}
                    >
                      <img
                        src={cluster.bottomRow[0].imageUrl}
                        alt={cluster.bottomRow[0].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 max-w-[calc(100%-24px)]">
                        <div className="rounded-[4px] bg-[#EFEDE9]/95 backdrop-blur-xs px-2.5 py-1.5 shadow-xs transition-transform duration-300 group-hover:-translate-y-0.5">
                          <p className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                            {cluster.bottomRow[0].title}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-500 font-normal mt-0.5">
                            {cluster.bottomRow[0].hashtag}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Card 2 (Narrow) */}
                    <div
                      className="group relative overflow-hidden bg-slate-100 h-full"
                      style={{
                        width: "clamp(190px, 19vw, 340px)",
                      }}
                    >
                      <img
                        src={cluster.bottomRow[1].imageUrl}
                        alt={cluster.bottomRow[1].title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-3 left-3 max-w-[calc(100%-24px)]">
                        <div className="rounded-[4px] bg-[#EFEDE9]/95 backdrop-blur-xs px-2.5 py-1.5 shadow-xs transition-transform duration-300 group-hover:-translate-y-0.5">
                          <p className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                            {cluster.bottomRow[1].title}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-500 font-normal mt-0.5">
                            {cluster.bottomRow[1].hashtag}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Mobile View (< 640px): Finger-friendly responsive horizontal scroll with peek */}
      <div className="block sm:hidden w-full">
        <div className="flex gap-2.5 overflow-x-auto px-4 pb-4 no-scrollbar snap-x snap-mandatory">
          {activeItems.map((item, idx) => (
            <div
              key={`mobile-comm-${item.id}-${idx}`}
              className="group relative shrink-0 snap-center overflow-hidden bg-slate-100 rounded-sm"
              style={{
                width: "72vw",
                height: "270px",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 max-w-[calc(100%-24px)]">
                <div className="rounded-[4px] bg-[#EFEDE9]/95 backdrop-blur-xs px-3 py-2 shadow-xs">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-slate-500 font-normal mt-0.5">
                    {item.hashtag}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
