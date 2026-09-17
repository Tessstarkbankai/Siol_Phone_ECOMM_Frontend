import { useState } from "react";
import {
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { SUPPORT_TOPICS } from "@/config/support";
import type { SupportTopic } from "@/types/support";

interface SmartSupportSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SmartSupportSearch({
  searchQuery,
  setSearchQuery,
}: SmartSupportSearchProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>("battery-drain");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Issues" },
    { id: "battery", label: "Battery & Power" },
    { id: "charging", label: "Charging & Ports" },
    { id: "screen", label: "Display & Touch" },
    { id: "camera", label: "Camera & Optics" },
    { id: "software", label: "OS & Updates" },
    { id: "system", label: "Backup & System" },
  ];

  const filteredTopics = SUPPORT_TOPICS.filter((topic) => {
    const matchesCategory =
      activeCategory === "all" || topic.category === activeCategory;

    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    return (
      topic.title.toLowerCase().includes(q) ||
      topic.summary.toLowerCase().includes(q) ||
      topic.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  const toggleTopic = (id: string) => {
    setSelectedTopicId(selectedTopicId === id ? null : id);
  };

  return (
    <section id="troubleshooting" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Self-Diagnostics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Common Smartphone Troubleshooting
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select your symptom below for verified manufacturer diagnostic steps before booking a repair.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Container */}
        {filteredTopics.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              No troubleshooting guide found for &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Try searching for common terms like &ldquo;battery&rdquo;, &ldquo;charging&rdquo;, or &ldquo;display&rdquo;, or reach out directly to our live support team.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                Reset Search Filters
              </button>
              <span className="text-slate-300">•</span>
              <a
                href="#contact-support"
                className="text-xs font-semibold text-slate-800 hover:text-primary cursor-pointer"
              >
                Contact Support Desk →
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTopics.map((topic: SupportTopic) => {
              const isOpen = selectedTopicId === topic.id;

              return (
                <div
                  key={topic.id}
                  className={`rounded-2xl border transition-all duration-200 bg-white overflow-hidden shadow-xs ${
                    isOpen
                      ? "border-primary/50 ring-2 ring-primary/5"
                      : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    type="button"
                    onClick={() => toggleTopic(topic.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition hover:bg-slate-50/50"
                  >
                    <div className="space-y-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {topic.category}
                        </span>
                        {topic.estimatedFixTime && (
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                            <Clock className="h-3 w-3" />
                            {topic.estimatedFixTime}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {topic.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-1">
                        {topic.summary}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-slate-100 text-slate-600">
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Diagnostic Steps */}
                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:p-6 space-y-5">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          <span>Recommended Resolution Steps</span>
                        </h4>
                        <ol className="space-y-2.5">
                          {topic.steps.map((step, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/70"
                            >
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white text-[10px] font-bold">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Call to action note */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />
                          <span>Issue unresolved after completing these steps?</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <a
                            href="#service-centers"
                            className="font-semibold text-primary hover:underline"
                          >
                            Book Walk-in Inspection →
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
