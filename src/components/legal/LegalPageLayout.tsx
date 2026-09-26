import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export interface LegalSection {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  heroImage: string;
  lastUpdated: string;
  sections: LegalSection[];
  children: React.ReactNode;
}

const POLICY_NAV_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Return Policy", href: "/return-policy" },
];

export function LegalPageLayout({
  title,
  subtitle,
  eyebrow,
  heroImage,
  lastUpdated,
  sections,
  children,
}: LegalPageLayoutProps) {
  const location = useLocation();
  const [activeSectionId, setActiveSectionId] = useState<string>(
    sections[0]?.id || ""
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveSectionId(sections[i].id);
            return;
          }
        }
      }

      if (sections.length > 0) {
        setActiveSectionId(sections[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const yOffset = -75;
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1d1d1f] font-sans antialiased selection:bg-[#0071e3]/10 selection:text-[#0071e3]">
      {/* Sub-navigation bar across all policy pages */}
      <nav
        aria-label="Legal policies"
        className="sticky top-0 z-30 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#e5e5e7]"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-12 overflow-x-auto scrollbar-none">
            <span className="text-[12px] font-medium uppercase tracking-wider text-[#86868b] shrink-0 mr-6 hidden sm:inline">
              Legal & Policies
            </span>
            <div className="flex items-center space-x-6 sm:space-x-8 text-[13px] whitespace-nowrap">
              {POLICY_NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`transition-colors py-1 ${
                      isActive
                        ? "text-[#0071e3] font-medium"
                        : "text-[#6e6e73] hover:text-[#1d1d1f]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner at Start of Section - Clean Pure Image Only (No Text, No Dark Overlay, No Cropping) */}
      <section className="relative w-full bg-[#f8f9fa] border-b border-[#e5e5e7]">
        <div className="w-full flex items-center justify-center">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-auto block select-none"
          />
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-28 sm:pb-36">
        {/* Mobile Section Jump Bar */}
        <div className="lg:hidden sticky top-12 z-20 -mx-6 sm:-mx-8 px-6 sm:px-8 py-3 bg-[#ffffff]/95 backdrop-blur-md border-b border-[#e5e5e7] mb-10 overflow-x-auto scrollbar-none flex gap-5 text-[13px] whitespace-nowrap">
          {sections.map((section) => {
            const isActive = activeSectionId === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(section.id)}
                className={`transition-colors cursor-pointer text-left ${
                  isActive
                    ? "text-[#0071e3] font-medium"
                    : "text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                {section.title}
              </button>
            );
          })}
        </div>

        {/* Two-Column Layout (Desktop Sticky Nav + Constrained Reading Column) */}
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16 xl:gap-24 items-start">
          {/* Desktop Sticky In-Page Nav */}
          <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-4 scrollbar-none">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b] mb-4">
              On This Page
            </p>
            <ul className="space-y-3 text-[13px] border-l border-[#e5e5e7]">
              {sections.map((section) => {
                const isActive = activeSectionId === section.id;
                return (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left pl-4 -ml-[1px] transition-colors cursor-pointer leading-snug py-0.5 ${
                        isActive
                          ? "text-[#0071e3] font-medium border-l-2 border-[#0071e3]"
                          : "text-[#6e6e73] hover:text-[#1d1d1f] border-l-2 border-transparent"
                      }`}
                    >
                      {section.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Editorial Reading Column */}
          <main className="max-w-[700px] w-full">
            <h1 className="sr-only">{title}</h1>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

interface LegalSectionBlockProps {
  id: string;
  title: string;
  summary: string;
  children: React.ReactNode;
  isFirst?: boolean;
}

export function LegalSectionBlock({
  id,
  title,
  summary,
  children,
  isFirst = false,
}: LegalSectionBlockProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 ${
        isFirst ? "pb-14 sm:pb-18" : "pt-12 sm:pt-16 pb-14 sm:pb-18 border-t border-[#e5e5e7]"
      }`}
    >
      <h2 className="text-2xl sm:text-[26px] font-semibold tracking-tight text-[#1d1d1f] leading-snug mb-3">
        {title}
      </h2>
      <p className="text-[17px] sm:text-[18px] text-[#1d1d1f] font-normal leading-relaxed mb-4">
        {summary}
      </p>
      <div className="text-[15px] sm:text-[16px] text-[#424245] leading-[1.75] space-y-4 font-normal">
        {children}
      </div>
    </section>
  );
}
