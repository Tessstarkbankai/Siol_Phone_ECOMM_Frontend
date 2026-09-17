import React, { useState, useEffect } from "react";
import { SupportHero } from "@/components/support/SupportHero";
import { QuickActionGrid } from "@/components/support/QuickActionGrid";
import { SmartSupportSearch } from "@/components/support/SmartSupportSearch";
import { DeviceSelector } from "@/components/support/DeviceSelector";
import { ServiceCenterLocator } from "@/components/support/ServiceCenterLocator";
import { RepairTracker } from "@/components/support/RepairTracker";
import { WarrantyCheck } from "@/components/support/WarrantyCheck";
import { SupportContactChannels } from "@/components/support/SupportContactChannels";
import { RepairProcessRoadmap } from "@/components/support/RepairProcessRoadmap";
import { DataPrivacySection } from "@/components/support/DataPrivacySection";
import { CriticalSafetyNotice } from "@/components/support/CriticalSafetyNotice";
import { SupportFAQ } from "@/components/support/SupportFAQ";
import { DownloadableResources } from "@/components/support/DownloadableResources";

export function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeviceName, setSelectedDeviceName] = useState<string | null>(null);

  // SEO Page Title and Meta description
  useEffect(() => {
    document.title = "Customer Support & Official Service Portal | SiOL";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Official SiOL customer support portal. Find authorized service centers across India, track active device repairs, check 1-year limited warranty, or get in-person diagnostics.",
      );
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const el = document.getElementById("troubleshooting");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleQuickTopicClick = (topic: string) => {
    setSearchQuery(topic);
    const el = document.getElementById("troubleshooting");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectAction = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. Support Hero with Main Search Bar & Quick Links */}
      <SupportHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onQuickTopicClick={handleQuickTopicClick}
      />

      {/* 2. Critical Battery / Thermal Safety Notice */}
      <CriticalSafetyNotice />

      {/* 3. Quick Support Actions (8 Action Grid) */}
      <QuickActionGrid onSelectAction={handleSelectAction} />

      {/* 4. Smart Interactive Troubleshooting / Symptom Diagnostics */}
      <SmartSupportSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 5. Model-Specific Device Selector */}
      <DeviceSelector onDeviceSelected={(name) => setSelectedDeviceName(name)} />

      {/* 6. Authorized Service Center Finder (Cities & PINs) */}
      <ServiceCenterLocator />

      {/* 7. Real-Time Repair Status Tracker (SR-89214 Demo) */}
      <RepairTracker />

      {/* 8. Warranty & Coverage Verification */}
      <WarrantyCheck />

      {/* 9. Visual Step-by-Step Repair Process Roadmap */}
      <RepairProcessRoadmap />

      {/* 10. Data Privacy & Maintenance Mode Security Safeguards */}
      <DataPrivacySection />

      {/* 11. Human Support Contact Channels with Live Status */}
      <SupportContactChannels />

      {/* 12. Categorized Interactive FAQs */}
      <SupportFAQ />

      {/* 13. Downloadable Official Manuals & SAR Declarations */}
      <DownloadableResources />
    </div>
  );
}

export default SupportPage;
