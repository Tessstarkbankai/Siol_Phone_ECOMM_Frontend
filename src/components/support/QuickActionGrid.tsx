import {
  MapPin,
  Wrench,
  ShieldCheck,
  PhoneCall,
  BookOpen,
  Cpu,
  BatteryCharging,
  Smartphone,
  ArrowRight,
} from "lucide-react";

interface QuickActionGridProps {
  onSelectAction: (targetId: string) => void;
}

export function QuickActionGrid({ onSelectAction }: QuickActionGridProps) {
  const actions = [
    {
      id: "service-centers",
      title: "Find a Service Center",
      description: "Locate authorized walk-in service hubs near you with certified diagnostic cleanrooms.",
      icon: MapPin,
      badge: "Walk-in & Appointments",
      actionText: "Locate Center",
      colorClass: "bg-blue-500/10 text-blue-600 border-blue-200/50",
    },
    {
      id: "track-repair",
      title: "Track Your Repair",
      description: "Check the live milestone status of your device from intake to pickup or courier return.",
      icon: Wrench,
      badge: "Real-time Tracker",
      actionText: "Track Request",
      colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-200/50",
    },
    {
      id: "warranty",
      title: "Warranty & Protection",
      description: "Understand your 1-year standard hardware warranty, battery coverage, and accidental terms.",
      icon: ShieldCheck,
      badge: "1-Year Coverage",
      actionText: "Check Terms",
      colorClass: "bg-indigo-500/10 text-indigo-600 border-indigo-200/50",
    },
    {
      id: "contact-support",
      title: "Contact Customer Care",
      description: "Reach our dedicated technical specialists via toll-free helpline, WhatsApp, or email desk.",
      icon: PhoneCall,
      badge: "Mon – Sat 9AM-8PM",
      actionText: "Contact Us",
      colorClass: "bg-violet-500/10 text-violet-600 border-violet-200/50",
    },
    {
      id: "manuals",
      title: "User Manuals & Guides",
      description: "Download official user guides, camera manuals, and data migration instructions.",
      icon: BookOpen,
      badge: "PDF Downloads",
      actionText: "View Manuals",
      colorClass: "bg-sky-500/10 text-sky-600 border-sky-200/50",
    },
    {
      id: "software-updates",
      title: "Software & System Updates",
      description: "Check official Android OS rollout schedules, security patches, and changelogs.",
      icon: Cpu,
      badge: "OTA Information",
      actionText: "Update Guide",
      colorClass: "bg-amber-500/10 text-amber-600 border-amber-200/50",
    },
    {
      id: "battery-power",
      title: "Battery & Charging Care",
      description: "Battery health degradation guidelines, fast-charging safety, and replacement pricing.",
      icon: BatteryCharging,
      badge: "Health Diagnostics",
      actionText: "Battery Care",
      colorClass: "bg-teal-500/10 text-teal-600 border-teal-200/50",
    },
    {
      id: "screen-service",
      title: "Screen & Hardware Repairs",
      description: "Factory original AMOLED screen modules with pressure-sealed IP68 water resistance.",
      icon: Smartphone,
      badge: "100% Genuine Parts",
      actionText: "Hardware Service",
      colorClass: "bg-rose-500/10 text-rose-600 border-rose-200/50",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Quick Support Actions
          </h2>
          <p className="text-sm text-slate-600">
            Select a service category to resolve issues, book appointments, or verify device status.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {actions.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectAction(item.id)}
                className="group relative flex flex-col justify-between text-left p-5 sm:p-6 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-primary/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border ${item.colorClass} transition-transform group-hover:scale-110 duration-300`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-white border border-slate-200/80 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>{item.actionText}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
