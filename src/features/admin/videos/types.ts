export type AdminVideo = {
  _id: string;
  title: string;
  videoUrl: string;
  videoPublicId?: string;
  caption?: string;
  productLink?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt?: string;
};

export type CreateVideoBody = {
  title: string;
  caption?: string;
  productLink?: string;
  videoUrl?: string;
};
