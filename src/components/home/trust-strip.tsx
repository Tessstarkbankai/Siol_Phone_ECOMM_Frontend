import { Award, CheckCircle2, Star, Truck, Users } from "lucide-react";

export function TrustStrip() {
  const stats = [
    {
      icon: Award,
      value: "Official Brand Sealed",
      title: "100% Genuine & IMEI Verified",
      desc: "Direct Apple & Samsung brand warranty",
    },
    {
      icon: Users,
      value: "Instant Trade-In",
      title: "Up to ₹25,000 Exchange Value",
      desc: "Doorstep evaluation & pickup",
    },
    {
      icon: Truck,
      value: "No-Cost EMI",
      title: "0% Interest up to 24 Months",
      desc: "Starting at ₹2,499/mo across all banks",
    },
    {
      icon: Star,
      value: "Screen Protection",
      title: "1-Yr Free Damage Cover",
      desc: "Complimentary on all flagship orders",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50/40 via-white to-blue-50/40 border-y border-blue-100/70 shadow-xs mb-8">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-primary border border-blue-200/50 shadow-2xs">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">
                    {stat.title}
                  </p>
                  <p className="text-xs text-slate-500">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
