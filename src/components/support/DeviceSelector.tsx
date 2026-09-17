import { useState, useEffect } from "react";
import { Smartphone, Check, ArrowRight, RefreshCw, Cpu, ShieldCheck } from "lucide-react";
import { getCustomerProducts } from "@/features/customer/products/api";
import type { CustomerProduct } from "@/features/customer/products/types";

interface DeviceSelectorProps {
  onDeviceSelected?: (deviceTitle: string) => void;
}

// Fallback flagship device list matching the store's flagship lineup
const FALLBACK_DEVICES = [
  {
    _id: "dev-1",
    title: "SiOL Find X Ultra 5G",
    brand: "SiOL",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
    tier: "Flagship Ultra",
    chipset: "Snapdragon 8 Elite • Hasselblad Optics",
  },
  {
    _id: "dev-2",
    title: "SiOL Find N3 Fold 5G",
    brand: "SiOL",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop",
    tier: "Foldable Flagship",
    chipset: "Flexion Hinge • Dual 120Hz LTPO",
  },
  {
    _id: "dev-3",
    title: "SiOL Reno 12 Pro 5G",
    brand: "SiOL",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    tier: "Portrait Master",
    chipset: "Dimensity 9300 • AI Eraser 2.0",
  },
  {
    _id: "dev-4",
    title: "SiOL Pad 2 Ultra Edition",
    brand: "SiOL",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop",
    tier: "Ecosystem Tablet",
    chipset: "3K 144Hz Display • 9510mAh Battery",
  },
];

export function DeviceSelector({ onDeviceSelected }: DeviceSelectorProps) {
  const [devices, setDevices] = useState<any[]>(FALLBACK_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCatalog() {
      try {
        setLoading(true);
        const res = await getCustomerProducts({ sort: "recent" });
        if (res && res.length > 0) {
          const mapped = res.slice(0, 4).map((p: CustomerProduct) => ({
            _id: p._id,
            title: p.title,
            brand: p.brand || "SiOL",
            image: p.images?.[0]?.url || FALLBACK_DEVICES[0].image,
            tier: p.brand ? `${p.brand} Series` : "Flagship Series",
            chipset: p.sizes?.[0] ? `${p.sizes[0]} Storage Tier` : "Flagship Processor",
          }));
          setDevices(mapped);
        }
      } catch {
        // Fallback to official brand catalog items
        setDevices(FALLBACK_DEVICES);
      } finally {
        setLoading(false);
      }
    }

    void loadCatalog();
  }, []);

  const handleSelect = (title: string) => {
    setSelectedDevice(title);
    if (onDeviceSelected) onDeviceSelected(title);
  };

  return (
    <section id="device-select" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Smartphone className="h-4 w-4" />
              <span>Model-Specific Diagnostics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Select Your Smartphone
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Choose your device to see calibrated troubleshooting, parts pricing, user manuals, and tailored repair instructions.
            </p>
          </div>

          {selectedDevice && (
            <button
              type="button"
              onClick={() => setSelectedDevice(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Clear selection</span>
            </button>
          )}
        </div>

        {/* Device Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {devices.map((device) => {
            const isSelected = selectedDevice === device.title;

            return (
              <div
                key={device._id}
                onClick={() => handleSelect(device.title)}
                className={`group relative flex flex-col justify-between rounded-2xl p-5 border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "border-primary bg-blue-50/40 ring-2 ring-primary/20 shadow-md"
                    : "border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {/* Active check pill */}
                {isSelected && (
                  <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow-xs">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Device Image Container */}
                <div className="relative h-44 w-full flex items-center justify-center overflow-hidden rounded-xl bg-white p-3 mb-4">
                  <img
                    src={device.image}
                    alt={device.title}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 select-none"
                  />
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <Cpu className="h-3 w-3 text-primary" />
                    <span>{device.tier}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                    {device.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {device.chipset}
                  </p>
                </div>

                {/* Action button */}
                <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? "text-primary font-bold" : "text-slate-700"}>
                    {isSelected ? "Model Active" : "Get Support"}
                  </span>
                  <ArrowRight
                    className={`h-3.5 w-3.5 transition-transform ${
                      isSelected ? "text-primary translate-x-1" : "text-slate-400 group-hover:translate-x-1"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Device Support Banner */}
        {selectedDevice && (
          <div className="mt-8 rounded-2xl bg-slate-900 text-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sky-400 border border-white/10">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
                  Active Device Selection
                </p>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Support &amp; Warranty Guidelines for {selectedDevice}
                </h4>
                <p className="text-xs text-slate-300">
                  Eligible for 1-hour fast-track service at all SiOL Flagship Lounges.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="#service-centers"
                className="w-full sm:w-auto text-center rounded-xl bg-white text-slate-950 px-4 py-2.5 text-xs font-bold hover:bg-slate-100 transition shadow-sm"
              >
                Book Inspection
              </a>
              <a
                href="#manuals"
                className="w-full sm:w-auto text-center rounded-xl border border-white/20 bg-white/5 text-white px-4 py-2.5 text-xs font-semibold hover:bg-white/10 transition"
              >
                Manuals
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
