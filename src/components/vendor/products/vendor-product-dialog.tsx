import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BRANDS } from "@/features/admin/products/constants";
import type {
  Category,
  Product,
  ProductStatus,
} from "@/features/admin/products/types";
import { ColorPicker } from "@/components/admin/products/color-picker";
import { SizeSelector } from "@/components/admin/products/size-selector";
import { ImagePicker } from "@/components/admin/products/image-picker";
import { BannerPicker } from "@/components/admin/products/banner-picker";
import { Button } from "@/components/ui/button";
import { useVendorProductForm } from "@/features/vendor/use-vendor-product-form";
import { createVendorCategory, getVendorBrands } from "@/features/vendor/api";
import { Plus } from "lucide-react";
import { toast } from "sonner";

type VendorProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  product: Product | null;
  onSaved: () => Promise<void>;
  onCategoryAdded?: (newCategory: Category) => void;
};

export function VendorProductDialog({
  open,
  onOpenChange,
  categories,
  product,
  onSaved,
  onCategoryAdded,
}: VendorProductDialogProps) {
  const isEditing = Boolean(product);

  const [localCategories, setLocalCategories] = useState<Category[]>(categories);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [addingCategoryLoading, setAddingCategoryLoading] = useState(false);

  const [brandsList, setBrandsList] = useState<string[]>([...BRANDS]);
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const serverBrands = await getVendorBrands();
        if (serverBrands && serverBrands.length > 0) {
          setBrandsList((prev) =>
            Array.from(new Set([...prev, ...serverBrands])).sort((a, b) =>
              a.localeCompare(b),
            ),
          );
        }
      } catch (err) {
        // fallback to standard BRANDS list
      }
    }
    void fetchBrands();
  }, []);

  const {
    formValues,
    loading,
    updateField,
    toggleSize,
    addColor,
    removeColor,
    addFiles,
    addBannerFiles,
    removeNewBannerFile,
    removeExistingBanner,
    removeExistingImage,
    changeCoverImage,
    submit,
  } = useVendorProductForm({
    open,
    product,
    onSaved,
    onClose: () => onOpenChange(false),
  });

  // Ensure current product brand is in the brands list if editing
  useEffect(() => {
    if (formValues.brand && !brandsList.includes(formValues.brand)) {
      setBrandsList((prev) => [formValues.brand, ...prev]);
    }
  }, [formValues.brand, brandsList]);

  async function handleSaveNewCategory() {
    const trimmed = newCategoryName.trim();
    if (!trimmed) {
      toast.error("Please enter a category name");
      return;
    }
    try {
      setAddingCategoryLoading(true);
      const created = await createVendorCategory(trimmed);
      if (created) {
        setLocalCategories((prev) => {
          if (prev.some((c) => c._id === created._id)) return prev;
          return [...prev, created].sort((a, b) => a.name.localeCompare(b.name));
        });
        onCategoryAdded?.(created);
        updateField("category", created._id);
        toast.success(`Category "${created.name}" added and selected!`);
        setNewCategoryName("");
        setIsAddingCategory(false);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create category");
    } finally {
      setAddingCategoryLoading(false);
    }
  }

  function handleSaveNewBrand() {
    const trimmed = newBrandName.trim();
    if (!trimmed) {
      toast.error("Please enter a brand name");
      return;
    }
    setBrandsList((prev) => {
      if (prev.includes(trimmed)) return prev;
      return [...prev, trimmed].sort((a, b) => a.localeCompare(b));
    });
    updateField("brand", trimmed);
    toast.success(`Brand "${trimmed}" selected!`);
    setNewBrandName("");
    setIsAddingBrand(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-4xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Edit Product" : "Submit New Product Listing"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          {/* Section 1: Basic Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-xs font-bold">
                Product Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={formValues.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="e.g. iPhone 16 Pro Max 256GB"
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="category" className="text-xs font-bold">
                  Category <span className="text-destructive">*</span>
                </Label>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory((v) => !v)}
                  className="text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  {isAddingCategory ? "Cancel" : "Add Category"}
                </button>
              </div>

              {isAddingCategory ? (
                <div className="flex items-center gap-2 p-1.5 rounded-xl bg-muted/40 border border-border">
                  <Input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="New category name..."
                    className="h-8 text-xs rounded-lg flex-1"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        void handleSaveNewCategory();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    disabled={addingCategoryLoading}
                    onClick={() => void handleSaveNewCategory()}
                    className="h-8 text-xs rounded-lg px-3 font-semibold"
                  >
                    {addingCategoryLoading ? "Saving..." : "Add"}
                  </Button>
                </div>
              ) : (
                <Select
                  value={formValues.category}
                  onValueChange={(val) => {
                    if (val === "__add_new_cat__") {
                      setIsAddingCategory(true);
                    } else {
                      updateField("category", val);
                    }
                  }}
                >
                  <SelectTrigger id="category" className="h-10 text-xs rounded-xl">
                    <SelectValue placeholder={localCategories.length > 0 ? "Select Category" : "No categories yet (Click Add)"} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl max-h-60">
                    {localCategories.map((c) => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}
                    <SelectItem
                      value="__add_new_cat__"
                      className="text-primary font-semibold border-t border-border mt-1 cursor-pointer"
                    >
                      + Add New Category...
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-xs font-bold">
              Product Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              rows={3}
              value={formValues.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Provide technical specifications, warranty details, and box contents..."
              className="text-xs rounded-xl resize-none"
            />
          </div>

          {/* Section 2: Pricing, Stock & Brand */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="brand" className="text-xs font-bold">
                  Brand <span className="text-destructive">*</span>
                </Label>
                <button
                  type="button"
                  onClick={() => setIsAddingBrand((v) => !v)}
                  className="text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  {isAddingBrand ? "Cancel" : "Add Brand"}
                </button>
              </div>

              {isAddingBrand ? (
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted/40 border border-border">
                  <Input
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="Brand name..."
                    className="h-8 text-xs rounded-lg flex-1"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSaveNewBrand();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSaveNewBrand}
                    className="h-8 text-xs rounded-lg px-2.5 font-semibold"
                  >
                    Add
                  </Button>
                </div>
              ) : (
                <Select
                  value={formValues.brand}
                  onValueChange={(val) => {
                    if (val === "__add_new_brand__") {
                      setIsAddingBrand(true);
                    } else {
                      updateField("brand", val);
                    }
                  }}
                >
                  <SelectTrigger id="brand" className="h-10 text-xs rounded-xl">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl max-h-60">
                    {brandsList.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                    <SelectItem
                      value="__add_new_brand__"
                      className="text-primary font-semibold border-t border-border mt-1 cursor-pointer"
                    >
                      + Add New Brand...
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="price" className="text-xs font-bold">
                Price (₹) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                min={1}
                value={formValues.price}
                onChange={(e) => updateField("price", e.target.value)}
                placeholder="₹ Retail Price"
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="salePercentage" className="text-xs font-bold">
                Discount (%)
              </Label>
              <Input
                id="salePercentage"
                type="number"
                min={0}
                max={99}
                value={formValues.salePercentage}
                onChange={(e) => updateField("salePercentage", e.target.value)}
                placeholder="0"
                className="h-10 text-xs rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="stock" className="text-xs font-bold">
                Stock Units <span className="text-destructive">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                min={0}
                value={formValues.stock}
                onChange={(e) => updateField("stock", e.target.value)}
                placeholder="Inventory"
                className="h-10 text-xs rounded-xl"
              />
            </div>
          </div>

          {/* Section 3: Colors and Storage Variants */}
          <div className="grid gap-6 md:grid-cols-2">
            <ColorPicker
              colors={formValues.colors}
              onAdd={addColor}
              onRemove={removeColor}
            />
            <SizeSelector
              selectedSizes={formValues.sizes}
              onToggle={toggleSize}
            />
          </div>

          {/* Section 4: Image Upload */}
          <ImagePicker
            existingImages={formValues.existingImages}
            newFiles={formValues.newFiles}
            coverImagePublicId={formValues.coverImagePublicId}
            onFilesAdd={addFiles}
            onExistingRemove={removeExistingImage}
            onCoverImageChange={changeCoverImage}
          />

          {/* Section 4.5: Showcase Banners */}
          <BannerPicker
            existingBanners={formValues.existingBanners}
            newBannerFiles={formValues.newBannerFiles}
            onFilesAdd={addBannerFiles}
            onExistingRemove={removeExistingBanner}
            onNewFileRemove={removeNewBannerFile}
          />

          {/* Section 5: Status */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-border">
            <div>
              <Label className="text-xs font-bold text-foreground block">
                Catalog Visibility
              </Label>
              <p className="text-[11px] text-muted-foreground">
                Active products become live once approved by moderation.
              </p>
            </div>
            <RadioGroup
              value={formValues.status}
              onValueChange={(val) => updateField("status", val as ProductStatus)}
              className="flex items-center gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" />
                <Label htmlFor="active" className="text-xs font-medium cursor-pointer">
                  Active
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inactive" id="inactive" />
                <Label htmlFor="inactive" className="text-xs font-medium cursor-pointer">
                  Draft / Inactive
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="rounded-xl text-xs"
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={loading}
              onClick={() => void submit()}
              className="rounded-xl text-xs font-bold"
            >
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Listing"
                : "Submit for Approval"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VendorProductDialog;
