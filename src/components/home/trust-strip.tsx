import { Award, CheckCircle2, Star, Truck, Users } from "lucide-react";

export function TrustStrip() {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      title: "Happy Verified Customers",
      desc: "Delivering satisfaction nationwide",
    },
    {
      icon: Award,
      value: "2-Year",
      title: "Comprehensive Warranty",
      desc: "Genuine direct brand coverage",
    },
    {
      icon: Truck,
      value: "Pan-India",
      title: "Free Express Shipping",
      desc: "Dispatched within 24 hours",
    },
    {
      icon: Star,
      value: "4.9 / 5",
      title: "Top-Rated Quality",
      desc: "From 12,000+ customer reviews",
    },
  ];

  return (
    <div className="bg-white border-y border-border/80 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xl font-black tracking-tight text-foreground sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {stat.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
