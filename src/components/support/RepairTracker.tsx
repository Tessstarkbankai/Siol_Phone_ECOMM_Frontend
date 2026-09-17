import React, { useState } from "react";
import {
  Wrench,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Smartphone,
  MapPin,
  Calendar,
  FileText,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SAMPLE_REPAIR_RECORDS } from "@/config/support";
import type { RepairRecord } from "@/types/support";

export function RepairTracker() {
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<RepairRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    const query = (customId || searchId).trim().toUpperCase();

    if (!query) {
      setSearchError("Please enter a valid Service Request ID or IMEI number.");
      return;
    }

    setLoading(true);
    setSearchError(null);
    setHasSearched(true);

    // Simulate authentic API request latency
    setTimeout(() => {
      setLoading(false);
      // Check in sample records or lookup by IMEI
      if (SAMPLE_REPAIR_RECORDS[query]) {
        setRecord(SAMPLE_REPAIR_RECORDS[query]);
      } else {
        // Not found in active tracking registry
        setRecord(null);
        setSearchError(
          `No active service ticket found for "${query}". Please check your job sheet receipt or SMS confirmation.`,
        );
      }
    }, 600);
  };

  const handleLoadDemo = () => {
    setSearchId("SR-89214");
    handleSearch(undefined, "SR-89214");
  };

  const handleReset = () => {
    setSearchId("");
    setRecord(null);
    setHasSearched(false);
    setSearchError(null);
  };

  return (
    <section id="track-repair" className="py-14 sm:py-20 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <Wrench className="h-3.5 w-3.5 text-emerald-600" />
            <span>Real-Time Service Status</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Track Your Device Repair
          </h2>
          <p className="text-sm text-slate-600">
            Enter your Service Request ID (printed on your intake job sheet or sent via SMS) to view real-time diagnostics, part replacement, and pickup ETA.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-2xl mx-auto mb-8">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl bg-slate-50 p-2 border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:bg-white transition-all"
          >
            <div className="flex items-center flex-1 w-full pl-3 text-slate-400">
              <Search className="h-5 w-5 mr-2 shrink-0" />
              <Input
                type="text"
                aria-label="Service Request ID or IMEI"
                placeholder="Enter Request ID (e.g. SR-89214) or 15-digit IMEI..."
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                  if (searchError) setSearchError(null);
                }}
                className="border-0 shadow-none bg-transparent text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 text-sm h-11 uppercase font-mono"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11 px-6 text-xs font-bold shadow-xs"
              >
                {loading ? "Searching..." : "Track Repair"}
              </Button>
            </div>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="flex items-center justify-between mt-2.5 px-2 text-xs text-slate-500">
            <span>Where is my ID? Check your intake receipt or SMS.</span>
            <button
              type="button"
              onClick={handleLoadDemo}
              className="text-primary font-semibold hover:underline cursor-pointer flex items-center gap-1"
            >
              Try sample: <strong className="font-mono">SR-89214</strong>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <Skeleton className="h-6 w-48 rounded" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
            </div>
            <div className="space-y-4 pt-4">
              <Skeleton className="h-8 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        )}

        {/* Error / Not Found State */}
        {!loading && searchError && (
          <div className="rounded-3xl border border-amber-200/80 bg-amber-50/50 p-8 text-center space-y-3 max-w-xl mx-auto shadow-xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Ticket Not Located
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {searchError}
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="rounded-xl text-xs"
              >
                Clear &amp; Try Again
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-primary text-white hover:bg-primary/90 rounded-xl text-xs"
              >
                <a href="#contact-support">Call Helpline for Assistance</a>
              </Button>
            </div>
          </div>
        )}

        {/* Success / Result State */}
        {!loading && record && (
          <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            {/* Header Strip */}
            <div className="bg-slate-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-sky-400 bg-white/10 px-2.5 py-0.5 rounded">
                    ID: {record.requestId}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>In Progress</span>
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white pt-1">
                  {record.deviceModel}
                </h3>
                <p className="text-xs text-slate-400">
                  Customer: {record.customerName} • IMEI: {record.imei.slice(0, 4)}••••{record.imei.slice(-4)}
                </p>
              </div>

              <div className="text-left sm:text-right bg-white/5 border border-white/10 p-3.5 rounded-2xl shrink-0">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                  Estimated Ready Date
                </p>
                <p className="text-sm sm:text-base font-bold text-sky-400">
                  {record.estimatedCompletion}
                </p>
              </div>
            </div>

            {/* Device & Center Info Grid */}
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1 bg-white p-4 rounded-xl border border-slate-200/70">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold flex items-center gap-1">
                    <Smartphone className="h-3.5 w-3.5 text-primary" />
                    Reported Issue
                  </span>
                  <p className="text-slate-800 font-semibold leading-snug">
                    {record.issueReported}
                  </p>
                </div>

                <div className="space-y-1 bg-white p-4 rounded-xl border border-slate-200/70">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                    Servicing Facility
                  </span>
                  <p className="text-slate-800 font-semibold leading-snug">
                    {record.serviceCenter}
                  </p>
                </div>

                <div className="space-y-1 bg-white p-4 rounded-xl border border-slate-200/70">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-indigo-600" />
                    Last Updated
                  </span>
                  <p className="text-slate-800 font-semibold leading-snug">
                    {record.updatedAt}
                  </p>
                </div>
              </div>

              {/* Technician Notes Box */}
              {record.technicianNotes && (
                <div className="mt-4 rounded-xl bg-blue-50/70 border border-blue-200/60 p-4 text-xs space-y-1">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    Official Technician Log
                  </span>
                  <p className="text-blue-950 leading-relaxed">
                    {record.technicianNotes}
                  </p>
                </div>
              )}
            </div>

            {/* 5-Step Milestone Timeline */}
            <div className="p-6 sm:p-8 space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Service Journey Milestones</span>
              </h4>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {record.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-6 sm:-left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                        step.completed
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : step.current
                          ? "bg-primary border-primary text-white ring-4 ring-primary/20 animate-pulse"
                          : "bg-white border-slate-300 text-slate-300"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" />
                      ) : (
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5
                          className={`text-sm font-bold ${
                            step.completed
                              ? "text-slate-900"
                              : step.current
                              ? "text-primary"
                              : "text-slate-400"
                          }`}
                        >
                          {step.label}
                        </h5>
                        {step.timestamp && (
                          <span className="text-xs text-slate-400 font-medium">
                            {step.timestamp}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs leading-relaxed ${
                          step.completed || step.current
                            ? "text-slate-600"
                            : "text-slate-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>All repairs backed by our 90-day official replacement warranty</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Track Another Device
              </Button>
            </div>
          </div>
        )}

        {/* Empty Initial State Instruction */}
        {!hasSearched && !loading && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">
                  Where do I find my Service Request ID?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your 8-character ID is printed at the top-right corner of your official SiOL intake job card, and was sent via SMS to your registered mobile number upon device check-in.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadDemo}
              className="shrink-0 rounded-xl text-xs font-semibold bg-white"
            >
              See Sample Tracker
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
