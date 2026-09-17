import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle2,
  Store,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AUTHORIZED_SERVICE_CENTERS } from "@/config/support";

export function ServiceCenterLocator() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");

  const cities = [
    "All Cities",
    "Mumbai",
    "New Delhi",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
  ];

  const filteredCenters = AUTHORIZED_SERVICE_CENTERS.filter((center) => {
    const matchesCity =
      selectedCity === "All Cities" || center.city.toLowerCase() === selectedCity.toLowerCase();

    if (!matchesCity) return false;

    if (!searchLocation.trim()) return true;

    const query = searchLocation.toLowerCase().trim();
    return (
      center.city.toLowerCase().includes(query) ||
      center.name.toLowerCase().includes(query) ||
      center.address.toLowerCase().includes(query) ||
      center.pincode.includes(query) ||
      center.state.toLowerCase().includes(query)
    );
  });

  return (
    <section id="service-centers" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <Store className="h-3.5 w-3.5" />
            <span>Certified Service Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Find an Authorized Service Center
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Walk into any official SiOL Flagship Lounge or Authorized Service Point for hands-on diagnostics, 1-hour display swaps, and factory-calibrated repairs.
          </p>
        </div>

        {/* Search & City Filter Bar */}
        <div className="max-w-4xl mx-auto space-y-4 mb-10">
          <div className="relative flex items-center rounded-2xl bg-white p-2 shadow-md border border-slate-200/80 focus-within:ring-2 focus-within:ring-primary">
            <div className="pl-3.5 pr-2 text-slate-400">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <Input
              type="text"
              aria-label="Search by City, Pincode, or Area"
              placeholder="Enter your City, Area, or 6-digit PIN code (e.g., 400013, Connaught Place, Bengaluru)..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="border-0 shadow-none bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 text-sm h-11"
            />
            {searchLocation && (
              <button
                type="button"
                onClick={() => setSearchLocation("")}
                className="text-xs text-slate-400 hover:text-slate-600 px-2 cursor-pointer"
              >
                Clear
              </button>
            )}
            <div className="pr-1">
              <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-2 rounded-xl">
                <Search className="h-3.5 w-3.5" />
                <span>Instant Filter</span>
              </div>
            </div>
          </div>

          {/* Quick Metro City Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setSelectedCity(city);
                  setSearchLocation("");
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  selectedCity === city
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <span>
            Showing <strong className="text-slate-900">{filteredCenters.length}</strong> authorized service facility
            {filteredCenters.length === 1 ? "" : "ies"}
          </span>
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>OEM Parts &amp; Trained Engineers</span>
          </span>
        </div>

        {/* Service Centers Grid */}
        {filteredCenters.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4 max-w-2xl mx-auto shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <MapPin className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                No authorized service centers found in this area
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                We currently don&apos;t have a physical walk-in hub in &ldquo;{searchLocation || selectedCity}&rdquo;. However, you can book our insured doorstep pickup service.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchLocation("");
                  setSelectedCity("All Cities");
                }}
                className="rounded-xl text-xs font-semibold"
              >
                View All Authorized Centers
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-primary text-white hover:bg-primary/90 rounded-xl text-xs font-semibold"
              >
                <a href="#contact-support">Book Doorstep Courier Service</a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((center) => (
              <div
                key={center.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Top Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-bold ${
                        center.isFlagshipLounge
                          ? "bg-blue-500/10 text-primary border border-blue-200/60"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>{center.isFlagshipLounge ? "Flagship Experience Lounge" : "Authorized Service Hub"}</span>
                    </span>

                    <span className="text-xs font-mono font-semibold text-slate-500">
                      PIN {center.pincode}
                    </span>
                  </div>

                  {/* Name & City */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                      {center.name}
                    </h3>
                    <p className="text-xs font-semibold text-primary mt-0.5">
                      {center.city}, {center.state}
                    </p>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2.5 text-xs text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="leading-relaxed">{center.address}</p>
                      {center.landmark && (
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Landmark: {center.landmark}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-center gap-2.5 text-xs text-slate-600">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900">{center.timing}</span>
                      <span className="text-slate-400 ml-1">({center.openDays})</span>
                    </div>
                  </div>

                  {/* Services tags */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Available In-Store Services
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {center.services.map((srv, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-slate-50 border border-slate-200/70 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Bottom Bar */}
                <div className="pt-5 mt-5 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-semibold rounded-xl border-slate-300 hover:bg-slate-50"
                  >
                    <a href={`tel:${center.phone.replace(/\s+/g, "")}`}>
                      <Phone className="h-3.5 w-3.5 mr-1.5 text-slate-600" />
                      <span>Call Hub</span>
                    </a>
                  </Button>

                  <Button
                    asChild
                    size="sm"
                    className="w-full text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                  >
                    <a
                      href={center.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      <span>Directions</span>
                      <ExternalLink className="h-3 w-3 opacity-70" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
