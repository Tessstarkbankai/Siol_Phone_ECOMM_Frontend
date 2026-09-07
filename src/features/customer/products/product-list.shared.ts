import type { CustomerProduct } from "./types";

export const BRAND_OPTIONS = [
  "Apple",
  "Samsung",
  "Google",
  "OnePlus",
  "Xiaomi",
  "Nothing",
  "ASUS",
  "Anker",
  "Baseus",
  "Sony",
  "Motorola",
  "Vivo",
  "Realme",
];

export const SIZE_OPTIONS = ["128GB", "256GB", "512GB", "1TB", "2TB", "S", "M", "L"] as const;

const COLOR_MAP: Record<string, string> = {
  "titanium black": "#1c1c1e",
  "natural titanium": "#9f9c96",
  "desert titanium": "#d4c7b8",
  "white titanium": "#e3e4e5",
  "black titanium": "#242526",
  "titanium gray": "#717378",
  "titanium violet": "#4b4453",
  "titanium yellow": "#f2ebd9",
  "phantom black": "#111111",
  "silver shadow": "#b8c0c8",
  "obsidian": "#1f2022",
  "porcelain": "#f0ede6",
  "hazel": "#7d837f",
  "emerald green": "#2e473b",
  "midnight black": "#1a1a1a",
  "glacier white": "#f5f5f7",
  "space gray": "#48494b",
  "black": "#111111",
  "white": "#f5f5f5",
  "grey": "#6b7280",
  "gray": "#6b7280",
  "blue": "#2563eb",
  "navy": "#1c2430",
  "pink": "#e8d4d8",
  "orange": "#d97706",
  "gold": "#d4af37",
  "silver": "#c0c0c0",
};

export type FacetKey = "category" | "brand" | "color" | "size";

export type CustomerProductFilters = {
  category: string;
  brand: string;
  color: string;
  size: string;
};

export type ActiveFilterBadge = {
  key: FacetKey;
  label: string;
  value: string;
};

export function getCoverImage(product: CustomerProduct) {
  return (
    product.images.find((item) => item.isCover)?.url ||
    product.images[0].url ||
    ""
  );
}

export function extractSalePrice(product: CustomerProduct) {
  if (!product.salePercentage) return product.price;

  return Math.round(
    product.price - (product.price * product.salePercentage) / 100,
  );
}

export function getSwatchColor(color: string) {
  const normalized = color.trim().toLowerCase();

  return COLOR_MAP[normalized] || color;
}
