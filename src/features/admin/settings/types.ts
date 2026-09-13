export type AdminBanner = {
  _id: string;
  mediaType: "image" | "video";
  imageUrl?: string;
  imagePublicId?: string;
  videoUrl?: string;
  videoPublicId?: string;
  title?: string;
  tagline?: string;
  link?: string;
  order: number;
  createdAt: string;
};

export type AdminBannersResponse = {
  items: AdminBanner[];
};

