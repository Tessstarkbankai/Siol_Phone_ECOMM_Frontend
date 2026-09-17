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
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-200/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
            <FileCheck className="h-3.5 w-3.5 text-primary" />
            <span>Official Documentation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Manuals &amp; Technical Documents
          </h2>
          <p className="text-sm text-slate-600">
            Download comprehensive user manuals, SAR compliance test results, and official warranty declaration booklets in PDF format.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DOWNLOADABLE_MANUALS.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col justify-between rounded-2xl bg-white p-5 border border-slate-200 shadow-xs hover:shadow-lg hover:border-primary/40 transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    PDF • {doc.fileSize}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {doc.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mt-1 line-clamp-2">
                    {doc.title}
                  </h3>
                </div>

                <div className="text-[11px] text-slate-500 space-y-0.5">
                  <p>Language: {doc.language}</p>
                  <p>Edition: {doc.updatedAt}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(doc.title)}
                  className="w-full text-xs font-semibold rounded-xl border-slate-300 hover:bg-slate-50 flex items-center justify-center gap-1.5"
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
