import { FileText, Download, FileCheck, ArrowDownToLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOWNLOADABLE_MANUALS } from "@/config/support";

export function DownloadableResources() {
  const handleDownload = (title: string) => {
    // In real production, triggers blob or signed URL download
    alert(`Downloading ${title}... Document will open in a new tab.`);
  };

  return (
    <section id="manuals" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/60 px-3 py-1 text-xs font-medium text-[#1d1d1f]">
            <FileCheck className="h-3.5 w-3.5 text-[#0071e3]" />
            <span>Documentation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
            Manuals, Specs, and Downloads
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] font-normal leading-relaxed">
            Find technical specifications, user guides, regulatory compliance documents, and official warranty information.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DOWNLOADABLE_MANUALS.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between rounded-2xl bg-white p-5 border border-[#d2d2d7]/70 shadow-xs hover:shadow-md hover:border-[#0071e3]/60 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7] text-[#1d1d1f]">
                    <FileText className="h-5 w-5 text-[#0071e3]" />
                  </div>
                  <span className="font-mono text-[10px] font-medium text-[#86868b] bg-[#f5f5f7] px-2 py-0.5 rounded">
                    PDF • {doc.fileSize}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0071e3]">
                    {doc.category}
                  </span>
                  <h3 className="text-sm font-semibold text-[#1d1d1f] leading-snug mt-1 line-clamp-2">
                    {doc.title}
                  </h3>
                </div>

                <div className="text-[11px] text-[#86868b] space-y-0.5">
                  <p>Language: {doc.language}</p>
                  <p>Edition: {doc.updatedAt}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(doc.title)}
                  className="w-full text-xs font-medium rounded-xl border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] flex items-center justify-center gap-1.5"
                >
                  <ArrowDownToLine className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
