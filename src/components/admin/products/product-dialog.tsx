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
import { ColorPicker } from "./color-picker";
import { SizeSelector } from "./size-selector";
import { ImagePicker } from "./image-picker";
import { BannerPicker } from "./banner-picker";
import { Button } from "@/components/ui/button";
import { useProductForm } from "@/features/admin/products/use-product-form";

type ProductDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  product: Product | null;
  onSaved: () => Promise<void>;
};

const dialogContentClass = "max-h-[92vh] overflow-y-auto sm:max-w-4xl";

const contentWrapClass = "grid gap-6";

const twoColumnGridClass = "grid gap-4 md:grid-cols-2";

const threeColumnGridClass = "grid gap-4 md:grid-cols-3";

const fieldGroupClass = "space-y-2";

const sectionGridClass = "grid gap-6 md:grid-cols-2";

const statusGroupClass =
  "flex gap-6 rounded-xl border border-border bg-card px-4 py-3";

const statusItemClass = "flex items-center space-x-2";

const actionsRowClass = "flex justify-end gap-3";

export function ProductDialog({
  open,
  onOpenChange,
  categories,
  product,
  onSaved,
}: ProductDialogProps) {
  const {
    form,
    saving,
    isEditMode,
    updateField,
    toggleSize,
    addColor,
    removeColor,
    addFiles,
    addBannerFiles,
    removeNewBannerFile,
    removeExistingBanner,
    submit,
    removeExistingImage,
    changeCoverImage,
  } = useProductForm({
    open,
    onClose: () => onOpenChange(false),
    onSaved,
    product,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={dialogContentClass}>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Update Product" : "Create Product"}
          </DialogTitle>
        </DialogHeader>
        <div className={contentWrapClass}>
          <div className={twoColumnGridClass}>
            <div className={fieldGroupClass}>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Title"
              />
            </div>

            <div className={fieldGroupClass}>
              <Label>Brand</Label>
              <Select
                value={form.brand}
                onValueChange={(val) => updateField("brand", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>

                <SelectContent>
                  {BRANDS.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className={fieldGroupClass}>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              rows={5}
              placeholder="Description"
            />
          </div>

          <div className={twoColumnGridClass}>
            <div className={fieldGroupClass}>
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(val) => updateField("category", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className={fieldGroupClass}>
              <Label>Status</Label>
              <RadioGroup
                value={form.status}
                onValueChange={(value) =>
                  updateField("status", value as ProductStatus)
                }
                className={statusGroupClass}
              >
                <div className={statusItemClass}>
                  <RadioGroupItem value="active" id="product-status-active" />
                  <Label htmlFor="product-status-active">Active</Label>
                </div>

                <div className={statusItemClass}>
                  <RadioGroupItem
                    value="inactive"
                    id="product-status-inactive"
                  />
                  <Label htmlFor="product-status-inactive">Inactive</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-3 rounded-xl border border-amber-300 bg-amber-50/70 p-3.5 cursor-pointer hover:bg-amber-50 transition shadow-xs">
                <input
                  type="checkbox"
                  checked={form.isSpotlight}
                  onChange={(e) => updateField("isSpotlight", e.target.checked)}
                  className="h-4 w-4 rounded border-amber-400 text-primary focus:ring-primary accent-primary"
                />
                <div>
                  <p className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                    <span className="text-amber-600 font-extrabold">★</span>
                    Mark as Spotlight Innovation Product
                  </p>
                  <p className="text-[11px] text-neutral-600">
                    When enabled, this product dynamically appears in the Hero Magic Showcase cards section on the homepage.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className={threeColumnGridClass}>
            <div className={fieldGroupClass}>
              <Label>Price</Label>
              <Input
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                type="number"
                min="0"
                placeholder="0"
              />
            </div>

            <div className={fieldGroupClass}>
              <Label>Sale Percentage</Label>
              <Input
                value={form.salePercentage}
                onChange={(e) => updateField("salePercentage", e.target.value)}
                type="number"
                min="0"
                placeholder="0"
              />
            </div>

            <div className={fieldGroupClass}>
              <Label>Stock</Label>
              <Input
                value={form.stock}
                onChange={(e) => updateField("stock", e.target.value)}
                type="number"
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className={sectionGridClass}>
            <ColorPicker
              colors={form.colors}
              onAdd={addColor}
              onRemove={removeColor}
            />

            <SizeSelector selectedSizes={form.sizes} onToggle={toggleSize} />
          </div>

          <ImagePicker
            existingImages={form.existingImages}
            newFiles={form.newFiles}
            coverImagePublicId={form.coverImagePublicId}
            onFilesAdd={addFiles}
            onExistingRemove={removeExistingImage}
            onCoverImageChange={changeCoverImage}
          />

          <BannerPicker
            existingBanners={form.existingBanners}
            newBannerFiles={form.newBannerFiles}
            onFilesAdd={addBannerFiles}
            onExistingRemove={removeExistingBanner}
            onNewFileRemove={removeNewBannerFile}
          />

          <div className={actionsRowClass}>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button onClick={submit} disabled={saving}>
              {saving
                ? "Saving..."
                : isEditMode
                  ? "Update Product"
                  : "Create Product"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
