export type CustomerHomeBanner = {
  _id: string;
  mediaType?: "image" | "video";
  imageUrl?: string;
  videoUrl?: string;
  title?: string;
  tagline?: string;
  link?: string;
  order?: number;
  createdAt: string;
};

export type CustomerHomeCategory = {
  _id: string;
  name: string;
};

export type CustomerHomeProduct = {
  _id: string;
  title: string;
  description?: string;
  brand: string;
  image: string;
  price: number;
  finalPrice: number;
  salePercentage: number;
  stock?: number;
  colors?: string[];
  sizes?: string[];
  createdAt: string;
};

export type CustomerHomeCoupon = {
  _id: string;
  code: string;
  percentage: number;
  count: number;
  minimumOrderValue: number;
  endsAt: string;
};

export type CustomerHomeVideo = {
  _id: string;
  title: string;
  videoUrl: string;
  caption?: string;
  productLink?: string;
  createdAt: string;
};

export type CustomerHomeResponse = {
  banners: CustomerHomeBanner[];
  categories: CustomerHomeCategory[];
  recentProducts: CustomerHomeProduct[];
  spotlightProducts: CustomerHomeProduct[];
  coupons: CustomerHomeCoupon[];
  videos: CustomerHomeVideo[];
};
