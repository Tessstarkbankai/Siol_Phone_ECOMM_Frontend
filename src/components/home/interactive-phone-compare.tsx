import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeftRight,
  ArrowRight,
  CheckCircle2,
  Cpu,
  HardDrive,
  Layers,
  Palette,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCustomerProducts } from "@/features/customer/products/api";
import {
  getCoverImage,
  extractSalePrice,
} from "@/features/customer/products/product-list.shared";
import { formatPrice } from "@/lib/utils";
import type { CustomerProduct } from "@/features/customer/products/types";

type PhoneModel = {
  id: string;
  name: string;
  brand: string;
  price: string;
  rawPrice: number;
  originalPrice?: string;
  discountBadge?: string;
  image: string;
  description: string;
  category: string;
  stock: number;
  sizes: string[];
  colors: string[];
  chipset: string;
  display: string;
  camera: string;
  battery: string;
  link: string;
};

// Default fallback models in case API is loading or offline
const FALLBACK_MODELS: PhoneModel[] = [
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    price: "₹1,44,900",
    rawPrice: 144900,
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    description:
      "Titanium design with thinner borders, A18 Pro chip, 48MP Fusion camera system, and industry-leading battery endurance with Apple Intelligence.",
    category: "Flagship Smartphone",
    stock: 15,
    sizes: ["256GB", "512GB", "1TB"],
    colors: ["Black Titanium", "Natural Titanium", "Desert Titanium", "White Titanium"],
    chipset: "A18 Pro Bionic (3nm)",
    display: "6.9″ Super Retina XDR OLED (120Hz ProMotion)",
    camera: "48MP Fusion + 48MP Ultra-Wide + 5x Telephoto",
    battery: "Up to 33 hrs video playback • MagSafe Qi2",
    link: "/collections?brand=Apple",
  },
  {
    id: "galaxy-s25-ultra",
    name: "Galaxy S25 Ultra",
    brand: "Samsung",
    price: "₹1,29,999",
    rawPrice: 129999,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    description:
      "Built with Grade 5 Titanium and Corning Gorilla Armor. Powered by Snapdragon 8 Elite with 200MP Quad Matrix and Galaxy AI suite.",
    category: "Flagship Smartphone",
    stock: 20,
    sizes: ["256GB", "512GB", "1TB"],
    colors: ["Titanium Gray", "Titanium Black", "Titanium Violet", "Titanium Yellow"],
    chipset: "Snapdragon 8 Elite for Galaxy",
    display: "6.8″ Dynamic AMOLED 2X (1-120Hz LTPO)",
    camera: "200MP Quad Matrix ProVisual + 100x Space Zoom",
    battery: "5,000 mAh • 45W Fast Charging",
    link: "/collections?brand=Samsung",
  },
];

