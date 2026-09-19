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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AUTHORIZED_SERVICE_CENTERS,
  POPULAR_CITIES_DATA,
} from "@/config/support";
import type { ServiceCenter, PopularCityItem } from "@/types/support";

export function ServiceCenterLocator() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
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

  const toggleMobileCard = (id: string) => {
    setActiveMobileCityId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="service-centers" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
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
            Get certified repairs and genuine parts at an authorized location near you.
          </p>
        </div>

        {/* Search & City Filter Bar */}
        <div className="max-w-4xl mx-auto space-y-4 mb-10">
          <div className="relative flex items-center rounded-2xl bg-white p-2 shadow-sm border border-[#d2d2d7]/80 focus-within:ring-2 focus-within:ring-[#0071e3]">
            <div className="pl-3.5 pr-2 text-slate-400">
              <MapPin className="h-5 w-5 text-[#0071e3]" />
            </div>
            <Input
              type="text"
              aria-label="Enter city, state, or PIN code"
              placeholder="Enter city, state, or PIN code"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
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
            {citiesList.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setSelectedCity(city);
                  setSearchLocation("");
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  selectedCity === city
                    ? "bg-[#1d1d1f] text-white shadow-xs"
                    : "bg-white text-[#1d1d1f] hover:bg-slate-100 border border-[#d2d2d7]/80"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Instructions */}
        <div className="flex items-center justify-between text-xs text-[#86868b] mb-6 px-1">
          <span>
            Showing <strong className="text-[#1d1d1f]">{filteredCities.length}</strong> location
            {filteredCities.length === 1 ? "" : "s"}
          </span>
          <span className="hidden sm:flex items-center gap-1.5 text-[#86868b]">
            <Info className="h-3.5 w-3.5 text-[#0071e3]" />
            <span>Select a location to view address, hours, and service details</span>
          </span>
        </div>

        {/* IMAGE-ONLY POPULAR CITY CARDS (Sharp Corners, Ultra-Minimal Text, Hover Overlay for Stores) */}
        {filteredCities.length === 0 ? (
          <div className="border border-dashed border-slate-300 bg-white p-12 text-center space-y-4 max-w-2xl mx-auto shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center bg-slate-100 text-slate-400">
              <MapPin className="h-7 w-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">
                No authorized service centers found in this area
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                We currently don&apos;t have a physical walk-in hub in &ldquo;{searchLocation || selectedCity}&rdquo;. You can still book our insured doorstep courier pickup service.
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
                className="text-xs font-semibold rounded-none"
              >
                View All Cities
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-primary text-white hover:bg-primary/90 text-xs font-semibold rounded-none"
              >
                <a href="#contact-support">Book Doorstep Courier Service</a>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCities.map((item) => {
              const isMobileActive = activeMobileCityId === item.id;
              const primaryCenter = item.centers[0];

              return (
                <div
                  key={item.id}
                  onClick={() => toggleMobileCard(item.id)}
                  className="group relative h-[420px] rounded-none overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer bg-slate-950 border border-slate-200"
                >
                  {/* Full-Bleed City Image */}
                  <img
                    src={item.imageUrl}
                    alt={`${item.cityName} Service Center`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Minimal Subtle Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Ultra-Minimal Resting State (City Name Only, No Clutter) */}
                  <div className="absolute bottom-5 left-5 text-white z-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none space-y-0.5">
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white drop-shadow-md">
                      {item.cityName}
                    </h3>
                    <p className="text-[11px] text-slate-300 font-medium">
                      Explore locations →
                    </p>
                  </div>

                  {/* HOVER OVERLAY: STORES AVAILABLE IN THIS AREA (Sharp Corners, Clean Layout) */}
                  <div
                    className={`absolute inset-0 bg-slate-950/95 p-5 sm:p-6 text-white flex flex-col justify-between transition-all duration-500 ease-out z-20 ${
                      isMobileActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
                    }`}
                  >
                    {/* Minimal Header in Overlay */}
                    <div className="border-b border-white/10 pb-3">
                      <h4 className="text-lg font-semibold tracking-tight text-white">
                        {item.cityName} Locations
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {item.centers.length} Authorized Service Provider{item.centers.length === 1 ? "" : "s"}
                      </p>
                    </div>

                    {/* Stores List */}
                    <div className="my-auto space-y-3 py-2 overflow-y-auto max-h-[250px] pr-1">
                      {item.centers.map((center) => (
                        <div
                          key={center.id}
                          className="space-y-1.5 text-xs border-b border-white/5 pb-2.5 last:border-0"
                        >
                          <h5 className="font-bold text-sm text-sky-400">
                            {center.name}
                          </h5>

                          <div className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                            <p className="line-clamp-2 leading-relaxed">
                              {center.address}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>
                              {center.timing} ({center.openDays})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions (Sharp Buttons) */}
                    {primaryCenter && (
                      <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full text-xs font-semibold rounded-none bg-white/10 hover:bg-white/20 border-white/20 text-white"
                        >
                          <a
                            href={`tel:${primaryCenter.phone.replace(/\s+/g, "")}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Phone className="h-3.5 w-3.5 mr-1 text-sky-400" />
                            <span>Call</span>
                          </a>
                        </Button>

                        <Button
                          asChild
                          size="sm"
                          className="w-full text-xs font-semibold rounded-none bg-primary hover:bg-primary/90 text-white shadow-xs"
                        >
                          <a
                            href={primaryCenter.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center gap-1"
                          >
                            <Navigation className="h-3.5 w-3.5" />
                            <span>Directions</span>
                            <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
