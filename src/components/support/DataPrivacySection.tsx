import {
  Lock,
  HardDrive,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export function DataPrivacySection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-10 md:p-14 overflow-hidden relative shadow-2xl">
          {/* Subtle Ambient light */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Privacy Manifesto */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3.5 py-1 text-xs font-medium text-white">
                <Lock className="h-3.5 w-3.5 text-[#0071e3]" />
                <span>Privacy and Security</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-white leading-tight">
                Prepare your device for service.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Your personal data stays safe. Before you send or bring your device in for repair, our built-in <strong>Maintenance Mode</strong> isolates personal files—keeping photos, chats, messages, and accounts locked behind your PIN while granting technicians access only to diagnostic tools.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>No password sharing needed</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Secure hardware diagnostics</span>
                </span>
              </div>
            </div>

            {/* Right Column: 3 Mandatory Pre-Repair Safeguard Steps */}
            <div className="lg:col-span-6 space-y-3.5">
              <h3 className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Steps before service
              </h3>

              {/* Step 1 */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5 flex items-start gap-3.5 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0071e3]/20 text-[#0071e3]">
                  <HardDrive className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">
                    1. Back up your device
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Back up your data to the cloud or your computer so you can easily restore your photos, messages, and settings if your device requires a system reset.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5 flex items-start gap-3.5 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-sky-400">
                  <Lock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">
                    2. Turn on Maintenance Mode
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Go to Settings &gt; Privacy &amp; Security &gt; Maintenance Mode. Technicians can test the display, battery, and cameras without accessing your personal information.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5 flex items-start gap-3.5 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">
                    3. Remove accessories and SIM card
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Remove your physical SIM card, memory card, protective case, and any accessories before handing over your device for service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
