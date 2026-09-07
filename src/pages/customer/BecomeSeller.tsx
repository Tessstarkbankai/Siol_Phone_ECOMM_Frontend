import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import {
  Store,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Upload,
  ArrowRight,
  ShieldCheck,
  IndianRupee,
  Building2,
  Phone,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Commonloader } from "@/components/common/Loader";
import { toast } from "sonner";
import {
  getVendorStatus,
  submitVendorApplication,
  type VendorApplicationStatus,
} from "@/features/vendor/api";

export function BecomeSellerPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusData, setStatusData] = useState<VendorApplicationStatus | null>(null);

  // Form states
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  // Bank details
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [upiId, setUpiId] = useState("");

  // Media
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    void loadStatus();
  }, [isLoaded, isSignedIn]);

  async function loadStatus() {
    try {
      setLoading(true);
      const res = await getVendorStatus();
      if (res) {
        setStatusData(res);
        if (res.status === "approved") {
          navigate("/vendor");
          return;
        }
      }
    } catch {
      // Not yet applied
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error("Please sign in to apply as a seller");
      navigate("/sign-in");
      return;
    }

    if (!storeName.trim() || !description.trim() || !businessEmail.trim() || !businessPhone.trim()) {
      toast.error("Please fill in all required store details");
      return;
    }

    if (!accountHolderName.trim() || !accountNumber.trim() || !ifsc.trim()) {
      toast.error("Please fill in your bank settlement details");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("storeName", storeName.trim());
      formData.append("description", description.trim());
      formData.append("businessEmail", businessEmail.trim());
      formData.append("businessPhone", businessPhone.trim());
      if (gstNumber.trim()) formData.append("gstNumber", gstNumber.trim());

      formData.append("accountHolderName", accountHolderName.trim());
      formData.append("accountNumber", accountNumber.trim());
      formData.append("ifsc", ifsc.trim().toUpperCase());
      if (upiId.trim()) formData.append("upiId", upiId.trim());

      if (logoFile) formData.append("storeLogo", logoFile);
      if (bannerFile) formData.append("storeBanner", bannerFile);

      const res = await submitVendorApplication(formData);
      if (res) {
        toast.success(res.message || "Application submitted successfully!");
        void loadStatus();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <Commonloader />;
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full border-border text-center p-8 rounded-2xl shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-5">
            <Store className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
            Become a Seller on Nexus
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Join thousands of verified electronics and mobile retailers across India. Please sign in to register your seller account.
          </p>
          <Button asChild className="w-full h-11 text-sm font-semibold rounded-xl">
            <Link to="/sign-in">Sign In to Continue</Link>
          </Button>
        </Card>
      </div>
    );
  }

  // Already applied and status is pending
  if (statusData?.status === "pending") {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <Card className="max-w-lg w-full border-border p-8 rounded-2xl shadow-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 mb-5">
            <Clock className="h-8 w-8 animate-pulse" />
          </div>
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30 mb-3 px-3 py-1 font-semibold">
            Under Review
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
            Your Application is Under Review
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Thank you for applying to become a seller for{" "}
            <span className="font-semibold text-foreground">{statusData.storeName}</span>. Our administrative team reviews all applications to ensure catalog quality and authenticity. You will receive an update shortly.
          </p>
          <div className="rounded-xl bg-secondary/50 p-4 text-xs text-muted-foreground border border-border/60 text-left space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Standard review time: 24 to 48 business hours</span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-primary" />
              <span>Default platform commission rate: {statusData.commissionRate ?? 10}%</span>
            </div>
          </div>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/">Back to Marketplace</Link>
          </Button>
        </Card>
      </div>
    );
  }

  // Application was rejected
  if (statusData?.status === "rejected") {
    return (
      <div className="min-h-[75vh] max-w-2xl mx-auto px-4 py-12">
        <Card className="border-destructive/30 bg-destructive/5 p-6 rounded-2xl shadow-sm mb-8">
          <div className="flex items-start gap-4">
            <XCircle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-destructive">
                Application Needs Revision
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Reason from our moderation team:
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground bg-white/60 p-3 rounded-lg border border-border">
                {statusData.rejectionReason || "Please verify your business and settlement credentials."}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                You can update your details below and re-submit your application for immediate re-evaluation.
              </p>
            </div>
          </div>
        </Card>

        {/* Application Form for Resubmission */}
        <SellerApplicationForm
          storeName={storeName}
          setStoreName={setStoreName}
          description={description}
          setDescription={setDescription}
          businessEmail={businessEmail}
          setBusinessEmail={setBusinessEmail}
          businessPhone={businessPhone}
          setBusinessPhone={setBusinessPhone}
          gstNumber={gstNumber}
          setGstNumber={setGstNumber}
          accountHolderName={accountHolderName}
          setAccountHolderName={setAccountHolderName}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          ifsc={ifsc}
          setIfsc={setIfsc}
          upiId={upiId}
          setUpiId={setUpiId}
          logoFile={logoFile}
          setLogoFile={setLogoFile}
          bannerFile={bannerFile}
          setBannerFile={setBannerFile}
          submitting={submitting}
          onSubmit={handleSubmit}
          isResubmission
        />
      </div>
    );
  }

  // Suspended account
  if (statusData?.status === "suspended") {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full border-destructive/40 p-8 rounded-2xl shadow-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-5">
            <AlertCircle className="h-8 w-8" />
          </div>
          <Badge className="bg-destructive/10 text-destructive border-destructive/30 mb-3 px-3 py-1 font-semibold">
            Account Suspended
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
            Seller Account Suspended
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Your vendor account for <span className="font-semibold text-foreground">{statusData.storeName}</span> has been temporarily suspended by the platform administrator. Please contact support to resolve any compliance issues.
          </p>
          <Button asChild variant="outline" className="rounded-xl">
            <Link to="/contact">Contact Support</Link>
          </Button>
        </Card>
      </div>
    );
  }

  // New Application Form
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Multi-Vendor Retailer Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Launch Your Store on Nexus Marketplace
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Reach verified smartphone and technology buyers nationwide. Create your dedicated branded storefront, manage stock, and receive automated settlement payouts.
          </p>
        </div>

        {/* Benefits Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 border-border/80 bg-card rounded-xl text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
              <Store className="h-5 w-5" />
            </div>
            <h4 className="text-xs font-bold text-foreground">Branded Storefront</h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              Custom /store/:slug URL, banner & logo branding
            </p>
          </Card>
          <Card className="p-4 border-border/80 bg-card rounded-xl text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-xs font-bold text-foreground">Verified Retailer</h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              Strict fraud/quality gates ensure high customer trust
            </p>
          </Card>
          <Card className="p-4 border-border/80 bg-card rounded-xl text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
              <IndianRupee className="h-5 w-5" />
            </div>
            <h4 className="text-xs font-bold text-foreground">Transparent Payouts</h4>
            <p className="text-[11px] text-muted-foreground mt-1">
              Real-time ledger and direct bank settlements
            </p>
          </Card>
        </div>

        {/* Registration Form */}
        <SellerApplicationForm
          storeName={storeName}
          setStoreName={setStoreName}
          description={description}
          setDescription={setDescription}
          businessEmail={businessEmail}
          setBusinessEmail={setBusinessEmail}
          businessPhone={businessPhone}
          setBusinessPhone={setBusinessPhone}
          gstNumber={gstNumber}
          setGstNumber={setGstNumber}
          accountHolderName={accountHolderName}
          setAccountHolderName={setAccountHolderName}
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          ifsc={ifsc}
          setIfsc={setIfsc}
          upiId={upiId}
          setUpiId={setUpiId}
          logoFile={logoFile}
          setLogoFile={setLogoFile}
          bannerFile={bannerFile}
          setBannerFile={setBannerFile}
          submitting={submitting}
          onSubmit={handleSubmit}
          isResubmission={false}
        />
      </div>
    </div>
  );
}

