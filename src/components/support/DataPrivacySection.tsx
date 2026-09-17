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
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3.5 py-1 text-xs font-semibold text-sky-400">
                <Lock className="h-3.5 w-3.5" />
                <span>Zero Compromise on Customer Privacy</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                Your Personal Data Stays in Your Hands.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Before handing over your device for repair, our operating system offers built-in <strong>Maintenance Mode</strong>. This creates an isolated sandbox that grants technicians access only to basic hardware test tools—keeping your photos, chats, messages, and biometric credentials completely locked behind your private PIN.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>No password sharing needed</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>ISO-27001 cleanroom certified</span>
                </span>
              </div>
            </div>

            {/* Right Column: 3 Mandatory Pre-Repair Safeguard Steps */}
            <div className="lg:col-span-6 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Essential Steps Before Handing Over Your Device
              </h3>

              {/* Step 1 */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5 flex items-start gap-3.5 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-sky-400">
                  <Lock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    1. Enable &ldquo;Maintenance Mode&rdquo;
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Settings &gt; Privacy &amp; Security &gt; Maintenance Mode &gt; Turn On. Technicians will run screen, speaker, and camera tests without seeing your personal files.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5 flex items-start gap-3.5 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <HardDrive className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    2. Back Up Important Photos &amp; WhatsApp
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    While motherboards are preserved whenever possible, board-level micro-soldering may require a factory reset. Always sync to Google One or local PC before check-in.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-5 flex items-start gap-3.5 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">
                    3. Remove SIM Card &amp; External Accessories
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Eject physical SIM trays, remove SD cards, and detach magnetic wallet attachments or protective third-party cases before handing the phone over.
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
