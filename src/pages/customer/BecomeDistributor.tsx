import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/react";
import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  BadgePercent,
  PhoneCall,
  Send,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  submitDistributorApplication,
  getMyDistributorApplication,
  withdrawDistributorApplication,
  type DistributorApplicationItem,
  type DistributorApplyPayload,
} from "@/features/customer/distributor/api";

const ENTITY_TYPES = [
  "Private Limited Company",
  "Sole Proprietorship",
  "Partnership Firm",
  "Limited Liability Partnership (LLP)",
  "Public Limited Company",
  "Authorized Regional Dealer",
];

const WAREHOUSE_AREAS = [
  "Under 1,000 sq.ft.",
  "1,000 - 3,000 sq.ft.",
  "3,000 - 10,000 sq.ft.",
  "10,000+ sq.ft. (Central Hub)",
];

const ANNUAL_TURNOVERS = [
  "Under ₹50 Lakhs",
  "₹50 Lakhs - ₹2 Crores",
  "₹2 Crores - ₹10 Crores",
  "₹10 Crores - ₹50 Crores",
  "₹50 Crores+",
];

const MONTHLY_VOLUMES = [
  "₹5 Lakhs - ₹15 Lakhs",
  "₹15 Lakhs - ₹50 Lakhs",
  "₹50 Lakhs - ₹1.5 Crores",
  "₹1.5 Crores - ₹5 Crores",
  "₹5 Crores+",
];

const TERRITORIES = [
  "North Zone (Delhi, UP, Punjab, Haryana, J&K)",
  "South Zone (Karnataka, TN, Kerala, AP, Telangana)",
  "West Zone (Maharashtra, Gujarat, Goa, Rajasthan)",
  "East Zone (West Bengal, Bihar, Odisha, Jharkhand)",
  "North-East States",
  "Pan-India Distribution",
];

const PRODUCT_CATEGORIES = [
  "Ultra Flagship Smartphones",
  "Foldable & Flip Devices",
  "AI & Pro Series Phones",
  "Gaming Phones & Esports Gear",
  "Smart Wearables & Audio",
  "Fast Chargers & MagSafe Accessories",
];

