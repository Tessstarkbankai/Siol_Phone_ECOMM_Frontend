import { Clock, ExternalLink, MapPin, Navigation, Phone, Sparkles, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/ui/globe";

export function StoreLocator() {
  const googleMapsUrl = "https://maps.app.goo.gl/ctr7doUyvwsXoYM26";

  return (
    <section className="pt-6 pb-2 sm:pt-8 sm:pb-4 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-sky-50/70 border border-blue-100/90 shadow-lg shadow-blue-500/5 p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Side: Store Information & Locate Button */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  <Store className="h-3.5 w-3.5" />
                  <span>Flagship Smartphone Lounge</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  Experience Flagships in Person
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Visit our premier experience lounges in Mumbai, Delhi, Bengaluru, and Hyderabad to test 100x zoom cameras, foldable displays, and receive hands-on device setup by certified specialists.
                </p>
              </div>

              {/* Store Details Box */}
              <div className="space-y-4 rounded-2xl bg-white p-5 sm:p-6 border border-blue-100 shadow-sm">
                {/* Store Name & City */}
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-primary border border-blue-200/50">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-base font-black text-slate-900">
                      NEXUS Flagship Experience Center & Tech Hub
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Shop 101-104, Cyber Galleria Mall, High Street Phoenix, Lower Parel, Mumbai
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-blue-50 text-xs">
                  {/* Hours */}
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>Mon - Sun: 10:00 AM – 10:00 PM</span>
                  </div>

                  {/* Contact */}
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>+91 1800 123 4567 (Toll Free)</span>
                  </div>
                </div>
              </div>

              {/* Highlights Strip */}
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-slate-800">
                  📱 Live Camera & Gaming Demos
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-slate-800">
                  ⚡ Instant Trade-in Diagnostics
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-slate-800">
                  🛡️ Same-Day Screen Replacement
                </span>
              </div>

              {/* Locate Now Action Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 rounded-xl shadow-md shadow-primary/25 text-sm"
                >
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Locate Now</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-75" />
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold h-12 px-6 rounded-xl text-sm"
                >
                  <a
                    href="tel:18002660788"
                    className="inline-flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    <span>Call Store</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Side: 3D Interactive Magic UI Globe */}
            <div className="lg:col-span-6 flex items-center justify-center relative">
              <div className="w-full max-w-[480px] relative">
                <Globe className="w-full aspect-square" />
                
                {/* Floating Store Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 border border-neutral-200 shadow-md flex items-center gap-2 pointer-events-none text-xs font-bold text-neutral-800 whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                  <span>35+ Stores Across India • Drag globe to rotate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StoreLocator;
