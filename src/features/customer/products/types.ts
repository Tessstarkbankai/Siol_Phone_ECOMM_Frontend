export type ProductSize =
  | "64GB"
  | "128GB"
  | "256GB"
  | "512GB"
  | "1TB"
  | "2TB"
  | "S"
  | "M"
  | "L"
  | "XL"
  | string;

export type ProductSort = "price-low" | "price-high" | "recent" | string;

export type ProductCategory = {
  _id: string;
  name: string;
};

export type ProductImage = {
  url: string;
  publicId: string;
  isCover: boolean;
};

export type CustomerProduct = {
  _id: string;
  title: string;
  description: string;
  category: ProductCategory;
  brand: string;
  stock: number;
  images: ProductImage[];
  colors: string[];
  sizes: ProductSize[];
  price: number;
  salePercentage: number;
  status: "active" | "inactive";
  showcaseBanners?: Array<{ url: string; publicId: string }>;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
};

export type GetCustomerProductsParams = {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  sort?: ProductSort;
  search?: string;
};

export type CustomerProductDetailsResponse = {
  product: CustomerProduct;
  relatedProducts: CustomerProduct[];
};
