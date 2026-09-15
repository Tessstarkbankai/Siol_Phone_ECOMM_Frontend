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

export type AdminCommunityImage = {
  _id: string;
  imageUrl: string;
  imagePublicId?: string;
  title: string;
  hashtag?: string;
  link?: string;
  order: number;
  createdAt: string;
};

export type AdminCommunityResponse = {
  items: AdminCommunityImage[];
};