function deriveSpec(desc: string, title: string, brand: string) {
  const combined = `${title} ${desc}`.toLowerCase();

  // Chipset
  let chipset = "Flagship AI Silicon (3nm Architecture)";
  if (combined.includes("a18")) chipset = "Apple A18 Pro Bionic (3nm)";
  else if (combined.includes("a17")) chipset = "Apple A17 Pro (3nm)";
  else if (combined.includes("snapdragon 8 elite")) chipset = "Qualcomm Snapdragon 8 Elite";
  else if (combined.includes("snapdragon 8 gen 3")) chipset = "Qualcomm Snapdragon 8 Gen 3";
  else if (combined.includes("snapdragon")) chipset = "Qualcomm Snapdragon Octa-Core";
  else if (combined.includes("tensor g4")) chipset = "Google Tensor G4 + Titan M2";
  else if (combined.includes("tensor")) chipset = "Google Tensor AI Silicon";
  else if (combined.includes("dimensity 9400")) chipset = "MediaTek Dimensity 9400";
  else if (combined.includes("dimensity")) chipset = "MediaTek Dimensity Flagship";
  else if (brand.toLowerCase() === "apple") chipset = "Apple Silicon Bionic";

  // Display
  let display = "120Hz LTPO Ultra-Smooth AMOLED Display";
  if (combined.includes("185hz")) display = "185Hz AMOLED Esports Pro Display";
  else if (combined.includes("144hz")) display = "144Hz HDR10+ Gaming Display";
  else if (combined.includes("retina")) display = "Super Retina XDR OLED (120Hz)";
  else if (combined.includes("dynamic amoled")) display = "Dynamic AMOLED 2X (120Hz LTPO)";
  else if (combined.includes("amoled")) display = "120Hz Fluid AMOLED Display";
  else if (combined.includes("oled")) display = "120Hz OLED High-Brightness Screen";

  // Camera
  let camera = "Ultra-High Dynamic Range Cinema Camera";
  if (combined.includes("200mp")) camera = "200MP Quad Matrix ProVisual Matrix";
  else if (combined.includes("leica")) camera = "Leica Co-Engineered Quad Camera System";
  else if (combined.includes("hasselblad")) camera = "50MP Hasselblad HyperTone Camera";
  else if (combined.includes("50mp")) camera = "50MP Ultra-Clear Dual/Triple Sensor";
  else if (combined.includes("48mp")) camera = "48MP Fusion Pro Camera with OIS";

  // Battery
  let battery = "High-Density Endurance Battery + Turbo Charging";
  if (combined.includes("6000mah") || combined.includes("6,000 mah")) battery = "6,000 mAh Glacier Battery + Hyper Charge";
  else if (combined.includes("5500mah") || combined.includes("5,500 mah")) battery = "5,500 mAh + Ultra Fast Turbo";
  else if (combined.includes("5000mah") || combined.includes("5,000 mah")) battery = "5,000 mAh All-Day Battery";
  else if (combined.includes("magsafe")) battery = "All-Day Battery + Qi2 MagSafe Wireless";

  return { chipset, display, camera, battery };
}

function mapProductToModel(p: CustomerProduct): PhoneModel {
  const salePrice = extractSalePrice(p);
  const specs = deriveSpec(p.description || "", p.title, p.brand || "");

  return {
    id: p._id,
    name: p.title,
    brand: p.brand || "Flagship",
    price: formatPrice(salePrice),
    rawPrice: salePrice,
    originalPrice: p.salePercentage > 0 ? formatPrice(p.price) : undefined,
    discountBadge: p.salePercentage > 0 ? `${p.salePercentage}% OFF` : undefined,
    image: getCoverImage(p) || "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    description:
      p.description ||
      "Official flagship device featuring precision engineering, high-performance silicon, and next-generation mobile display.",
    category: p.category?.name || "Flagship Smartphone",
    stock: p.stock ?? 10,
    sizes: (p.sizes as string[]) || ["128GB", "256GB"],
    colors: p.colors || ["Space Black", "Titanium Silver"],
    chipset: specs.chipset,
    display: specs.display,
    camera: specs.camera,
    battery: specs.battery,
    link: `/collection/${p._id}`,
  };
}

