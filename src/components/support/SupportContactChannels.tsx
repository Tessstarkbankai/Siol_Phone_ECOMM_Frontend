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
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d2d2d7]/60 bg-[#f5f5f7] px-4 py-1.5 text-xs font-medium transition-colors">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                liveStatus.isLive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
              }`}
            />
            <span className={liveStatus.isLive ? "text-emerald-700 font-medium" : "text-[#86868b]"}>
              {liveStatus.message}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
            Connect with us.
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] max-w-2xl mx-auto font-normal leading-relaxed">
            Choose how you&apos;d like to get help. We&apos;re here to assist you by phone, chat, email, or in person.
          </p>
        </div>

        {/* 4 Official Contact Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* 1. Phone Support */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-[#d2d2d7]/70 hover:border-[#0071e3]/60 hover:shadow-lg transition-all duration-300">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-[#0071e3]">
                <Phone className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#1d1d1f]">
                  Call Us
                </h3>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  Speak directly with a certified technical support specialist.
                </p>
                <p className="font-mono text-sm font-semibold text-[#1d1d1f] pt-1">
                  {SUPPORT_CONFIG.helplineFormatted}
                </p>
              </div>
              <div className="text-[11px] text-[#86868b] pt-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Mon – Sat, 9:00 AM – 8:00 PM IST</span>
              </div>
            </div>

            <div className="pt-6">
              <Button
                asChild
                className="w-full rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium shadow-xs"
              >
                <a href={`tel:${SUPPORT_CONFIG.helpline.replace(/\s+/g, "")}`}>
                  <Phone className="h-3.5 w-3.5 mr-1.5" />
                  <span>Call Now</span>
                </a>
              </Button>
            </div>
          </div>

          {/* 2. WhatsApp Official Chat */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-[#d2d2d7]/70 hover:border-emerald-500/60 hover:shadow-lg transition-all duration-300">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#1d1d1f]">
                  Chat with a Specialist
                </h3>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  Get quick answers and guidance from a dedicated support representative.
                </p>
                <p className="font-mono text-sm font-semibold text-[#1d1d1f] pt-1">
                  {SUPPORT_CONFIG.whatsappNumber}
                </p>
              </div>
              <div className="text-[11px] text-[#86868b] pt-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Instant response during business hours</span>
              </div>
            </div>

            <div className="pt-6">
              <Button
                asChild
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium shadow-xs"
              >
                <a
                  href={SUPPORT_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Start Chat</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </a>
              </Button>
            </div>
          </div>

          {/* 3. Email Support */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-[#d2d2d7]/70 hover:border-indigo-500/60 hover:shadow-lg transition-all duration-300">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600">
                <Mail className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#1d1d1f]">
                  Email Support
                </h3>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  Send us your question or request and our technical team will reply promptly.
                </p>
                <p className="font-mono text-sm font-semibold text-[#1d1d1f] pt-1">
                  {SUPPORT_CONFIG.supportEmail}
                </p>
              </div>
              <div className="text-[11px] text-[#86868b] pt-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>Typical response within 12 hours</span>
              </div>
            </div>

            <div className="pt-6">
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-xs font-medium"
              >
                <a href={`mailto:${SUPPORT_CONFIG.supportEmail}?subject=Support%20Inquiry%20-%20SiOL%20Device`}>
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  <span>Send Email</span>
                </a>
              </Button>
            </div>
          </div>

          {/* 4. In-Person Lounge Visit */}
          <div className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-[#d2d2d7]/70 hover:border-[#0071e3]/60 hover:shadow-lg transition-all duration-300">
            <div className="space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600">
                <Store className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-[#1d1d1f]">
                  Authorized Service Provider
                </h3>
                <p className="text-xs text-[#86868b] leading-relaxed">
                  Find an authorized location to bring your device in for certified diagnostics and repairs.
                </p>
                <p className="text-xs font-semibold text-[#1d1d1f] pt-1">
                  Mumbai • Delhi • Bengaluru • Pune
                </p>
              </div>
              <div className="text-[11px] text-[#86868b] pt-1 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Open 7 days a week</span>
              </div>
            </div>

            <div className="pt-6">
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl border-[#d2d2d7] text-[#1d1d1f] hover:bg-[#f5f5f7] text-xs font-medium"
              >
                <a href="#service-centers">
                  <Store className="h-3.5 w-3.5 mr-1.5" />
                  <span>Find a Location</span>
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
