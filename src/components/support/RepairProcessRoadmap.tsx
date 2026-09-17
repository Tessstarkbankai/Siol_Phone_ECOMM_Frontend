import {
  CalendarCheck,
  Stethoscope,
  Wrench,
  CheckCircle2,
  PackageCheck,
  ShieldAlert,
} from "lucide-react";

export function RepairProcessRoadmap() {
  const steps = [
    {
      step: "01",
      title: "Book or Walk In",
      description: "Book an appointment online, request insured courier pickup, or walk directly into any official Flagship Lounge.",
      icon: CalendarCheck,
      details: "Immediate intake & digital job card",
    },
    {
      step: "02",
      title: "40-Point Diagnosis",
      description: "Our certified technicians run automated diagnostic scans on motherboard circuits, battery health, and optical sensors.",
      icon: Stethoscope,
      details: "Transparent price quote before starting",
    },
    {
      step: "03",
      title: "Genuine Factory Repair",
      description: "Repairs are conducted in ESD-safe cleanroom environments using 100% genuine factory components and OEM thermal pastes.",
      icon: Wrench,
      details: "Zero compromise on hardware longevity",
    },
    {
      step: "04",
      title: "Quality & Pressure Test",
      description: "The phone undergoes biometric optical recalibration and vacuum pressure chamber testing to restore IP68 water sealing.",
      icon: CheckCircle2,
      details: "Certified water & dust seal restored",
    },
    {
      step: "05",
      title: "Return with 90-Day Warranty",
      description: "Collect your smartphone sealed in a tamper-evident protective pouch, complete with an official 90-day parts warranty certificate.",
      icon: PackageCheck,
      details: "Peace-of-mind guarantee included",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Standardized Service Protocol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            How Our Repair Process Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From initial intake to final quality sign-off, experience a transparent, factory-grade service standard at every milestone.
          </p>
        </div>

        {/* 5-Step Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 border border-slate-200 shadow-xs hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-slate-200 group-hover:text-primary/40 transition-colors">
                      {item.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Micro Detail Pill */}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-primary">
                    ✓ {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