export function InteractivePhoneCompare() {
  const [models, setModels] = useState<PhoneModel[]>(FALLBACK_MODELS);
  const [selectedLeftId, setSelectedLeftId] = useState<string>(FALLBACK_MODELS[0].id);
  const [selectedRightId, setSelectedRightId] = useState<string>(
    FALLBACK_MODELS[1]?.id || FALLBACK_MODELS[0].id
  );
  const [searchFilter, setSearchFilter] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    async function fetchAllProducts() {
      try {
        const productList = await getCustomerProducts();
        if (!isMounted || !productList || productList.length === 0) return;

        const dbModels = productList.map(mapProductToModel);

        setModels(dbModels);
        if (dbModels[0]) setSelectedLeftId(dbModels[0].id);
        if (dbModels[1]) setSelectedRightId(dbModels[1].id);
        else if (dbModels[0]) setSelectedRightId(dbModels[0].id);
      } catch (err) {
        console.error("Failed to load products for comparison:", err);
      }
    }

    void fetchAllProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter models based on search query
  const filteredModels = useMemo(() => {
    if (!searchFilter.trim()) return models;
    const q = searchFilter.toLowerCase();
    return models.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.brand.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
    );
  }, [models, searchFilter]);

  // Group models by brand for clean, structured dropdowns
  const groupedModels = useMemo(() => {
    const map: Record<string, PhoneModel[]> = {};
    for (const m of filteredModels) {
      const b = m.brand || "Other";
      if (!map[b]) map[b] = [];
      map[b].push(m);
    }
    return map;
  }, [filteredModels]);

  const selectedLeft = useMemo(
    () => models.find((m) => m.id === selectedLeftId) || models[0] || FALLBACK_MODELS[0],
    [models, selectedLeftId]
  );

  const selectedRight = useMemo(
    () =>
      models.find((m) => m.id === selectedRightId) ||
      models[1] ||
      models[0] ||
      FALLBACK_MODELS[1],
    [models, selectedRightId]
  );

  function handleSwap() {
    const temp = selectedLeftId;
    setSelectedLeftId(selectedRightId);
    setSelectedRightId(temp);
  }

  return (
    <section className="py-14 sm:py-16 bg-gradient-to-b from-white via-blue-50/25 to-white text-slate-900 border-y border-blue-100/70 my-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-200 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Comparison Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
            Compare Flagship Power
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select any two devices from our complete catalogue ({models.length} devices available) to compare real-time specs, optics, and descriptions.
          </p>
        </div>

        {/* Global Swap / Quick Search Control Bar */}
        <div className="flex items-center justify-between gap-4 max-w-xl mx-auto flex-wrap sm:flex-nowrap bg-white p-2.5 rounded-2xl border border-blue-100/80 shadow-xs">
          <input
            type="text"
            placeholder="Quick search devices by model or brand..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="text-xs px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSwap}
            className="shrink-0 rounded-xl text-xs font-bold gap-1.5 border-blue-200 hover:bg-blue-50 text-primary cursor-pointer"
            title="Swap Device A and Device B"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span>Swap</span>
          </Button>
        </div>

        {/* 2-Column Comparison Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* ================= LEFT MODEL COLUMN (DEVICE A) ================= */}
          <div className="rounded-3xl bg-white border border-blue-100/80 p-5 sm:p-7 space-y-5 shadow-lg shadow-blue-900/5 flex flex-col justify-between hover:border-primary/40 transition-all">
            <div className="space-y-4">
              {/* Select Dropdown */}
              <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Select Device A ({models.length} items)
                </span>
                <select
                  value={selectedLeft.id}
                  onChange={(e) => setSelectedLeftId(e.target.value)}
                  className="bg-blue-50/70 border border-blue-200 text-slate-900 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs max-w-full sm:max-w-[280px] cursor-pointer"
                >
                  {Object.entries(groupedModels).map(([brand, brandModels]) => (
                    <optgroup key={brand} label={`── ${brand.toUpperCase()} ──`}>
                      {brandModels.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.price})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Real-time Phone Visual */}
              <div className="relative h-60 sm:h-72 w-full flex items-center justify-center p-6 rounded-2xl overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50/30 to-white border border-blue-100/70">
                <img
                  src={selectedLeft.image}
                  alt={selectedLeft.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md rounded-xl transition-all duration-500 hover:scale-105 select-none"
                />

                {/* Brand Pill */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-primary border border-blue-100 shadow-xs">
                  {selectedLeft.brand}
                </div>

                {/* Discount Badge */}
                {selectedLeft.discountBadge ? (
                  <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                    {selectedLeft.discountBadge}
                  </div>
                ) : null}
              </div>

              {/* Title & Price in Real Time */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {selectedLeft.category}
                  </span>
                  {selectedLeft.stock > 0 ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                      <CheckCircle2 className="h-3 w-3" />
                      In Stock
                    </span>
                  ) : null}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 line-clamp-1 mt-0.5">
                  {selectedLeft.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-lg font-black text-primary">{selectedLeft.price}</p>
                  {selectedLeft.originalPrice ? (
                    <p className="text-xs text-slate-400 line-through font-medium">
                      {selectedLeft.originalPrice}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* REAL-TIME DESCRIPTION CARD */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/70 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Official Product Overview
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedLeft.description}
                </p>
              </div>

              {/* Real-time Specs Rows */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <Cpu className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Processor & Silicon</p>
                    <p className="font-bold text-slate-800">{selectedLeft.chipset}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <Layers className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Display Matrix</p>
                    <p className="font-bold text-slate-800">{selectedLeft.display}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <HardDrive className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Storage Options</p>
                    <p className="font-bold text-slate-800">
                      {selectedLeft.sizes && selectedLeft.sizes.length > 0
                        ? selectedLeft.sizes.join(" • ")
                        : "Official High-Speed NVMe Storage"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <Palette className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Finishes & Colors</p>
                    <p className="font-bold text-slate-800 capitalize">
                      {selectedLeft.colors && selectedLeft.colors.length > 0
                        ? selectedLeft.colors.join(", ")
                        : "Premium Aerospace Coatings"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <Zap className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Battery & Endurance</p>
                    <p className="font-bold text-slate-800">{selectedLeft.battery}</p>
                  </div>
                </div>
              </div>
            </div>

            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 sm:h-12 rounded-xl shadow-md shadow-blue-500/20 mt-4 cursor-pointer">
              <Link to={selectedLeft.link} className="inline-flex items-center justify-center gap-2">
                <span>Configure & View {selectedLeft.name}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* ================= RIGHT MODEL COLUMN (DEVICE B) ================= */}
          <div className="rounded-3xl bg-white border border-blue-100/80 p-5 sm:p-7 space-y-5 shadow-lg shadow-blue-900/5 flex flex-col justify-between hover:border-primary/40 transition-all">
            <div className="space-y-4">
              {/* Select Dropdown */}
              <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Select Device B ({models.length} items)
                </span>
                <select
                  value={selectedRight.id}
                  onChange={(e) => setSelectedRightId(e.target.value)}
                  className="bg-blue-50/70 border border-blue-200 text-slate-900 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs max-w-full sm:max-w-[280px] cursor-pointer"
                >
                  {Object.entries(groupedModels).map(([brand, brandModels]) => (
                    <optgroup key={brand} label={`── ${brand.toUpperCase()} ──`}>
                      {brandModels.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.price})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Real-time Phone Visual */}
              <div className="relative h-60 sm:h-72 w-full flex items-center justify-center p-6 rounded-2xl overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50/30 to-white border border-blue-100/70">
                <img
                  src={selectedRight.image}
                  alt={selectedRight.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md rounded-xl transition-all duration-500 hover:scale-105 select-none"
                />

                {/* Brand Pill */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-primary border border-blue-100 shadow-xs">
                  {selectedRight.brand}
                </div>

                {/* Discount Badge */}
                {selectedRight.discountBadge ? (
                  <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                    {selectedRight.discountBadge}
                  </div>
                ) : null}
              </div>

              {/* Title & Price in Real Time */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {selectedRight.category}
                  </span>
                  {selectedRight.stock > 0 ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                      <CheckCircle2 className="h-3 w-3" />
                      In Stock
                    </span>
                  ) : null}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 line-clamp-1 mt-0.5">
                  {selectedRight.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-lg font-black text-primary">{selectedRight.price}</p>
                  {selectedRight.originalPrice ? (
                    <p className="text-xs text-slate-400 line-through font-medium">
                      {selectedRight.originalPrice}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* REAL-TIME DESCRIPTION CARD */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100/70 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Official Product Overview
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedRight.description}
                </p>
              </div>

              {/* Real-time Specs Rows */}
              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <Cpu className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Processor & Silicon</p>
                    <p className="font-bold text-slate-800">{selectedRight.chipset}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <Layers className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Display Matrix</p>
                    <p className="font-bold text-slate-800">{selectedRight.display}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <HardDrive className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Storage Options</p>
                    <p className="font-bold text-slate-800">
                      {selectedRight.sizes && selectedRight.sizes.length > 0
                        ? selectedRight.sizes.join(" • ")
                        : "Official High-Speed NVMe Storage"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <Palette className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Finishes & Colors</p>
                    <p className="font-bold text-slate-800 capitalize">
                      {selectedRight.colors && selectedRight.colors.length > 0
                        ? selectedRight.colors.join(", ")
                        : "Premium Aerospace Coatings"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100">
                  <Zap className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Battery & Endurance</p>
                    <p className="font-bold text-slate-800">{selectedRight.battery}</p>
                  </div>
                </div>
              </div>
            </div>

            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 sm:h-12 rounded-xl shadow-md shadow-blue-500/20 mt-4 cursor-pointer">
              <Link to={selectedRight.link} className="inline-flex items-center justify-center gap-2">
                <span>Configure & View {selectedRight.name}</span>
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
