import React, { useState, useEffect } from "react";
import { SupportHero } from "@/components/support/SupportHero";
import { DeviceServiceJourney } from "@/components/support/DeviceServiceJourney";
import { ServiceCenterLocator } from "@/components/support/ServiceCenterLocator";
import { SupportContactChannels } from "@/components/support/SupportContactChannels";
import { DataPrivacySection } from "@/components/support/DataPrivacySection";
import { SupportFAQ } from "@/components/support/SupportFAQ";
import { DownloadableResources } from "@/components/support/DownloadableResources";

export function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // SEO Page Title and Meta description
  useEffect(() => {
    document.title = "Customer Support & Official Service Portal | SiOL";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Official SiOL customer support portal. Explore certified service journeys for smartphones and feature phones, find authorized service centers across India, and access direct specialist support.",
      );
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const el = document.getElementById("service-centers");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleQuickTopicClick = (topic: string) => {
    setSearchQuery(topic);
    const el = document.getElementById("service-centers");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. Support Hero with Main Search Bar & Quick Jump Links */}
      <SupportHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onQuickTopicClick={handleQuickTopicClick}
      />

      {/* 2. Image-Centric Device Service Journey (Smartphone vs Feature Phone with Creative Animated Path) */}
      <DeviceServiceJourney />

      {/* 3. Authorized Service Center Finder (Image-Only Popular City Cards with On-Hover Store Drawers) */}
      <ServiceCenterLocator />

      {/* 4. Human Support Contact Channels with Live IST Status */}
      <SupportContactChannels />

      {/* 5. Data Privacy & Maintenance Mode Security Safeguards */}
      <DataPrivacySection />

      {/* 6. Categorized Interactive FAQs */}
      <SupportFAQ />

      {/* 7. Downloadable Official Manuals & SAR Declarations */}
      <DownloadableResources />
    </div>
  );
}

export default SupportPage;

