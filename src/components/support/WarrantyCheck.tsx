import React, { useState } from "react";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  Battery,
  Cpu,
  Smartphone,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function WarrantyCheck() {
  const [imei, setImei] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = imei.trim();

    if (!clean || clean.length < 8) {
      setError("Please enter a valid 15-digit IMEI or 10-digit Serial Number.");
      return;
    }

    setChecking(true);
    setError(null);

    setTimeout(() => {
      setChecking(false);
      // Realistic simulated warranty verification response
      setResult({
        deviceModel: "SiOL Find X Ultra 5G (512GB)",
        imeiNumber: clean,
        purchaseDate: "15 October 2025",
        warrantyStatus: "Active",
        validUntil: "14 October 2026",
        daysRemaining: 210,
        coverageType: "1-Year Official Manufacturer Limited Warranty",
        batteryGuarantee: "Covered (Free replacement if capacity < 80%)",
        originCountry: "India (Official BIS Certified)",
      });
    }, 500);
  };

  const handleSampleImei = () => {
    setImei("864209051839211");
    setError(null);
  };

  return (
    <section id="warranty" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
            <span>Transparent Coverage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Check Warranty &amp; Coverage
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Inspect your device&apos;s active hardware warranty status, battery replacement eligibility, and after-sales protection terms.
          </p>
        </div>

        {/* Input Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <form
            onSubmit={handleCheck}
            className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl bg-white p-2 border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-primary"
          >
            <div className="flex items-center flex-1 w-full pl-3 text-slate-400">
              <Search className="h-5 w-5 mr-2 shrink-0 text-indigo-600" />
              <Input
                type="text"
                aria-label="IMEI or Serial Number"
                placeholder="Enter 15-digit IMEI (Dial *#06#) or Serial Number..."
                value={imei}
                onChange={(e) => {
                  setImei(e.target.value);
                  if (error) setError(null);
                }}
                className="border-0 shadow-none bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 text-sm h-11 font-mono"
              />
            </div>
            <Button
              type="submit"
              disabled={checking}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11 px-6 text-xs font-bold shadow-xs"
            >
              {checking ? "Verifying..." : "Check Warranty"}
            </Button>
          </form>

          <div className="flex items-center justify-between mt-2.5 px-2 text-xs text-slate-500">
            <span>Dial <strong className="font-mono text-slate-700">*#06#</strong> on phone to find IMEI</span>
            <button
              type="button"
              onClick={handleSampleImei}
              className="text-primary font-semibold hover:underline cursor-pointer"
            >
              Fill Sample IMEI
            </button>
          </div>

          {error && (
            <p className="text-xs text-rose-600 font-semibold mt-2 text-center">
              {error}
            </p>
          )}

          {/* Verification Result Card */}
          {result && (
            <div className="mt-6 rounded-2xl bg-white border border-emerald-200 p-6 shadow-lg space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Verified Device Record
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    {result.deviceModel}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Warranty Active</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Purchase Date</span>
                  <p className="font-semibold text-slate-900 mt-0.5">{result.purchaseDate}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Valid Until</span>
                  <p className="font-semibold text-emerald-700 mt-0.5">{result.validUntil}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Days Left</span>
                  <p className="font-semibold text-slate-900 mt-0.5">{result.daysRemaining} Days</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Market Origin</span>
                  <p className="font-semibold text-slate-900 mt-0.5">{result.originCountry}</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Full Coverage:</strong> 100% genuine parts &amp; zero labor charges at all authorized centers.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 4 Pillars of Coverage Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Standard Hardware */}
          <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-primary">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Standard 1-Year Limited Warranty
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Covers manufacturing defects in motherboards, optical camera sensors, internal modems, speakers, and vibration motors.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Free parts &amp; labor</span>
            </div>
          </div>

          {/* 2. Battery Guarantee */}
          <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <Battery className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Battery Health Guarantee
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              12-month factory coverage. If maximum capacity falls below 80% under normal charge cycles, we install a new OEM battery free.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Full 12-month coverage</span>
            </div>
          </div>

          {/* 3. Display Protection */}
          <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Genuine Display Standard
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Covers display panel dead pixels, touch digitizer latency, or factory green lines. Replaced with calibrated 120Hz LTPO panels.
            </p>
            <div className="pt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Factory pressure-sealed</span>
            </div>
          </div>

          {/* 4. Exclusions / Transparency */}
          <div className="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Coverage Exclusions
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Does not cover drops/cracked glass without SiOL Care+, liquid immersion beyond rated limits, unapproved rooting, or third-party disassembly.
            </p>
            <div className="pt-2 text-xs font-semibold text-slate-500 flex items-center gap-1">
              <XCircle className="h-3.5 w-3.5 text-rose-500" />
              <span>Transparent limitations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
