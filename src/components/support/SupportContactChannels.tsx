import { useState, useEffect } from "react";
import {
  Phone,
  MessageSquare,
  Mail,
  Store,
  Clock,
  ExternalLink,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUPPORT_CONFIG, isSupportLiveNow } from "@/config/support";

export function SupportContactChannels() {
  const [liveStatus, setLiveStatus] = useState(isSupportLiveNow());

  // Update status every 60 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveStatus(isSupportLiveNow());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="contact-support" className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Live Operational Status Badge */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold transition-colors">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                liveStatus.isLive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
              }`}
            />
            <span className={liveStatus.isLive ? "text-emerald-700 font-semibold" : "text-slate-600"}>
              {liveStatus.message}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Need to Talk to Our Support Team?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Choose the contact channel that works best for you. Our certified smartphone technical engineers are ready to assist with software, repairs, or warranty questions.
          </p>
        </div>

        {/* 4 Official Contact Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* 1. Phone Support */}
          <div className="flex flex-col justify-between rounded-2xl bg-slate-50/80 p-6 border border-slate-200/80 hover:border-primary/40 hover:bg-white hover:shadow-lg transition-all duration-300">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Toll-Free Helpline
                </h3>
                <p className="text-xs text-slate-500">
                  Direct phone support with technical hardware specialists.
                </p>
                <p className="font-mono text-sm font-bold text-slate-900 pt-1">
                  {SUPPORT_CONFIG.helplineFormatted}
                </p>
              </div>
              <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Mon – Sat, 9:00 AM – 8:00 PM IST</span>
              </div>
            </div>

            <div className="pt-6">
              <Button
                asChild
                className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs"
              >
                <a href={`tel:${SUPPORT_CONFIG.helpline.replace(/\s+/g, "")}`}>
                  <Phone className="h-3.5 w-3.5 mr-1.5" />
                  <span>Call Toll Free</span>
                </a>
              </Button>
            </div>
          </div>

          {/* 2. WhatsApp Official Chat */}
          <div className="flex flex-col justify-between rounded-2xl bg-slate-50/80 p-6 border border-slate-200/80 hover:border-emerald-500/40 hover:bg-white hover:shadow-lg transition-all duration-300">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  WhatsApp Support Desk
                </h3>
                <p className="text-xs text-slate-500">
                  Chat directly with support representatives, send photos of damage, or get troubleshooting steps.
                </p>
                <p className="font-mono text-sm font-bold text-slate-900 pt-1">
                  {SUPPORT_CONFIG.whatsappNumber}
                </p>
              </div>
              <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Instant response during open hours</span>
              </div>
            </div>

            <div className="pt-6">
              <Button
                asChild
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
              >
                <a
                  href={SUPPORT_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </Button>
            </div>
          </div>

          {/* 3. Email Support */}
          <div className="flex flex-col justify-between rounded-2xl bg-slate-50/80 p-6 border border-slate-200/80 hover:border-indigo-500/40 hover:bg-white hover:shadow-lg transition-all duration-300">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Official Email Desk
                </h3>
                <p className="text-xs text-slate-500">
                  For warranty claims, corporate fleets, and escalated after-sales inquiries.
                </p>
                <p className="font-mono text-sm font-bold text-slate-900 pt-1">
                  {SUPPORT_CONFIG.supportEmail}
                </p>
              </div>
              <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Typical response within 12 hours</span>
              </div>
            </div>

            <div className="pt-6">
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl border-slate-300 text-slate-900 hover:bg-slate-100 text-xs font-bold"
              >
                <a href={`mailto:${SUPPORT_CONFIG.supportEmail}?subject=Support%20Inquiry%20-%20SiOL%20Device`}>
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  <span>Send Email</span>
                </a>
              </Button>
            </div>
          </div>

          {/* 4. In-Person Lounge Visit */}
          <div className="flex flex-col justify-between rounded-2xl bg-slate-50/80 p-6 border border-slate-200/80 hover:border-primary/40 hover:bg-white hover:shadow-lg transition-all duration-300">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600">
                <Store className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Visit Flagship Lounge
                </h3>
                <p className="text-xs text-slate-500">
                  Walk in for espresso coffee, live device diagnostics, and 1-hour fast-track screen service.
                </p>
                <p className="text-xs font-bold text-slate-700 pt-1">
                  Mumbai • Delhi • Bengaluru • Pune
                </p>
              </div>
              <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Open 7 days a week</span>
              </div>
            </div>

            <div className="pt-6">
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl border-slate-300 text-slate-900 hover:bg-slate-100 text-xs font-bold"
              >
                <a href="#service-centers">
                  <Store className="h-3.5 w-3.5 mr-1.5" />
                  <span>View Lounges</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Operational Schedule & Holiday Notice Box */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-700">
              <Clock className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-900">
                Regular Support Schedule (IST)
              </p>
              <p className="text-slate-600">
                Monday to Saturday: 09:00 AM – 08:00 PM • Flagship Lounges open 7 days: 10:00 AM – 08:30 PM
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span>24/7 Automated IMEI &amp; Repair Status lookup always available online</span>
          </div>
        </div>
      </div>
    </section>
  );
}
