import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Search } from "lucide-react";
import { SUPPORT_FAQS } from "@/config/support";
import type { FAQItem } from "@/types/support";

export function SupportFAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("Getting Started");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState("");

  const categories = [
    "Getting Started",
    "Battery & Power",
    "Display & Repairs",
    "Warranty & Coverage",
    "Software & Security",
  ];

  const filteredFaqs = SUPPORT_FAQS.filter((item: FAQItem) => {
    const matchesCategory = item.category === activeCategory;
    if (!faqSearch.trim()) return matchesCategory;

    const q = faqSearch.toLowerCase().trim();
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
    );
  });

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/60 px-3 py-1 text-xs font-medium text-[#1d1d1f]">
            <HelpCircle className="h-3.5 w-3.5 text-[#0071e3]" />
            <span>Answers and Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] font-normal leading-relaxed">
            Quick answers to common questions about repairs, warranty, and service.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#1d1d1f] text-white shadow-sm"
                  : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e5e5ea] border border-[#d2d2d7]/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordions List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-primary/40 bg-slate-50/50 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-5 text-left cursor-pointer transition"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <div className="shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-slate-100 text-slate-600">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 rounded-2xl bg-slate-50 border border-slate-200 p-5 text-center space-y-2">
          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            Didn&apos;t find the answer you were looking for?
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-bold text-primary">
            <a href="#contact-support" className="hover:underline">
              Contact Care Desk →
            </a>
            <span className="text-slate-300">•</span>
            <a href="#service-centers" className="hover:underline">
              Locate Nearest Service Hub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