// Subcomponent form
function SellerApplicationForm(props: {
  storeName: string;
  setStoreName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  businessEmail: string;
  setBusinessEmail: (v: string) => void;
  businessPhone: string;
  setBusinessPhone: (v: string) => void;
  gstNumber: string;
  setGstNumber: (v: string) => void;
  accountHolderName: string;
  setAccountHolderName: (v: string) => void;
  accountNumber: string;
  setAccountNumber: (v: string) => void;
  ifsc: string;
  setIfsc: (v: string) => void;
  upiId: string;
  setUpiId: (v: string) => void;
  logoFile: File | null;
  setLogoFile: (f: File | null) => void;
  bannerFile: File | null;
  setBannerFile: (f: File | null) => void;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  isResubmission: boolean;
}) {
  return (
    <form onSubmit={props.onSubmit} className="space-y-6">
      {/* 1. Store Details */}
      <Card className="border-border bg-card rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">1. Store & Business Profile</CardTitle>
          </div>
          <CardDescription>
            Your store name will be shown on product pages and forms your public storefront URL.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs font-bold text-foreground block mb-1.5">
              Store Name <span className="text-destructive">*</span>
            </label>
            <Input
              required
              placeholder="e.g. Apex Tech Retail"
              value={props.storeName}
              onChange={(e) => props.setStoreName(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1.5">
              Store Description <span className="text-destructive">*</span>
            </label>
            <Textarea
              required
              rows={3}
              placeholder="Tell buyers about your catalog, brand warranty, and expertise..."
              value={props.description}
              onChange={(e) => props.setDescription(e.target.value)}
              className="rounded-xl resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Business Email <span className="text-destructive">*</span>
              </label>
              <Input
                type="email"
                required
                placeholder="seller@yourstore.com"
                value={props.businessEmail}
                onChange={(e) => props.setBusinessEmail(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Business Phone / WhatsApp <span className="text-destructive">*</span>
              </label>
              <Input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={props.businessPhone}
                onChange={(e) => props.setBusinessPhone(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground block mb-1.5">
              GST Number (Optional)
            </label>
            <Input
              placeholder="22AAAAA0000A1Z5"
              value={props.gstNumber}
              onChange={(e) => props.setGstNumber(e.target.value.toUpperCase())}
              className="h-11 rounded-xl font-mono uppercase"
            />
          </div>
        </CardContent>
      </Card>

      {/* 2. Store Media Branding */}
      <Card className="border-border bg-card rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">2. Branding & Media (Optional)</CardTitle>
          </div>
          <CardDescription>
            Upload your official retailer logo and storefront banner. You can also customize this anytime later.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition">
            <p className="text-xs font-bold text-foreground mb-1">Store Logo (1:1)</p>
            <p className="text-[11px] text-muted-foreground mb-3">Square image, max 5MB</p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => props.setLogoFile(e.target.files?.[0] || null)}
              className="text-xs"
            />
          </div>
          <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition">
            <p className="text-xs font-bold text-foreground mb-1">Store Banner (16:9)</p>
            <p className="text-[11px] text-muted-foreground mb-3">Landscape banner, max 5MB</p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => props.setBannerFile(e.target.files?.[0] || null)}
              className="text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* 3. Bank & Settlement Details */}
      <Card className="border-border bg-card rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">3. Bank Settlement Details</CardTitle>
          </div>
          <CardDescription>
            Your account numbers are encrypted with AES-256-GCM and never shared publicly. Payouts for fulfilled orders settle here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Account Holder Name <span className="text-destructive">*</span>
              </label>
              <Input
                required
                placeholder="Full name as per bank records"
                value={props.accountHolderName}
                onChange={(e) => props.setAccountHolderName(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Bank Account Number <span className="text-destructive">*</span>
              </label>
              <Input
                required
                type="password"
                placeholder="Enter bank account number"
                value={props.accountNumber}
                onChange={(e) => props.setAccountNumber(e.target.value)}
                className="h-11 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                Bank IFSC Code <span className="text-destructive">*</span>
              </label>
              <Input
                required
                placeholder="e.g. HDFC0001234"
                value={props.ifsc}
                onChange={(e) => props.setIfsc(e.target.value.toUpperCase())}
                className="h-11 rounded-xl font-mono uppercase"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                UPI ID (Optional for fast payouts)
              </label>
              <Input
                placeholder="yourname@upi"
                value={props.upiId}
                onChange={(e) => props.setUpiId(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        disabled={props.submitting}
        className="w-full h-12 text-sm font-bold rounded-xl shadow-md"
      >
        {props.submitting
          ? "Submitting Application..."
          : props.isResubmission
          ? "Resubmit Seller Application"
          : "Submit Seller Application"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}

export default BecomeSellerPage;
