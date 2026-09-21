import React, { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  ExternalLink,
  ShieldCheck,
  Search,
  Store,
  ChevronRight,
  Info,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Wrench,
  Building2,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AUTHORIZED_SERVICE_CENTERS,
  POPULAR_CITIES_DATA,
} from "@/config/support";
import type { ServiceCenter, PopularCityItem } from "@/types/support";

export function ServiceCenterLocator() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);
  const [focusedCityId, setFocusedCityId] = useState<string | null>(null);
  const [activeMobileCityId, setActiveMobileCityId] = useState<string | null>(null);

  const citiesList = [
    "All Cities",
    "Mumbai",
    "New Delhi",
    "Bengaluru",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
  ];

  // Map each popular city to its service centers
  const citiesWithCenters = POPULAR_CITIES_DATA.map((city) => {
    const centers = AUTHORIZED_SERVICE_CENTERS.filter(
      (c) =>
        city.centerIds.includes(c.id) ||
        c.city.toLowerCase() === city.cityName.toLowerCase()
    );
    return {
      ...city,
      centers,
    };
  });

  // Determine current active focused city object if any
  const focusedCity = citiesWithCenters.find((c) => c.id === focusedCityId) || null;

  // Filter cities based on search bar and selected city tab
  const filteredCities = citiesWithCenters.filter((item) => {
    const matchesCityTab =
      selectedCity === "All Cities" ||
      item.cityName.toLowerCase() === selectedCity.toLowerCase();

    if (!matchesCityTab) return false;

    if (!searchLocation.trim()) return true;

    const query = searchLocation.toLowerCase().trim();

    // Check city name, state, and internal service center details (address, name, pincode)
    const matchesCity =
      item.cityName.toLowerCase().includes(query) ||
      item.state.toLowerCase().includes(query);

    const matchesCenter = item.centers.some(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.address.toLowerCase().includes(query) ||
        c.pincode.includes(query) ||
        c.city.toLowerCase().includes(query)
    );

    return matchesCity || matchesCenter;
  });

  const handleCityClick = (cityId: string, cityName: string) => {
    if (focusedCityId === cityId) {
      setFocusedCityId(null);
      setSelectedCity("All Cities");
    } else {
      setFocusedCityId(cityId);
      setSelectedCity(cityName);
      // scroll smoothly to the center section
      const sectionEl = document.getElementById("service-centers");
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleFilterCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    setSearchLocation("");
    if (cityName === "All Cities") {
      setFocusedCityId(null);
    } else {
      const match = citiesWithCenters.find(
        (c) => c.cityName.toLowerCase() === cityName.toLowerCase()
      );
      if (match) {
        setFocusedCityId(match.id);
      }
    }
  };

  const resetFocus = () => {
    setFocusedCityId(null);
    setSelectedCity("All Cities");
    setSearchLocation("");
  };

  return (
    <section id="service-centers" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/60 px-3.5 py-1 text-xs font-medium text-[#1d1d1f]">
            <Store className="h-3.5 w-3.5 text-[#0071e3]" />
            <span>Find Locations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
            Find an Authorized Service Provider
          </h2>
          <p className="text-base sm:text-lg text-[#86868b] font-normal leading-relaxed">
            Hover over any city to reveal certified walk-in service centers, or click a city to explore its complete service network.
          </p>
        </div>

        {/* Search & City Filter Bar */}
        <div className="max-w-4xl mx-auto space-y-4 mb-8">
          <div className="relative flex items-center rounded-2xl bg-white p-2 shadow-xs border border-[#d2d2d7]/80 focus-within:ring-2 focus-within:ring-[#0071e3] transition-all">
            <div className="pl-3.5 pr-2 text-slate-400">
              <MapPin className="h-5 w-5 text-[#0071e3]" />
            </div>
            <Input
              type="text"
              aria-label="Enter city, state, or PIN code"
              placeholder="Enter city, locality, or PIN code (e.g. Lower Parel, Connaught Place, 560038)"
              value={searchLocation}
              onChange={(e) => {
                setSearchLocation(e.target.value);
                if (focusedCityId && e.target.value.trim()) {
                  setFocusedCityId(null);
                  setSelectedCity("All Cities");
                }
              }}
              className="border-0 shadow-none bg-transparent text-[#1d1d1f] placeholder:text-[#86868b] focus-visible:ring-0 text-sm h-11"
            />
            {searchLocation && (
              <button
                type="button"
                onClick={() => setSearchLocation("")}
                className="text-xs text-[#86868b] hover:text-[#1d1d1f] px-2 cursor-pointer font-medium"
              >
                Clear
              </button>
            )}
            <div className="pr-1">
              <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-[#1d1d1f] bg-[#f5f5f7] px-3.5 py-2 rounded-xl border border-[#d2d2d7]/40">
                <Search className="h-3.5 w-3.5 text-[#86868b]" />
                <span>Search</span>
              </div>
            </div>
          </div>

          {/* Quick Metro City Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {citiesList.map((city) => {
              const isSelected = selectedCity.toLowerCase() === city.toLowerCase();
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleFilterCitySelect(city)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[#1d1d1f] text-white shadow-sm scale-105"
                      : "bg-white text-[#1d1d1f] hover:bg-slate-100 border border-[#d2d2d7]/80 hover:border-slate-400"
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter & Interactive Hints */}
        <div className="flex items-center justify-between text-xs text-[#86868b] mb-6 px-1">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong className="text-[#1d1d1f]">{filteredCities.length}</strong> location
              {filteredCities.length === 1 ? "" : "s"}
            </span>
            {focusedCityId && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0071e3]/10 text-[#0071e3] font-medium text-[11px]">
                <Sparkles className="h-3 w-3" />
                Focused: {focusedCity?.cityName}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {focusedCityId && (
              <button
                type="button"
                onClick={resetFocus}
                className="inline-flex items-center gap-1 text-[#0071e3] hover:text-[#0077ed] font-medium cursor-pointer transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Show All Cities</span>
              </button>
            )}
            <span className="hidden sm:flex items-center gap-1.5 text-[#86868b]">
              <Info className="h-3.5 w-3.5 text-[#0071e3]" />
              <span>Hover over a city to reveal centers • Click to focus</span>
            </span>
          </div>
        </div>

        {/* FOCUSED CITY MULTI-CENTER SHOWCASE (When a city is clicked) */}
        {focusedCity && (
          <div className="mb-12 transition-all duration-500 ease-out">
            {/* Focused City Header Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white shadow-xl mb-8 border border-slate-800">
              <img
                src={focusedCity.imageUrl}
                alt={focusedCity.cityName}
                className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-xs scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/70" />

              <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={resetFocus}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition cursor-pointer backdrop-blur-sm"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Back to All Cities</span>
                    </button>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#0071e3] text-white">
                      {focusedCity.centers.length} Service Hubs
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    Official Service Centers in {focusedCity.cityName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {focusedCity.state} • Walk-in support, same-day repairs, genuine factory replacement parts, and certified technician diagnostics.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    onClick={resetFocus}
                    variant="outline"
                    className="rounded-xl border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-medium cursor-pointer"
                  >
                    View All Cities
                  </Button>
                </div>
              </div>
            </div>

            {/* Grid of All Authorized Service Centers for the Focused City */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {focusedCity.centers.map((center) => (
                <div
                  key={center.id}
                  className="group relative flex flex-col justify-between bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0071e3]/50 transition-all duration-300 ease-out hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    {/* Top Tag & Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                        <span className="text-[11px] font-medium text-emerald-700">
                          Open Today
                        </span>
                      </div>
                      {center.isFlagshipLounge ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#0071e3] border border-[#0071e3]/20">
                          <Sparkles className="h-3 w-3" />
                          Flagship Lounge
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700">
                          <ShieldCheck className="h-3 w-3 text-emerald-600" />
                          Authorized
                        </span>
                      )}
                    </div>

                    {/* Center Name */}
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0071e3] transition-colors leading-snug">
                        {center.name}
                      </h4>
                      {center.landmark && (
                        <p className="text-xs text-[#86868b] mt-0.5">
                          Landmark: {center.landmark}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                      <MapPin className="h-4 w-4 text-[#0071e3] shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="font-medium text-slate-800 leading-relaxed">
                          {center.address}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          PIN: {center.pincode} • {center.city}
                        </p>
                      </div>
                    </div>

                    {/* Operating Timings & Days */}
                    <div className="flex items-center gap-2 text-xs text-slate-600 px-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>
                        <strong className="text-slate-800">{center.timing}</strong> ({center.openDays})
                      </span>
                    </div>

                    {/* Service Capabilities Tags */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <Wrench className="h-3 w-3" />
                        <span>Services Offered:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {center.services.map((service, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium group-hover:bg-blue-50 group-hover:text-[#0071e3] transition-colors"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-5 mt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-semibold rounded-xl border-slate-200 text-slate-800 hover:bg-slate-100 cursor-pointer"
                    >
                      <a href={`tel:${center.phone.replace(/\s+/g, "")}`}>
                        <Phone className="h-3.5 w-3.5 mr-1 text-[#0071e3]" />
                        <span>Call</span>
                      </a>
                    </Button>

                    <Button
                      asChild
                      size="sm"
                      className="w-full text-xs font-semibold rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white shadow-xs cursor-pointer"
                    >
                      <a
                        href={center.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1"
                      >
                        <Navigation className="h-3.5 w-3.5" />
                        <span>Directions</span>
                        <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Other Cities Dock (Blurred & Compact Switcher) */}
            <div className="mt-12 pt-8 border-t border-slate-200/80">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Switch to Another City
                </h4>
                <button
                  type="button"
                  onClick={resetFocus}
                  className="text-xs text-[#0071e3] hover:underline font-medium cursor-pointer"
                >
                  View All Cities in Grid →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {citiesWithCenters
                  .filter((c) => c.id !== focusedCity.id)
                  .map((otherCity) => (
                    <div
                      key={otherCity.id}
                      onClick={() => handleCityClick(otherCity.id, otherCity.cityName)}
                      className="group relative h-24 rounded-xl overflow-hidden cursor-pointer shadow-xs border border-slate-200 transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      <img
                        src={otherCity.imageUrl}
                        alt={otherCity.cityName}
                        className="h-full w-full object-cover filter blur-[0.5px] group-hover:blur-none group-hover:scale-110 transition-all duration-500 opacity-60 group-hover:opacity-100"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/50 group-hover:bg-slate-950/30 transition-colors" />
                      <div className="absolute inset-0 p-2 flex flex-col justify-end text-white">
                        <p className="text-xs font-bold leading-tight drop-shadow-sm">
                          {otherCity.cityName}
                        </p>
                        <p className="text-[10px] text-slate-300">
                          {otherCity.centers.length} center{otherCity.centers.length === 1 ? "" : "s"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ALL CITIES INTERACTIVE GRID (WITH SMOOTH HOVER BLUR & ON-HOVER SERVICE CENTERS DRAWER) */}
        {!focusedCity && (
          <>
            {filteredCities.length === 0 ? (
              <div className="border border-dashed border-slate-300 bg-white p-12 text-center space-y-4 max-w-2xl mx-auto shadow-xs rounded-2xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center bg-slate-100 text-slate-400 rounded-full">
                  <MapPin className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    No authorized service centers found in this area
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    We currently don&apos;t have a physical walk-in hub matching &ldquo;{searchLocation || selectedCity}&rdquo;. You can still book our insured doorstep courier pickup service.
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFocus}
                    className="text-xs font-semibold rounded-xl"
                  >
                    View All Cities
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-[#0071e3] text-white hover:bg-[#0077ed] text-xs font-semibold rounded-xl"
                  >
                    <a href="#contact-support">Book Doorstep Courier Service</a>
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                onMouseLeave={() => setHoveredCityId(null)}
              >
                {filteredCities.map((item) => {
                  const isHovered = hoveredCityId === item.id;
                  const isOtherHovered = hoveredCityId !== null && !isHovered;
                  const isMobileActive = activeMobileCityId === item.id;
                  const primaryCenter = item.centers[0];

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredCityId(item.id)}
                      onClick={() => handleCityClick(item.id, item.cityName)}
                      style={{
                        transition:
                          "filter 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      className={`group relative h-[440px] rounded-2xl overflow-hidden cursor-pointer bg-slate-950 border ${
                        isHovered
                          ? "scale-[1.02] shadow-[0_20px_50px_rgba(0,113,227,0.3)] ring-2 ring-[#0071e3] z-30 border-[#0071e3]/60"
                          : isOtherHovered
                          ? "filter blur-[5px] saturate-50 opacity-35 scale-[0.97] border-slate-200/50"
                          : "shadow-sm hover:shadow-xl border-slate-200/80 scale-100 opacity-100"
                      }`}
                    >
                      {/* Full-Bleed City Image */}
                      <img
                        src={item.imageUrl}
                        alt={`${item.cityName} Service Center`}
                        className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                          isHovered ? "scale-110" : "scale-100"
                        }`}
                        loading="lazy"
                      />

                      {/* Minimal Subtle Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                      {/* Top City Badge */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-black/40 text-white backdrop-blur-md border border-white/10">
                          {item.centers.length} Service Hubs
                        </span>
                      </div>

                      {/* Ultra-Minimal Resting State (City Name Only, When not hovered) */}
                      <div
                        className={`absolute bottom-5 left-5 right-5 text-white z-10 space-y-1 transition-all duration-300 pointer-events-none ${
                          isHovered || isMobileActive
                            ? "opacity-0 translate-y-2"
                            : "opacity-100 translate-y-0"
                        }`}
                      >
                        <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                          {item.cityName}
                        </h3>
                        <p className="text-xs text-slate-300 font-medium line-clamp-1">
                          {item.tagline}
                        </p>
                        <div className="pt-2 flex items-center text-[11px] font-semibold text-[#38bdf8] group-hover:text-white transition-colors">
                          <span>Hover to view centers • Click to focus</span>
                          <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                        </div>
                      </div>

                      {/* HOVER OVERLAY: MINIMAL CLICK TO SHOW ALL HUBS */}
                      <div
                        className={`absolute inset-0 bg-slate-950/85 backdrop-blur-md p-6 text-white flex flex-col justify-between transition-all duration-500 ease-out z-20 ${
                          isHovered || isMobileActive
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 translate-y-4 pointer-events-none"
                        }`}
                      >
                        {/* Top minimal badge */}
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#0071e3]/20 text-sky-400 border border-[#0071e3]/30">
                            {item.centers.length} Authorized Hub{item.centers.length === 1 ? "" : "s"}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {item.state}
                          </span>
                        </div>

                        {/* Center action: clean, focused, no cluttered content */}
                        <div className="flex flex-col items-center justify-center my-auto space-y-4 text-center px-2">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0071e3]/20 border border-[#0071e3]/40 text-[#38bdf8] shadow-lg shadow-[#0071e3]/20 group-hover:scale-110 transition-transform duration-300">
                            <Store className="h-7 w-7 text-[#38bdf8]" />
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-2xl font-bold tracking-tight text-white">
                              {item.cityName}
                            </h4>
                            <p className="text-xs text-slate-300 max-w-[200px] line-clamp-1">
                              {item.tagline}
                            </p>
                          </div>

                          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0071e3] text-white text-xs font-semibold shadow-lg shadow-[#0071e3]/30 group-hover:bg-[#0077ed] group-hover:shadow-[#0071e3]/50 transition-all duration-300 group-hover:scale-105">
                            <span>Click to show all hubs</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        </div>

                        {/* Bottom subtle hint */}
                        <div className="text-center pt-2 border-t border-white/10">
                          <span className="text-[11px] text-slate-400">
                            Official walk-in centers, genuine parts & repairs
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
