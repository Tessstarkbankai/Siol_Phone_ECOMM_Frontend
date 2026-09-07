import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Store,
  Upload,
  ExternalLink,
  Save,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Commonloader } from "@/components/common/Loader";
import { toast } from "sonner";
import {
  getVendorProfile,
  updateVendorProfile,
  type VendorProfile,
} from "@/features/vendor/api";

export function VendorProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<VendorProfile | null>(null);

  const [description, setDescription] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");

  useEffect(() => {
    void loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      const res = await getVendorProfile();
      if (res) {
        setProfile(res);
        setDescription(res.description || "");
        setBusinessPhone(res.businessPhone || "");
        setBusinessEmail(res.businessEmail || "");
        if (res.storeLogo?.url) setLogoPreview(res.storeLogo.url);
        if (res.storeBanner?.url) setBannerPreview(res.storeBanner.url);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load store profile");
    } finally {
      setLoading(false);
    }
  }

  function handleLogoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  }

  function handleBannerSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append("description", description.trim());
      formData.append("businessPhone", businessPhone.trim());
      formData.append("businessEmail", businessEmail.trim());

      if (logoFile) formData.append("storeLogo", logoFile);
      if (bannerFile) formData.append("storeBanner", bannerFile);

      const res = await updateVendorProfile(formData);
      toast.success(res.message || "Storefront profile updated successfully");
      if (res.vendor) {
        setProfile(res.vendor);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !profile) {
    return (
      <div className="p-8">
        <Commonloader />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            Storefront Branding & Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Customize your public store page, brand logos, hero banners, and customer contact details.
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
          <Link to={`/store/${profile.storeSlug}`} target="_blank">
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            View Live Store
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Visual Branding Section */}
        <Card className="border-border bg-card rounded-2xl shadow-xs overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base">Storefront Visuals</CardTitle>
            <CardDescription>
              Your store banner and logo will be featured prominently on your public storefront page and product cards.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Banner Preview & Upload */}
            <div>
              <label className="text-xs font-bold text-foreground block mb-2">
                Storefront Hero Banner (16:9 or 3:1)
              </label>
              <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-border bg-secondary/50 flex items-center justify-center group">
                {bannerPreview ? (
                  <img
                    src={bannerPreview}
                    alt="Store banner"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Store className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">No banner uploaded yet</span>
                  </div>
                )}
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer text-white text-xs font-bold gap-2">
                  <Upload className="h-4 w-4" />
                  Change Storefront Banner
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerSelect}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Logo Preview & Upload */}
            <div className="flex items-center gap-5">
              <div className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-border bg-secondary shrink-0 group flex items-center justify-center shadow-xs">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Store logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-bold text-primary">
                    {profile.storeName.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer text-white">
                  <Upload className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoSelect}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Store Logo Icon</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Square image (PNG, JPG or WEBP). Hover on the logo box to upload a replacement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store Information */}
        <Card className="border-border bg-card rounded-2xl shadow-xs">
          <CardHeader>
            <CardTitle className="text-base">Store Details & Public Bio</CardTitle>
            <CardDescription>
              Basic information shown to customers visiting your dedicated store page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Store Name
                </label>
                <Input
                  disabled
                  value={profile.storeName}
                  className="h-10 text-xs bg-secondary/50 rounded-xl"
                />
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  Store name is verified upon onboarding. Contact support to rename.
                </span>
              </div>
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Public Store URL
                </label>
                <Input
                  disabled
                  value={`/store/${profile.storeSlug}`}
                  className="h-10 text-xs font-mono bg-secondary/50 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground block mb-1.5">
                About Your Store & Catalog
              </label>
              <Textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share your brand story, warranties provided, and shipping guarantees..."
                className="text-xs rounded-xl resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Customer Support Email
                </label>
                <Input
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="h-10 text-xs rounded-xl"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Customer Support Phone
                </label>
                <Input
                  type="tel"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="h-10 text-xs rounded-xl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="rounded-xl text-xs font-bold h-10 px-6 shadow-sm"
          >
            <Save className="h-4 w-4 mr-1.5" />
            {saving ? "Saving Changes..." : "Save Storefront Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default VendorProfilePage;
