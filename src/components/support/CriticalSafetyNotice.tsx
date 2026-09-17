import { AlertTriangle, Phone, ShieldAlert, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUPPORT_CONFIG } from "@/config/support";

export function CriticalSafetyNotice() {
  return (
    <section className="py-10 bg-amber-50/50 border-b border-amber-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-amber-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Critical Battery &amp; Thermal Safety Advisory
                </h3>
                <p className="text-xs text-slate-600">
                  Important safety measures for swollen batteries, extreme heat warnings, or liquid ingress.
                </p>
              </div>
            </div>

            <Button
              asChild
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-xs"
            >
              <a href={`tel:${SUPPORT_CONFIG.helpline.replace(/\s+/g, "")}`}>
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                <span>Urgent Helpline: {SUPPORT_CONFIG.helplineFormatted}</span>
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            {/* Immediate DO's */}
            <div className="space-y-2 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
              <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
                Immediate Recommended Actions
              </span>
              <ul className="space-y-1.5 leading-relaxed text-slate-700 pl-1">
                <li>• Disconnect all charging cables immediately and power off the device.</li>
                <li>• Place the phone in a well-ventilated, cool area on a non-flammable surface.</li>
                <li>• Bring the device directly to your nearest authorized SiOL service center for safe battery isolation.</li>
              </ul>
            </div>

            {/* Immediate DON'Ts */}
            <div className="space-y-2 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
              <span className="font-bold text-rose-900 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                <X className="h-4 w-4 text-rose-600 stroke-[3]" />
                What NOT to Do
              </span>
              <ul className="space-y-1.5 leading-relaxed text-slate-700 pl-1">
                <li>• <strong>Do not</strong> attempt to press down, puncture, or open an expanded back glass panel.</li>
                <li>• <strong>Do not</strong> plug the device back into wall chargers, power banks, or wireless pads.</li>
                <li>• <strong>Do not</strong> submerge water-damaged devices in uncooked rice; this causes port corrosion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
