import { useEffect, useState } from "react";
import type { Product, ProductFormState, ProductImage } from "@/features/admin/products/types";
import { createVendorProduct, updateVendorProduct } from "./api";
import { toast } from "sonner";

type UseVendorProductFormOptions = {
  open: boolean;
  product: Product | null;
  onSaved: () => Promise<void>;
  onClose: () => void;
};

function getEmptyForm(): ProductFormState {
  return {
    title: "",
    description: "",
    category: "",
    brand: "",
    colors: [],
    sizes: [],
    price: "",
    salePercentage: "0",
    isSpotlight: false,
    stock: "",
    status: "active",
    existingImages: [],
    newFiles: [],
    coverImagePublicId: "",
    existingBanners: [],
    newBannerFiles: [],
  };
}

export function getCoverImage(images: ProductImage[] = []) {
  return images.find((img) => img.isCover) ?? images[0];
}

function mapProductToFormValues(product: Product): ProductFormState {
  const cover = getCoverImage(product.images);

  return {
    title: product.title,
    description: product.description,
    category: product.category?._id || "",
    brand: product.brand,
    colors: product.colors ?? [],
    sizes: product.sizes ?? [],
    price: String(product.price),
    salePercentage: String(product.salePercentage ?? 0),
    isSpotlight: Boolean(product.isSpotlight),
    stock: String(product.stock),
    status: product.status,
    existingImages: product.images ?? [],
    newFiles: [],
    coverImagePublicId: cover?.publicId ?? "",
    existingBanners: product.showcaseBanners ?? [],
    newBannerFiles: [],
  };
}

export function useVendorProductForm({
  open,
  product,
  onSaved,
  onClose,
}: UseVendorProductFormOptions) {
  const [formValues, setFormValues] = useState<ProductFormState>(getEmptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (product) {
      setFormValues(mapProductToFormValues(product));
      return;
    }

    setFormValues(getEmptyForm());
  }, [open, product]);

  const updateField = <K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K],
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleSize = (size: string) => {
    setFormValues((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((item) => item !== size)
        : [...prev.sizes, size],
    }));
  };

  const addColor = (color: string) => {
    setFormValues((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors
        : [...prev.colors, color],
    }));
  };

  const removeColor = (color: string) => {
    setFormValues((prev) => ({
      ...prev,
      colors: prev.colors.filter((item) => item !== color),
    }));
  };

  const addFiles = (files: FileList | null) => {
    if (!files?.length) return;
    setFormValues((prev) => ({
      ...prev,
      newFiles: [...prev.newFiles, ...Array.from(files)],
    }));
  };

  const addBannerFiles = (files: FileList | null) => {
    if (!files?.length) return;
    setFormValues((prev) => ({
      ...prev,
      newBannerFiles: [...prev.newBannerFiles, ...Array.from(files)],
    }));
  };

  const removeNewBannerFile = (index: number) => {
    setFormValues((prev) => ({
      ...prev,
      newBannerFiles: prev.newBannerFiles.filter((_, i) => i !== index),
    }));
  };

  const removeExistingBanner = (publicId: string) => {
    setFormValues((prev) => ({
      ...prev,
      existingBanners: prev.existingBanners.filter((b) => b.publicId !== publicId),
    }));
  };

  const removeExistingImage = (publicId: string) => {
    setFormValues((prev) => {
      const nextImages = prev.existingImages.filter(
        (image) => image.publicId !== publicId,
      );
      const nextCoverImageId =
        prev.coverImagePublicId === publicId
          ? (nextImages[0]?.publicId ?? "")
          : prev.coverImagePublicId;

      return {
        ...prev,
        existingImages: nextImages,
        coverImagePublicId: nextCoverImageId,
      };
    });
  };

  const changeCoverImage = (publicId: string) => {
    updateField("coverImagePublicId", publicId);
  };

  const submit = async () => {
    try {
      setLoading(true);

      const price = Number(formValues.price);
      const stock = Number(formValues.stock);
      const salePercentage = Number(formValues.salePercentage || "0");

      if (!formValues.title.trim()) throw new Error("Title is required");
      if (!formValues.description.trim()) throw new Error("Description is required");
      if (!formValues.category) throw new Error("Category is required");
      if (!formValues.brand) throw new Error("Brand is required");
      if (Number.isNaN(price) || price <= 0) throw new Error("Enter a valid price");
      if (Number.isNaN(stock) || stock < 0) throw new Error("Enter valid stock count");

      const hasImages =
        formValues.existingImages.length > 0 || formValues.newFiles.length > 0;

      if (!hasImages) throw new Error("At least one product image is required");

      const formData = new FormData();
      formData.append("title", formValues.title.trim());
      formData.append("description", formValues.description.trim());
      formData.append("category", formValues.category);
      formData.append("brand", formValues.brand);
      formData.append("price", String(price));
      formData.append("salePercentage", String(salePercentage));
      formData.append("stock", String(stock));
      formData.append("status", formValues.status);
      formData.append("isSpotlight", String(formValues.isSpotlight));

      formValues.colors.forEach((c) => formData.append("colors", c));
      formValues.sizes.forEach((s) => formData.append("sizes", s));

      if (formValues.coverImagePublicId) {
        formData.append("coverImagePublicId", formValues.coverImagePublicId);
      }

      formValues.existingImages.forEach((img) => {
        formData.append("existingImages", JSON.stringify(img));
      });

      formValues.newFiles.forEach((file) => {
        formData.append("images", file);
      });

      if (formValues.existingBanners.length > 0) {
        formData.append("existingBanners", JSON.stringify(formValues.existingBanners));
      }

      formValues.newBannerFiles.forEach((file) => {
        formData.append("bannerImages", file);
      });

      if (product) {
        await updateVendorProduct(product._id, formData);
        toast.success("Product updated! If rejected previously, it is now pending review.");
      } else {
        await createVendorProduct(formData);
        toast.success("Product submitted successfully! It is now pending admin review.");
      }

      await onSaved();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
