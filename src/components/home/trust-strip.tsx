import { Award, CheckCircle2, Star, Truck, Users } from "lucide-react";

export function TrustStrip() {
  const stats = [
    {
      icon: Award,
      value: "Official Brand Sealed",
      title: "100% Genuine & IMEI Verified",
      desc: "Direct Apple & Samsung brand warranty",
      gradient: "from-blue-500/10 to-indigo-500/10",
      iconBg: "bg-blue-500/15 text-blue-600",
      borderColor: "border-blue-200/60",
    },
    {
      icon: Users,
      value: "Instant Trade-In",
      title: "Up to ₹25,000 Exchange Value",
      desc: "Doorstep evaluation & pickup",
      gradient: "from-emerald-500/10 to-teal-500/10",
      iconBg: "bg-emerald-500/15 text-emerald-600",
      borderColor: "border-emerald-200/60",
    },
    {
      icon: Truck,
      value: "No-Cost EMI",
      title: "0% Interest up to 24 Months",
      desc: "Starting at ₹2,499/mo across all banks",
      gradient: "from-violet-500/10 to-purple-500/10",
      iconBg: "bg-violet-500/15 text-violet-600",
      borderColor: "border-violet-200/60",
    },
    {
      icon: Star,
      value: "Screen Protection",
      title: "1-Yr Free Damage Cover",
      desc: "Complimentary on all flagship orders",
      gradient: "from-amber-500/10 to-orange-500/10",
      iconBg: "bg-amber-500/15 text-amber-600",
      borderColor: "border-amber-200/60",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50/40 via-white to-blue-50/40 border-y border-blue-100/70 shadow-xs mb-8">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className={`flex items-center gap-3.5 sm:items-start sm:gap-4 rounded-2xl bg-gradient-to-br ${stat.gradient} border ${stat.borderColor} p-3.5 sm:p-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
              >
                <div
                  className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl ${stat.iconBg} shadow-2xs`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm sm:text-lg font-black tracking-tight text-slate-900 leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 leading-tight">
                    {stat.title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-500 leading-tight mt-0.5 hidden sm:block">
                    {stat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
