import { Sparkles } from "lucide-react";

export function SupportTeaserBanner() {
  return (
    <section className="py-12 sm:py-16 my-4 bg-slate-50/60 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-200/80 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#0071e3]">
            <Sparkles className="h-3.5 w-3.5 text-[#0071e3]" />
            <span>Official Service Program</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Upgrade With Ease. Exchange Policy.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Bring your old device to any authorized SiOL service center and step into a better tomorrow.
          </p>
        </div>

        {/* Main Showcase Teaser Card (aspect-[8/3] matches 1600x600 supp.jpg exactly: zero whitespace, zero cropping) */}
        <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 aspect-[8/3] w-full">
          <img
            src="/supp.jpg"
            alt="SiOL Service Center Exchange Policy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
}

export default SupportTeaserBanner;
