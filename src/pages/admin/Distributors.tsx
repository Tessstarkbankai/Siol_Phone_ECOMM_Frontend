import { useState, useEffect } from "react";
import {
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  IndianRupee,
  ShieldCheck,
  Eye,
  Truck,
  FileText,
  MapPin,
  ExternalLink,
  PhoneCall,
  Mail,
  SlidersHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Commonloader } from "@/components/common/Loader";
import { toast } from "sonner";
import {
  getAdminDistributors,
  getAdminDistributorById,
  updateDistributorStatus,
  type AdminDistributorsCounts,
} from "@/features/admin/distributors/api";
import type {
  DistributorApplicationItem,
  DistributorStatus,
} from "@/features/customer/distributor/api";

export default function AdminDistributorsPage() {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<DistributorApplicationItem[]>([]);
  const [counts, setCounts] = useState<AdminDistributorsCounts>({
    total: 0,
    pending: 0,
    approved: 0,
    disapproved: 0,
  });
  const [activeTab, setActiveTab] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Review Modal State
  const [selectedApp, setSelectedApp] = useState<DistributorApplicationItem | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    void fetchApplications();
  }, [activeTab]);

  async function fetchApplications() {
    try {
      setLoading(true);
      const res = await getAdminDistributors(activeTab, search);
      setApplications(res.applications || []);
      setCounts(res.counts || { total: 0, pending: 0, approved: 0, disapproved: 0 });
    } catch (err: any) {
      toast.error(err.message || "Failed to load distributor applications");
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    void fetchApplications();
  }

  async function handleOpenReview(appId: string) {
    try {
      setDetailLoading(true);
      setReviewOpen(true);
      const data = await getAdminDistributorById(appId);
      setSelectedApp(data);
      setAdminNotes(data.adminNotes || "");
    } catch (err: any) {
      toast.error(err.message || "Failed to load application details");
      setReviewOpen(false);
    } finally {
      setDetailLoading(false);
    }
  }

  async function handleUpdateStatus(status: DistributorStatus) {
    if (!selectedApp) return;

    try {
      setActionLoading(true);
      const res = await updateDistributorStatus(selectedApp._id, status, adminNotes);
      toast.success(res.message);
      setReviewOpen(false);
      await fetchApplications();
    } catch (err: any) {
      toast.error(err.message || "Failed to update distributor status");
    } finally {
      setActionLoading(false);
    }
  }

  function getStatusBadge(status: DistributorStatus) {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 text-xs font-semibold gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Approved
          </Badge>
        );
      case "disapproved":
        return (
          <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 hover:bg-rose-500/20 text-xs font-semibold gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
      case "withdrawn":
        return (
          <Badge className="bg-slate-500/10 text-slate-600 border-slate-500/20 hover:bg-slate-500/20 text-xs font-semibold gap-1">
            <XCircle className="h-3 w-3" />
            Withdrawn
          </Badge>
        );
      default:
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20 text-xs font-semibold gap-1">
            <Clock className="h-3 w-3" />
            Pending Review
          </Badge>
        );
    }
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 flex items-center gap-2.5">
            <Building2 className="h-7 w-7 text-primary" />
            Distributor Requests
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Review B2B distributor applications, statutory credentials, and approve commercial partners.
          </p>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-neutral-200/80 shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Total Requests
              </p>
              <p className="text-2xl font-bold text-neutral-900 mt-1">{counts.total}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
              <FileText className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-amber-200 bg-amber-50/40 shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                Pending Review
              </p>
              <p className="text-2xl font-bold text-amber-900 mt-1">{counts.pending}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-emerald-200 bg-emerald-50/40 shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Approved Partners
              </p>
              <p className="text-2xl font-bold text-emerald-900 mt-1">{counts.approved}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-rose-200 bg-rose-50/40 shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-rose-700 uppercase tracking-wider">
                Rejected / Disapproved
              </p>
              <p className="text-2xl font-bold text-rose-900 mt-1">{counts.disapproved}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/20 text-rose-700">
              <XCircle className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Tabs Filter */}
      <Card className="rounded-3xl border-neutral-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-neutral-100 self-start">
            {[
              { label: "All", value: "all", count: counts.total },
              { label: "Pending", value: "pending", count: counts.pending },
              { label: "Approved", value: "approved", count: counts.approved },
              { label: "Rejected", value: "disapproved", count: counts.disapproved },
              ...(counts.withdrawn ? [{ label: "Withdrawn", value: "withdrawn", count: counts.withdrawn }] : []),
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.value
                    ? "bg-white text-neutral-900 shadow-xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-neutral-200 text-neutral-700">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 sm:max-w-xs w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search company, GST, email, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-xs rounded-xl"
              />
            </div>
            <Button type="submit" size="sm" variant="secondary" className="rounded-xl text-xs h-9">
              Search
            </Button>
          </form>
        </div>

        {/* Data Table */}
        <CardContent className="p-0">
          {loading ? (
            <div className="py-20 flex justify-center">
              <Commonloader />
            </div>
          ) : applications.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Building2 className="h-10 w-10 text-neutral-300 mx-auto" />
              <p className="text-sm font-semibold text-neutral-700">No distributor requests found</p>
              <p className="text-xs text-neutral-400">
                Applications submitted via the 'Become a Distributor' portal will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-neutral-50 text-xs">
                    <TableHead className="font-bold text-neutral-700">Company & Entity</TableHead>
                    <TableHead className="font-bold text-neutral-700">Representative</TableHead>
                    <TableHead className="font-bold text-neutral-700">GSTIN & PAN</TableHead>
                    <TableHead className="font-bold text-neutral-700">Territory & Hub</TableHead>
                    <TableHead className="font-bold text-neutral-700">Monthly Volume</TableHead>
                    <TableHead className="font-bold text-neutral-700">Status</TableHead>
                    <TableHead className="font-bold text-neutral-700">Submitted Date</TableHead>
                    <TableHead className="text-right font-bold text-neutral-700">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app._id} className="hover:bg-neutral-50/70 text-xs transition">
                      {/* Company & Entity */}
                      <TableCell className="font-medium">
                        <div className="space-y-1 min-w-[160px]">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-bold text-neutral-900 text-sm">{app.companyName}</p>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-md font-semibold bg-neutral-100 text-neutral-600 border border-neutral-200">
                              Attempt {app.attemptNumber || 1}/3
                            </span>
                          </div>
                          <span className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                            {app.entityType}
                          </span>
                        </div>
                      </TableCell>

                      {/* Contact Person */}
                      <TableCell>
                        <div className="space-y-0.5 min-w-[140px]">
                          <p className="font-semibold text-neutral-800">{app.contactPerson}</p>
                          <p className="text-[11px] text-neutral-500 break-all">{app.email}</p>
                          <p className="text-[11px] text-neutral-500">{app.phone}</p>
                        </div>
                      </TableCell>

                      {/* GST & PAN */}
                      <TableCell>
                        <div className="font-mono text-[11px] space-y-0.5 min-w-[120px]">
                          <p className="font-bold text-neutral-800">{app.gstNumber}</p>
                          <p className="text-neutral-500">PAN: {app.panNumber}</p>
                        </div>
                      </TableCell>

                      {/* Territory & Hub */}
                      <TableCell>
                        <div className="space-y-0.5 max-w-[180px]">
                          <p className="font-medium text-neutral-800 truncate">
                            {app.city}, {app.state}
                          </p>
                          <p className="text-[11px] text-neutral-500 truncate">
                            {app.operatingTerritory?.join(", ") || "Pan-India"}
                          </p>
                        </div>
                      </TableCell>

                      {/* Expected Volume */}
                      <TableCell>
                        <span className="font-bold text-primary">{app.expectedMonthlyVolume}</span>
                      </TableCell>

                      {/* Status */}
                      <TableCell>{getStatusBadge(app.status)}</TableCell>

                      {/* Date */}
                      <TableCell className="text-neutral-500 text-[11px]">
                        {new Date(app.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>

                      {/* Action */}
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => void handleOpenReview(app._id)}
                          className="rounded-xl text-xs gap-1.5 hover:bg-primary/5 hover:text-primary hover:border-primary/40"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Review Request</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Review & Decision Modal - Responsive Max Width Override */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="w-[96vw] sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0 rounded-3xl border-neutral-200 bg-white shadow-2xl">
          {detailLoading || !selectedApp ? (
            <div className="py-24 flex justify-center">
              <Commonloader />
            </div>
          ) : (
            <div className="w-full">
              {/* Modal Header */}
              <div className="p-5 sm:p-7 border-b border-neutral-100 bg-neutral-50/80 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                      Application Dossier
                    </span>
                    <span className="font-mono text-xs text-neutral-400">#{selectedApp._id.slice(-8)}</span>
                    <Badge variant="outline" className="text-[10px] font-semibold bg-white">
                      Attempt {selectedApp.attemptNumber || 1} of 3
                    </Badge>
                  </div>
                  <div>{getStatusBadge(selectedApp.status)}</div>
                </div>

                <DialogTitle className="text-lg sm:text-2xl font-bold text-neutral-900 break-words leading-tight">
                  {selectedApp.companyName}
                </DialogTitle>
                <DialogDescription className="text-xs text-neutral-500">
                  {selectedApp.entityType} • {selectedApp.yearsInBusiness} Years in Distribution
                </DialogDescription>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-7 space-y-6 text-xs">
                {/* Contact Representative */}
                <div className="space-y-2.5 pb-4 border-b border-neutral-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                    <PhoneCall className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    Authorized Contact Representative
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-2xl bg-neutral-50">
                    <div className="min-w-0">
                      <span className="text-neutral-500 block text-[11px]">Contact Name</span>
                      <span className="font-bold text-neutral-900 text-sm break-words">{selectedApp.contactPerson}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-neutral-500 block text-[11px]">Designation</span>
                      <span className="font-medium text-neutral-800 text-sm break-words">{selectedApp.designation}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-neutral-500 block text-[11px]">Email Address</span>
                      <a href={`mailto:${selectedApp.email}`} className="font-medium text-primary hover:underline break-all text-xs">
                        {selectedApp.email}
                      </a>
                    </div>
                    <div className="min-w-0">
                      <span className="text-neutral-500 block text-[11px]">Phone Number</span>
                      <a href={`tel:${selectedApp.phone}`} className="font-bold text-neutral-900 break-words">
                        {selectedApp.phone}
                      </a>
                      {selectedApp.alternatePhone && (
                        <p className="text-[10px] text-neutral-400 break-words">Alt: {selectedApp.alternatePhone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tax & Statutory Identifiers */}
                <div className="space-y-2.5 pb-4 border-b border-neutral-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    Tax & Statutory Registration
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 rounded-2xl bg-neutral-50">
                    <div className="min-w-0">
                      <span className="text-neutral-500 block text-[11px]">GSTIN (Goods & Services Tax)</span>
                      <span className="font-mono font-bold text-neutral-900 text-xs sm:text-sm break-all">{selectedApp.gstNumber}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-neutral-500 block text-[11px]">Permanent Account Number (PAN)</span>
                      <span className="font-mono font-bold text-neutral-900 text-xs sm:text-sm break-all">{selectedApp.panNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Logistics & Location */}
                <div className="space-y-2.5 pb-4 border-b border-neutral-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    Registered Location & Logistics Infrastructure
                  </h4>
                  <div className="p-4 rounded-2xl bg-neutral-50 space-y-3">
                    <div className="min-w-0">
                      <span className="text-neutral-500 block text-[11px]">Registered Address</span>
                      <p className="font-semibold text-neutral-800 break-words leading-relaxed">
                        {selectedApp.address}, {selectedApp.city}, {selectedApp.state} - {selectedApp.pincode}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-3 border-t border-neutral-200/60">
                      <div className="min-w-0">
                        <span className="text-neutral-500 block text-[11px]">Warehouse Storage</span>
                        <span className="font-bold text-neutral-800 break-words">{selectedApp.warehouseArea}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-neutral-500 block text-[11px]">Logistics / Fleet</span>
                        <span className="font-medium text-neutral-800 break-words">
                          {selectedApp.logisticsFleet || "Standard 3PL dispatch"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-neutral-500 block text-[11px]">Operating Territory</span>
                        <span className="font-bold text-neutral-800 break-words">
                          {selectedApp.operatingTerritory?.join(", ") || "Pan-India"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Commercial Scale & Catalog */}
                <div className="space-y-2.5 pb-4 border-b border-neutral-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                    <IndianRupee className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                    Commercial Purchasing Capacity & Focus
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-4 rounded-2xl bg-neutral-50">
                    <div className="min-w-0">
                      <span className="text-neutral-500 block text-[11px]">Annual Turnover</span>
                      <span className="font-bold text-neutral-900 text-sm break-words">{selectedApp.annualTurnover}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-neutral-500 block text-[11px]">Projected Monthly Volume</span>
                      <span className="font-bold text-primary text-sm break-words">{selectedApp.expectedMonthlyVolume}</span>
                    </div>
                    <div className="sm:col-span-2 pt-2 border-t border-neutral-200/60 min-w-0">
                      <span className="text-neutral-500 block mb-1.5 text-[11px]">Catalog Categories of Interest</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedApp.preferredCategories?.length ? (
                          selectedApp.preferredCategories.map((c) => (
                            <Badge key={c} variant="secondary" className="text-xs font-normal">
                              {c}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-neutral-400 italic">All Categories</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proposal Notes */}
                {selectedApp.proposalNote && (
                  <div className="space-y-2 pb-4 border-b border-neutral-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Applicant Proposal / Network Footprint
                    </h4>
                    <div className="p-3.5 rounded-2xl bg-neutral-50 text-neutral-800 leading-relaxed italic break-words">
                      "{selectedApp.proposalNote}"
                    </div>
                  </div>
                )}

                {/* Admin Remarks / Decision Input */}
                <div className="space-y-2">
                  <label htmlFor="adminNotes" className="text-xs font-bold text-neutral-800 block">
                    Administrative Remarks / Reviewer Notes
                  </label>
                  <Textarea
                    id="adminNotes"
                    rows={2}
                    placeholder="Enter review remarks, territory allocation terms, or rejection reasons..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="rounded-xl text-xs resize-none"
                  />
                </div>

                {/* Decision Actions */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-neutral-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setReviewOpen(false)}
                    className="rounded-xl text-xs"
                  >
                    Close
                  </Button>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={actionLoading || selectedApp.status === "disapproved"}
                      onClick={() => void handleUpdateStatus("disapproved")}
                      className="rounded-xl text-xs gap-1.5 font-bold"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>{selectedApp.status === "disapproved" ? "Application Rejected" : "Reject Application"}</span>
                    </Button>

                    <Button
                      type="button"
                      disabled={actionLoading || selectedApp.status === "approved"}
                      onClick={() => void handleUpdateStatus("approved")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs gap-1.5 font-bold shadow-xs"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>{selectedApp.status === "approved" ? "Approved Partner ✓" : "Approve as Distributor"}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
