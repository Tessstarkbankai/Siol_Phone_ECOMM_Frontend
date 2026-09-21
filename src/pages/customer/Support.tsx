import { useEffect } from "react";
import { SupportHero } from "@/components/support/SupportHero";
import { DeviceServiceJourney } from "@/components/support/DeviceServiceJourney";
import { ServiceCenterLocator } from "@/components/support/ServiceCenterLocator";
import { SupportContactChannels } from "@/components/support/SupportContactChannels";
import { SupportTeaserBanner } from "@/components/support/SupportTeaserBanner";
import { SupportFAQ } from "@/components/support/SupportFAQ";
import { DownloadableResources } from "@/components/support/DownloadableResources";

export function SupportPage() {
  // SEO Page Title and Meta description
  useEffect(() => {
    document.title = "Official SiOL Support";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Official SiOL Support. Find answers, explore support topics, find authorized service providers, and arrange certified repairs.",
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] antialiased selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      {/* 1. Support Hero */}
      <SupportHero />

      {/* 2. Image-Centric Device Service Journey (Smartphone vs Feature Phone with Creative Animated Path) */}
      <DeviceServiceJourney />

      {/* 3. Authorized Service Center Finder (Image-Only Popular City Cards with On-Hover Store Drawers) */}
      <ServiceCenterLocator />

      {/* 4. Human Support Contact Channels with Live IST Status */}
      <SupportContactChannels />

      {/* 5. Next-Gen Smartphone Coming Soon Teaser Banner */}
      <SupportTeaserBanner />

      {/* 6. Categorized Interactive FAQs */}
      <SupportFAQ />

      {/* 7. Downloadable Official Manuals & SAR Declarations */}
      <DownloadableResources />
    </div>
  );
}

export default SupportPage;

