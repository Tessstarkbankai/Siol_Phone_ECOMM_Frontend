export type Category = {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductImage = {
  url: string;
  publicId: string;
  isCover: boolean;
};

export type ProductCategory = {
  _id: string;
  name: string;
};

export type ProductStatus = "active" | "inactive";

export type Product = {
  _id: string;
  title: string;
  description: string;
  brand: string;
  category: ProductCategory;
  images: ProductImage[];
  colors: string[];
  sizes: string[];
  price: number;
  salePercentage: number;
  isSpotlight?: boolean;
  stock: number;
  status: ProductStatus;
  showcaseBanners?: Array<{ url: string; publicId: string }>;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateCategoryBody = {
  name: string;
};

export type UpdateCategoryBody = {
  name: string;
};

export type CreateProductBody = {
  title: string;
  description: string;
  category: string;
  brand: string;
  colors: string[];
  sizes: string[];
  price: number;
  salePercentage: number;
  isSpotlight?: boolean;
  stock: number;
  status: ProductStatus;
  existingBanners?: Array<{ url: string; publicId: string }>;
};

export type UpdateProductBody = {
  title: string;
  description: string;
  category: string;
  brand: string;
  colors: string[];
  sizes: string[];
  price: number;
  salePercentage: number;
  isSpotlight?: boolean;
  stock: number;
  status: ProductStatus;
  existingImages?: ProductImage[];
  coverImagePublicId?: string;
  existingBanners?: Array<{ url: string; publicId: string }>;
};

export type ProductFormState = {
  title: string;
  description: string;
  category: string;
  brand: string;
  colors: string[];
  sizes: string[];
  price: string;
  salePercentage: string;
  isSpotlight: boolean;
  stock: string;
  status: ProductStatus;
  existingImages: ProductImage[];
  newFiles: File[];
  coverImagePublicId: string;
  existingBanners: Array<{ url: string; publicId: string }>;
  newBannerFiles: File[];
};