export default function BecomeDistributorPage() {
  const { isSignedIn } = useAuth();

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [existingApp, setExistingApp] = useState<DistributorApplicationItem | null>(null);
  const [rejectionCount, setRejectionCount] = useState<number>(0);
  const [remainingAttempts, setRemainingAttempts] = useState<number>(3);
  const [canReapply, setCanReapply] = useState<boolean>(true);
  const [canWithdraw, setCanWithdraw] = useState<boolean>(false);
  const [isReapplying, setIsReapplying] = useState(false);

  // Form State
  const [companyName, setCompanyName] = useState("");
  const [entityType, setEntityType] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("3");
  const [contactPerson, setContactPerson] = useState("");
  const [designation, setDesignation] = useState("Director / Proprietor");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [warehouseArea, setWarehouseArea] = useState(WAREHOUSE_AREAS[1]);
  const [logisticsFleet, setLogisticsFleet] = useState("");
  const [annualTurnover, setAnnualTurnover] = useState(ANNUAL_TURNOVERS[1]);
  const [expectedMonthlyVolume, setExpectedMonthlyVolume] = useState(MONTHLY_VOLUMES[1]);
  const [selectedTerritories, setSelectedTerritories] = useState<string[]>([TERRITORIES[0]]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    PRODUCT_CATEGORIES[0],
    PRODUCT_CATEGORIES[1],
  ]);
  const [proposalNote, setProposalNote] = useState("");

  async function loadMyApplication() {
    if (!isSignedIn) {
      setLoadingInitial(false);
      return;
    }

    try {
      setLoadingInitial(true);
      const res = await getMyDistributorApplication();
      if (res) {
        setExistingApp(res.application || null);
        setRejectionCount(res.rejectionCount || 0);
        setRemainingAttempts(typeof res.remainingAttempts === "number" ? res.remainingAttempts : 3);
        setCanReapply(res.canReapply ?? true);
        setCanWithdraw(res.canWithdraw ?? false);
      }
    } catch {
      // guest or non-existent
    } finally {
      setLoadingInitial(false);
    }
  }

  useEffect(() => {
    void loadMyApplication();
  }, [isSignedIn]);

  async function handleWithdraw() {
    if (
      !window.confirm(
        "Are you sure you want to withdraw your pending distributor application? You will be able to submit an updated application afterwards."
      )
    ) {
      return;
    }

    try {
      setWithdrawing(true);
      const res = await withdrawDistributorApplication();
      toast.success(res.message);
      setExistingApp(res.application);
      setIsReapplying(false);
      await loadMyApplication();
    } catch (err: any) {
      toast.error(err.message || "Failed to withdraw application");
    } finally {
      setWithdrawing(false);
    }
  }

  function handleStartReapply() {
    if (rejectionCount >= 3) {
      toast.error("You have reached the maximum allowed limit of 3 application attempts.");
      return;
    }

    if (existingApp) {
      setCompanyName(existingApp.companyName || "");
      setEntityType(existingApp.entityType || "");
      setYearsInBusiness(String(existingApp.yearsInBusiness || 3));
      setContactPerson(existingApp.contactPerson || "");
      setDesignation(existingApp.designation || "Director / Proprietor");
      setEmail(existingApp.email || "");
      setPhone(existingApp.phone || "");
      setAlternatePhone(existingApp.alternatePhone || "");
      setGstNumber(existingApp.gstNumber || "");
      setPanNumber(existingApp.panNumber || "");
      setAddress(existingApp.address || "");
      setCity(existingApp.city || "");
      setState(existingApp.state || "");
      setPincode(existingApp.pincode || "");
      setWarehouseArea(existingApp.warehouseArea || WAREHOUSE_AREAS[1]);
      setLogisticsFleet(existingApp.logisticsFleet || "");
      setAnnualTurnover(existingApp.annualTurnover || ANNUAL_TURNOVERS[1]);
      setExpectedMonthlyVolume(existingApp.expectedMonthlyVolume || MONTHLY_VOLUMES[1]);
      if (existingApp.operatingTerritory?.length) {
        setSelectedTerritories(existingApp.operatingTerritory);
      }
      if (existingApp.preferredCategories?.length) {
        setSelectedCategories(existingApp.preferredCategories);
      }
      setProposalNote(existingApp.proposalNote || "");
    }
    setIsReapplying(true);
  }

  function toggleTerritory(item: string) {
    setSelectedTerritories((prev) =>
      prev.includes(item) ? prev.filter((t) => t !== item) : [...prev, item]
    );
  }

  function toggleCategory(item: string) {
    setSelectedCategories((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!companyName.trim()) return toast.error("Company name is required");
    if (!entityType) return toast.error("Please select legal entity type");
    if (!contactPerson.trim()) return toast.error("Contact person name is required");
    if (!email.trim()) return toast.error("Business email is required");
    if (!phone.trim()) return toast.error("Direct phone number is required");
    if (!gstNumber.trim()) return toast.error("GSTIN number is required");
    if (!panNumber.trim()) return toast.error("PAN number is required");
    if (!address.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
      return toast.error("Complete registered business address is required");
    }
    if (selectedTerritories.length === 0) {
      return toast.error("Please select at least one distribution territory");
    }

    const payload: DistributorApplyPayload = {
      companyName: companyName.trim(),
      entityType,
      yearsInBusiness: Number(yearsInBusiness) || 0,
      contactPerson: contactPerson.trim(),
      designation: designation.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      alternatePhone: alternatePhone.trim(),
      gstNumber: gstNumber.trim().toUpperCase(),
      panNumber: panNumber.trim().toUpperCase(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      warehouseArea,
      logisticsFleet: logisticsFleet.trim(),
      annualTurnover,
      expectedMonthlyVolume,
      operatingTerritory: selectedTerritories,
      preferredCategories: selectedCategories,
      proposalNote: proposalNote.trim(),
    };

    try {
      setSubmitting(true);
      const res = await submitDistributorApplication(payload);
      toast.success(res.message || "Application submitted successfully!");
      if (res.application) {
        setExistingApp(res.application);
        setIsReapplying(false);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit distributor application");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 p-8 sm:p-12 text-white shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 -mb-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-primary/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Official B2B Channel Program</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Become an Authorized Nexus Distributor
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              Partner with Nexus to distribute genuine smartphones, foldables, and next-gen mobile electronics across your region. Receive direct brand stock allocation, guaranteed margins, priority supply, and dedicated enterprise account management.
            </p>

            {/* Credibility Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>100% Genuine Sealed Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgePercent className="h-4 w-4 text-primary shrink-0" />
                <span>Tier-1 Trade Margins</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Nationwide Priority Logistics</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-blue-400 shrink-0" />
                <span>Assigned Account Desk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Application Status Card (if submitted previously) */}
        {!loadingInitial && existingApp && !isReapplying ? (
          <Card className="rounded-3xl border-neutral-200 bg-white shadow-md overflow-hidden">
            <div
              className={`p-6 border-b flex flex-wrap items-center justify-between gap-4 ${
                existingApp.status === "approved"
                  ? "bg-emerald-50 border-emerald-200"
                  : existingApp.status === "disapproved"
                  ? "bg-rose-50 border-rose-200"
                  : existingApp.status === "withdrawn"
                  ? "bg-slate-50 border-slate-200"
                  : "bg-amber-50 border-amber-200"
              }`}
            >
              <div className="flex items-center gap-3">
                {existingApp.status === "approved" ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                ) : existingApp.status === "disapproved" ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-sm">
                    <XCircle className="h-7 w-7" />
                  </div>
                ) : existingApp.status === "withdrawn" ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-500 text-white shadow-sm">
                    <XCircle className="h-7 w-7" />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-sm">
                    <Clock className="h-7 w-7" />
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Application Status:{" "}
                    <span
                      className={`capitalize ${
                        existingApp.status === "approved"
                          ? "text-emerald-700"
                          : existingApp.status === "disapproved"
                          ? "text-rose-700"
                          : existingApp.status === "withdrawn"
                          ? "text-slate-700"
                          : "text-amber-700"
                      }`}
                    >
                      {existingApp.status === "disapproved"
                        ? `Rejected (Attempt ${existingApp.attemptNumber || rejectionCount} of 3)`
                        : existingApp.status === "approved"
                        ? "Approved Official Partner"
                        : existingApp.status === "withdrawn"
                        ? "Withdrawn by Applicant"
                        : `Pending Review (Attempt ${existingApp.attemptNumber || 1} of 3)`}
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Reference ID: <span className="font-mono font-bold">#{existingApp._id.slice(-8)}</span> • Submitted on{" "}
                    {new Date(existingApp.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Status Header Actions */}
              {existingApp.status === "pending" ? (
                <Button
                  variant="outline"
                  disabled={withdrawing}
                  onClick={() => void handleWithdraw()}
                  className="rounded-xl font-bold text-xs border-amber-300 text-amber-800 hover:bg-amber-100 hover:text-amber-900 shadow-xs"
                >
                  {withdrawing ? "Withdrawing..." : "Withdraw Application"}
                </Button>
              ) : existingApp.status === "withdrawn" ? (
                <Button
                  onClick={handleStartReapply}
                  className="rounded-xl font-bold text-xs"
                >
                  Submit New Application
                </Button>
              ) : existingApp.status === "disapproved" ? (
                rejectionCount < 3 ? (
                  <Button
                    onClick={handleStartReapply}
                    className="rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
                  >
                    Re-apply as Distributor ({remainingAttempts} attempts left)
                  </Button>
                ) : (
                  <Badge variant="destructive" className="text-xs py-1 px-2.5">
                    Max Attempts Exceeded (3/3)
                  </Badge>
                )
              ) : null}
            </div>

            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Max Rejections Notice */}
              {existingApp.status === "disapproved" && rejectionCount >= 3 ? (
                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-5 text-rose-900 text-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                    <p className="font-bold text-sm text-rose-800">
                      Maximum Application Limit Reached (3 of 3 Attempts Used)
                    </p>
                  </div>
                  <p className="leading-relaxed text-neutral-600">
                    Your distributor application has been reviewed and rejected 3 times by our commercial board. Under company B2B policy, accounts reaching 3 rejection decisions are permanently restricted from re-submitting distributor applications. For compliance or legal reviews, please contact our corporate relations team.
                  </p>
                </div>
              ) : null}

              {/* Re-application remaining notice */}
              {existingApp.status === "disapproved" && rejectionCount < 3 ? (
                <div className="rounded-2xl bg-rose-50/60 border border-rose-200 p-4 text-rose-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-sm text-rose-800">
                      Application Was Rejected ({remainingAttempts} Attempt{remainingAttempts > 1 ? "s" : ""} Remaining)
                    </p>
                    <p className="text-neutral-600 mt-0.5">
                      You are allowed up to 3 total application submissions. Please update your financials, warehouse, or registration details before re-applying.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleStartReapply}
                    className="rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white shrink-0"
                  >
                    Re-apply ({remainingAttempts} left)
                  </Button>
                </div>
              ) : null}

              {/* Pending withdrawal guidance banner */}
              {existingApp.status === "pending" ? (
                <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-sm text-amber-800">Application Under Review</p>
                    <p className="text-neutral-600 mt-0.5">
                      Our commercial operations desk is currently reviewing your documents. If you need to make changes, you can withdraw your application now.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={withdrawing}
                    onClick={() => void handleWithdraw()}
                    className="rounded-xl border-amber-300 text-amber-900 hover:bg-amber-100 font-bold text-xs shrink-0"
                  >
                    {withdrawing ? "Withdrawing..." : "Withdraw Application"}
                  </Button>
                </div>
              ) : null}

              {/* Withdrawn banner */}
              {existingApp.status === "withdrawn" ? (
                <div className="rounded-2xl bg-slate-100 border border-slate-200 p-4 text-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-sm text-slate-900">Application Voluntarily Withdrawn</p>
                    <p className="text-slate-600 mt-0.5">
                      This application was withdrawn and does not count towards the 3-rejection limit. You can re-submit whenever you are ready.
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleStartReapply}
                    className="rounded-xl font-bold text-xs shrink-0"
                  >
                    Submit Revised Application
                  </Button>
                </div>
              ) : null}

              {existingApp.adminNotes ? (
                <div className="rounded-2xl bg-neutral-50 p-4 border border-neutral-200">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                    Corporate Partnership Reviewer Note
                  </p>
                  <p className="text-sm text-neutral-800 italic">"{existingApp.adminNotes}"</p>
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                <div>
                  <span className="text-neutral-500 block">Company Name</span>
                  <span className="font-bold text-neutral-900 text-sm">{existingApp.companyName}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Legal Entity</span>
                  <span className="font-bold text-neutral-900 text-sm">{existingApp.entityType}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Primary Contact</span>
                  <span className="font-bold text-neutral-900 text-sm">
                    {existingApp.contactPerson} ({existingApp.designation})
                  </span>
                </div>

                <div>
                  <span className="text-neutral-500 block">Registered GSTIN</span>
                  <span className="font-mono font-bold text-neutral-900 text-sm">{existingApp.gstNumber}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Operating Territory</span>
                  <span className="font-bold text-neutral-900 text-sm">
                    {existingApp.operatingTerritory?.join(", ") || "Pan-India"}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Expected Monthly Volume</span>
                  <span className="font-bold text-primary text-sm">{existingApp.expectedMonthlyVolume}</span>
                </div>
              </div>

              {existingApp.status === "approved" ? (
                <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-800 text-xs flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm">Your Distributor Account is Active</p>
                    <p className="mt-0.5">
                      Our commercial operations desk has initialized your B2B allocation quota.
                    </p>
                  </div>
                  <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                    <Link to="/contact">Contact B2B Desk</Link>
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
        ) : null}

        {/* Re-application Banner if Reapplying */}
        {isReapplying && (
          <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-sm text-primary">
                Re-applying as Distributor (Attempt {rejectionCount + 1} of 3)
              </p>
              <p className="text-neutral-600 mt-0.5">
                Previous application details have been pre-filled below. Update your figures and submit for review.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsReapplying(false)}
              className="rounded-xl text-xs font-semibold"
            >
              Cancel & View Application
            </Button>
          </div>
        )}

        {/* Blocked Form if 3 Rejections */}
        {rejectionCount >= 3 ? (
          <Card className="rounded-3xl border-rose-200 bg-rose-50/40 p-8 text-center space-y-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500 text-white mx-auto shadow-sm">
              <XCircle className="h-8 w-8" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-neutral-900">Application Submissions Locked</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                You have reached the maximum allowed limit of 3 application attempts for distributor partnership. Further submissions are locked under company compliance rules.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-xl text-xs">
              <Link to="/contact">Contact Commercial Concierge</Link>
            </Button>
          </Card>
        ) : (!existingApp || isReapplying) && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Business Profile */}
            <Card className="rounded-3xl border-neutral-200/90 bg-white shadow-sm overflow-hidden">
              <CardHeader className="p-6 sm:p-8 bg-neutral-50/60 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-neutral-900">
                      1. Business Profile & Entity Information
                    </CardTitle>
                    <CardDescription className="text-xs text-neutral-500">
                      Official legal details of your trading firm or corporate distribution entity.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-xs font-bold text-neutral-800">
                      Company / Firm Registered Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="e.g. Apex Telecommunications Pvt Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="rounded-xl text-xs h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="entityType" className="text-xs font-bold text-neutral-800">
                      Legal Entity Type <span className="text-destructive">*</span>
                    </Label>
                    <Select value={entityType} onValueChange={setEntityType} required>
                      <SelectTrigger id="entityType" className="rounded-xl text-xs h-11">
                        <SelectValue placeholder="Select legal entity classification" />
                      </SelectTrigger>
                      <SelectContent>
                        {ENTITY_TYPES.map((type) => (
                          <SelectItem key={type} value={type} className="text-xs">
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="years" className="text-xs font-bold text-neutral-800">
                      Years in Mobile / Electronics Distribution
                    </Label>
                    <Input
                      id="years"
                      type="number"
                      min="0"
                      max="70"
                      placeholder="e.g. 5"
                      value={yearsInBusiness}
                      onChange={(e) => setYearsInBusiness(e.target.value)}
                      className="rounded-xl text-xs h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="turnover" className="text-xs font-bold text-neutral-800">
                      Annual Gross Turnover
                    </Label>
                    <Select value={annualTurnover} onValueChange={setAnnualTurnover}>
                      <SelectTrigger id="turnover" className="rounded-xl text-xs h-11">
                        <SelectValue placeholder="Select annual turnover bracket" />
                      </SelectTrigger>
                      <SelectContent>
                        {ANNUAL_TURNOVERS.map((bracket) => (
                          <SelectItem key={bracket} value={bracket} className="text-xs">
                            {bracket}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Contact Person */}
            <Card className="rounded-3xl border-neutral-200/90 bg-white shadow-sm overflow-hidden">
              <CardHeader className="p-6 sm:p-8 bg-neutral-50/60 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-neutral-900">
                      2. Authorized Contact Representative
                    </CardTitle>
                    <CardDescription className="text-xs text-neutral-500">
                      The primary executive authorized to negotiate B2B supply agreements and commercial terms.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson" className="text-xs font-bold text-neutral-800">
                      Full Name of Contact Person <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contactPerson"
                      placeholder="e.g. Rajesh Singhania"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      required
                      className="rounded-xl text-xs h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation" className="text-xs font-bold text-neutral-800">
                      Designation / Role in Entity
                    </Label>
                    <Input
                      id="designation"
                      placeholder="e.g. Managing Director / Partner"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="rounded-xl text-xs h-11"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold text-neutral-800">
                      Business Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. procurement@apextelecom.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-xl text-xs h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-bold text-neutral-800">
                      Direct Mobile / Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="rounded-xl text-xs h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="altPhone" className="text-xs font-bold text-neutral-800">
                      Alternative / Office Landline
                    </Label>
                    <Input
                      id="altPhone"
                      type="tel"
                      placeholder="e.g. 011-4567890"
                      value={alternatePhone}
                      onChange={(e) => setAlternatePhone(e.target.value)}
                      className="rounded-xl text-xs h-11"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Tax & Registration */}
            <Card className="rounded-3xl border-neutral-200/90 bg-white shadow-sm overflow-hidden">
              <CardHeader className="p-6 sm:p-8 bg-neutral-50/60 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-neutral-900">
                      3. Statutory & Tax Registration
                    </CardTitle>
                    <CardDescription className="text-xs text-neutral-500">
                      Statutory identifiers for B2B input tax credit (ITC) invoicing and verification.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="gst" className="text-xs font-bold text-neutral-800">
                      Goods & Services Tax Number (GSTIN) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="gst"
                      placeholder="e.g. 07AAAAA0000A1Z5"
                      maxLength={15}
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                      required
                      className="rounded-xl font-mono uppercase text-xs h-11"
                    />
                    <p className="text-[11px] text-neutral-500">15-digit alphanumeric state GST number.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pan" className="text-xs font-bold text-neutral-800">
                      Permanent Account Number (PAN) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="pan"
                      placeholder="e.g. AAAAA0000A"
                      maxLength={10}
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      required
                      className="rounded-xl font-mono uppercase text-xs h-11"
                    />
                    <p className="text-[11px] text-neutral-500">10-digit entity PAN card number.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Operational Infrastructure & Logistics */}
            <Card className="rounded-3xl border-neutral-200/90 bg-white shadow-sm overflow-hidden">
              <CardHeader className="p-6 sm:p-8 bg-neutral-50/60 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-neutral-900">
                      4. Location, Warehousing & Regional Coverage
                    </CardTitle>
                    <CardDescription className="text-xs text-neutral-500">
                      Physical warehouse footprint, delivery capabilities, and operating states.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-xs font-bold text-neutral-800">
                    Registered Business / Warehouse Address <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    rows={2}
                    placeholder="Plot / Unit number, Industrial Area / Street name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="rounded-xl text-xs resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-xs font-bold text-neutral-800">
                      City / Hub <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      placeholder="e.g. New Delhi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="rounded-xl text-xs h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-xs font-bold text-neutral-800">
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="state"
                      placeholder="e.g. Delhi NCR"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="rounded-xl text-xs h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-xs font-bold text-neutral-800">
                      Postal Pincode <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="pincode"
                      placeholder="e.g. 110020"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                      className="rounded-xl text-xs h-11 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="warehouse" className="text-xs font-bold text-neutral-800">
                      Storage / Warehouse Area
                    </Label>
                    <Select value={warehouseArea} onValueChange={setWarehouseArea}>
                      <SelectTrigger id="warehouse" className="rounded-xl text-xs h-11">
                        <SelectValue placeholder="Select warehouse footprint" />
                      </SelectTrigger>
                      <SelectContent>
                        {WAREHOUSE_AREAS.map((area) => (
                          <SelectItem key={area} value={area} className="text-xs">
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fleet" className="text-xs font-bold text-neutral-800">
                      Dispatch & Logistics Fleet Setup
                    </Label>
                    <Input
                      id="fleet"
                      placeholder="e.g. 4 Vans, 3PL partners (BlueDart, DTDC)"
                      value={logisticsFleet}
                      onChange={(e) => setLogisticsFleet(e.target.value)}
                      className="rounded-xl text-xs h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2.5 pt-3">
                  <Label className="text-xs font-bold text-neutral-800 block">
                    Operating Distribution Territories <span className="text-destructive">*</span>
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TERRITORIES.map((t) => {
                      const selected = selectedTerritories.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleTerritory(t)}
                          className={`flex items-center justify-between p-3 rounded-2xl border text-xs text-left transition cursor-pointer ${
                            selected
                              ? "border-primary bg-primary/5 font-semibold text-primary"
                              : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                          }`}
                        >
                          <span>{t}</span>
                          <div
                            className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                              selected ? "border-primary bg-primary text-white" : "border-neutral-300"
                            }`}
                          >
                            {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Commercial Volume & Categories */}
            <Card className="rounded-3xl border-neutral-200/90 bg-white shadow-sm overflow-hidden">
              <CardHeader className="p-6 sm:p-8 bg-neutral-50/60 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-neutral-900">
                      5. Commercial Volume & Preferred Product Lines
                    </CardTitle>
                    <CardDescription className="text-xs text-neutral-500">
                      Anticipated purchase frequency and catalog categories for quota allocation.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyVolume" className="text-xs font-bold text-neutral-800">
                    Expected Monthly Purchasing Capacity (₹) <span className="text-destructive">*</span>
                  </Label>
                  <Select value={expectedMonthlyVolume} onValueChange={setExpectedMonthlyVolume}>
                    <SelectTrigger id="monthlyVolume" className="rounded-xl text-xs h-11">
                      <SelectValue placeholder="Select projected monthly purchase volume" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHLY_VOLUMES.map((volume) => (
                        <SelectItem key={volume} value={volume} className="text-xs">
                          {volume}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-xs font-bold text-neutral-800 block">
                    Product Lines of Interest (Select all that apply)
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {PRODUCT_CATEGORIES.map((cat) => {
                      const selected = selectedCategories.includes(cat);
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleCategory(cat)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition cursor-pointer ${
                            selected
                              ? "bg-primary text-white border-primary shadow-xs"
                              : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                          }`}
                        >
                          {cat} {selected && "✓"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="proposal" className="text-xs font-bold text-neutral-800">
                    Additional Notes / Partnership Proposal (Optional)
                  </Label>
                  <Textarea
                    id="proposal"
                    rows={3}
                    placeholder="Tell us about your current retail network footprint, key retail accounts, or preferred payment settlement terms."
                    value={proposalNote}
                    onChange={(e) => setProposalNote(e.target.value)}
                    className="rounded-xl text-xs resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submission Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm">
              <div className="text-xs text-neutral-500">
                <p className="font-semibold text-neutral-900">Confidentiality Assured</p>
                <p>All commercial data is securely processed under standard enterprise NDA.</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {isReapplying && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsReapplying(false)}
                    className="rounded-xl text-xs h-11"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto rounded-xl font-bold text-xs h-11 px-8 gap-2 shadow-sm"
                >
                  {submitting ? (
                    "Transmitting Application..."
                  ) : (
                    <>
                      <span>Submit Distributor Application</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
