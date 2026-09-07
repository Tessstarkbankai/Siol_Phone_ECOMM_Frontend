import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Battery,
  Camera,
  Cpu,
  Monitor,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type PhoneModel = {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  chipset: string;
  display: string;
  camera: string;
  zoom: string;
  battery: string;
  ai: string;
  material: string;
  link: string;
};

const COMPARISON_MODELS: PhoneModel[] = [
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    price: "₹1,44,900",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    chipset: "A18 Pro Bionic (3nm)",
    display: "6.9″ Super Retina XDR OLED (120Hz)",
    camera: "48MP Fusion + 48MP Ultra Wide",
    zoom: "5x Optical Telephoto (120mm)",
    battery: "Up to 33 hrs video playback",
    ai: "Apple Intelligence & Siri Live",
    material: "Grade 5 Titanium & Ceramic Shield",
    link: "/collections?brand=Apple",
  },
  {
    id: "galaxy-s25-ultra",
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    price: "₹1,29,999",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    chipset: "Snapdragon 8 Elite for Galaxy",
    display: "6.8″ Dynamic AMOLED 2X (120Hz)",
    camera: "200MP Quad Matrix ProVisual",
    zoom: "100x Space Zoom (5x & 10x Optical)",
    battery: "5,000 mAh with 45W Fast Charging",
    ai: "Galaxy AI & Circle to Search",
    material: "Grade 5 Titanium & Gorilla Armor",
    link: "/collections?brand=Samsung",
  },
  {
    id: "pixel-9-pro-xl",
    name: "Pixel 9 Pro XL",
    brand: "Google",
    price: "₹1,24,999",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=600&q=80",
    chipset: "Google Tensor G4 + Titan M2",
    display: "6.8″ Super Actua LTPO OLED (120Hz)",
    camera: "50MP Octa PD + 48MP Quad PD",
    zoom: "30x Super Res Zoom (5x Optical)",
    battery: "5,060 mAh with 37W Fast Charging",
    ai: "Gemini Live & Magic Audio Eraser",
    material: "Satin Glass & Polished Metal Frame",
    link: "/collections?brand=Google",
  },
  {
    id: "oneplus-13",
    name: "OnePlus 13",
    brand: "OnePlus",
    price: "₹69,999",
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    chipset: "Snapdragon 8 Elite Extreme",
    display: "6.82″ 2K 120Hz Oriental ProXDR",
    camera: "50MP Sony LYT-808 Hasselblad",
    zoom: "3x Periscope Optical (120x Digital)",
    battery: "6,000 mAh Glacier + 100W SUPERVOOC",
    ai: "Trinity Engine & AI Eraser 2.0",
    material: "Micro-arc Oxidation Metal Frame",
    link: "/collections?brand=OnePlus",
  },
];

export function InteractivePhoneCompare() {
  const [selectedLeft, setSelectedLeft] = useState<PhoneModel>(COMPARISON_MODELS[0]);
  const [selectedRight, setSelectedRight] = useState<PhoneModel>(COMPARISON_MODELS[1]);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-blue-50/25 to-white text-slate-900 border-y border-blue-100/70 my-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-200 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Side-by-Side Evaluation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Compare Flagship Power
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Select any two devices to compare chipsets, camera optics, battery endurance, and AI capabilities.
          </p>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Model Column */}
          <div className="rounded-3xl bg-white border border-blue-100 p-6 sm:p-8 space-y-6 shadow-xl shadow-blue-900/5 flex flex-col justify-between hover:border-primary/40 transition-all">
            <div className="space-y-4">
              {/* Select Dropdown */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Device A
                </span>
                <select
                  value={selectedLeft.id}
                  onChange={(e) => {
                    const found = COMPARISON_MODELS.find((m) => m.id === e.target.value);
                    if (found) setSelectedLeft(found);
                  }}
                  className="bg-blue-50/60 border border-blue-200 text-slate-900 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
                >
                  {COMPARISON_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Visual */}
              <div className="h-56 sm:h-64 w-full flex items-center justify-center p-4 rounded-2xl overflow-hidden bg-gradient-to-b from-blue-50/50 to-white border border-blue-100/70">
                <img
                  src={selectedLeft.image}
                  alt={selectedLeft.name}
                  className="max-h-full object-contain filter drop-shadow-md rounded-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">{selectedLeft.name}</h3>
                <p className="text-lg font-black text-primary mt-0.5">{selectedLeft.price}</p>
              </div>

              {/* Specs Rows */}
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Cpu className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Processor</p>
                    <p className="font-bold text-slate-900">{selectedLeft.chipset}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Monitor className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Display</p>
                    <p className="font-bold text-slate-900">{selectedLeft.display}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Camera className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Main Camera</p>
                    <p className="font-bold text-slate-900">{selectedLeft.camera}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Zap className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Zoom & Telephoto</p>
                    <p className="font-bold text-slate-900">{selectedLeft.zoom}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Battery className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Battery & Endurance</p>
                    <p className="font-bold text-slate-900">{selectedLeft.battery}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Sparkles className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">AI Architecture</p>
                    <p className="font-bold text-slate-900">{selectedLeft.ai}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Shield className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Build Material</p>
                    <p className="font-bold text-slate-900">{selectedLeft.material}</p>
                  </div>
                </div>
              </div>
            </div>

            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/20 mt-4">
              <Link to={selectedLeft.link} className="inline-flex items-center justify-center gap-2">
                <span>Configure {selectedLeft.name}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Right Model Column */}
          <div className="rounded-3xl bg-white border border-blue-100 p-6 sm:p-8 space-y-6 shadow-xl shadow-blue-900/5 flex flex-col justify-between hover:border-primary/40 transition-all">
            <div className="space-y-4">
              {/* Select Dropdown */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Device B
                </span>
                <select
                  value={selectedRight.id}
                  onChange={(e) => {
                    const found = COMPARISON_MODELS.find((m) => m.id === e.target.value);
                    if (found) setSelectedRight(found);
                  }}
                  className="bg-blue-50/60 border border-blue-200 text-slate-900 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs"
                >
                  {COMPARISON_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Visual */}
              <div className="h-56 sm:h-64 w-full flex items-center justify-center p-4 rounded-2xl overflow-hidden bg-gradient-to-b from-blue-50/50 to-white border border-blue-100/70">
                <img
                  src={selectedRight.image}
                  alt={selectedRight.name}
                  className="max-h-full object-contain filter drop-shadow-md rounded-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">{selectedRight.name}</h3>
                <p className="text-lg font-black text-primary mt-0.5">{selectedRight.price}</p>
              </div>

              {/* Specs Rows */}
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Cpu className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Processor</p>
                    <p className="font-bold text-slate-900">{selectedRight.chipset}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Monitor className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Display</p>
                    <p className="font-bold text-slate-900">{selectedRight.display}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Camera className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Main Camera</p>
                    <p className="font-bold text-slate-900">{selectedRight.camera}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Zap className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Zoom & Telephoto</p>
                    <p className="font-bold text-slate-900">{selectedRight.zoom}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Battery className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Battery & Endurance</p>
                    <p className="font-bold text-slate-900">{selectedRight.battery}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Sparkles className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">AI Architecture</p>
                    <p className="font-bold text-slate-900">{selectedRight.ai}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/40 border border-blue-100/60">
                  <Shield className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Build Material</p>
                    <p className="font-bold text-slate-900">{selectedRight.material}</p>
                  </div>
                </div>
              </div>
            </div>

            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-500/20 mt-4">
              <Link to={selectedRight.link} className="inline-flex items-center justify-center gap-2">
                <span>Configure {selectedRight.name}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InteractivePhoneCompare;
