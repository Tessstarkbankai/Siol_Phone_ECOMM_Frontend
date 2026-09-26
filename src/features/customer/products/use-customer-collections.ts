import type { Category } from "@/features/admin/products/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type {
  CustomerProduct,
  GetCustomerProductsParams,
  ProductSort,
} from "./types";
import type {
  ActiveFilterBadge,
  CustomerProductFilters,
  FacetKey,
} from "./product-list.shared";
import { getCustomerCategories, getCustomerProducts } from "./api";

export function useCustomerProductList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<CustomerProduct[]>([]);
  const [availableColors, setAvailableColors] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const rawCategory = searchParams.get("category") || "";

  const resolvedCategory = useMemo(() => {
    if (!rawCategory) return "";
    if (categories.some((c) => c._id === rawCategory)) return rawCategory;
    const lower = rawCategory.toLowerCase().replace(/[-_]/g, " ");
    const matched = categories.find((c) => {
      const catLower = c.name.toLowerCase();
      if (catLower === lower) return true;
      if (lower.includes("smart") && catLower.includes("smart")) return true;
      if (lower.includes("feature") && catLower.includes("feature")) return true;
      if (
        (lower.includes("tablet") || lower.includes("laptop")) &&
        (catLower.includes("tablet") || catLower.includes("laptop"))
      )
        return true;
      if (
        (lower.includes("audio") || lower.includes("bud") || lower.includes("wearable")) &&
        (catLower.includes("audio") || catLower.includes("bud"))
      )
        return true;
      return false;
    });
    return matched ? matched._id : rawCategory;
  }, [rawCategory, categories]);

  const filters = useMemo<CustomerProductFilters>(
    () => ({
      category: resolvedCategory,
      brand: searchParams.get("brand") || "",
      color: searchParams.get("color") || "",
      size: searchParams.get("size") || "",
    }),
    [resolvedCategory, searchParams],
  );

  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") as ProductSort) || "recent";

  const query = useMemo<GetCustomerProductsParams>(
    () => ({
      category: filters.category || undefined,
      brand: filters.brand || undefined,
      color: filters.color || undefined,
      sort,
      size: filters.size || undefined,
      search: search || undefined,
    }),
    [filters, sort, search],
  );

  const hasActiveFilters = Boolean(
    filters.category || filters.brand || filters.color || filters.size || search,
  );

  async function loadCategories() {
    try {
      const data = await getCustomerCategories();
      setCategories(data ?? []);
    } catch {
      setCategories([]);
    }
  }

  async function loadProducts(params: GetCustomerProductsParams) {
    setLoading(true);

    try {
      const data = await getCustomerProducts(params);
      setProducts(data ?? []);
    } finally {
      setLoading(false);
    }
  }

  //   update params -> when user will select or deselect filters/sort

  function updateParams(next: URLSearchParams) {
    setSearchParams(next);
  }

  // toggle filter facets

  const toggleFacet = (key: FacetKey, value: string) => {
    const nextValue = new URLSearchParams(searchParams);
    const currentvalue = searchParams.get(key) || "";

    if (currentvalue === value) {
      nextValue.delete(key);
    } else {
      nextValue.set(key, value);
    }

    updateParams(nextValue);
  };

  // handle sort

  const changeSort = useCallback(
    (value: ProductSort) => {
      const nextValue = new URLSearchParams(searchParams);

      if (value === "recent") {
        nextValue.delete("sort");
      } else {
        nextValue.set("sort", value);
      }

      updateParams(nextValue);
    },
    [searchParams, updateParams],
  );

  //clear all filters

  const clearFilters = () => {
    const nextValue = new URLSearchParams(searchParams);
    nextValue.delete("category");
    nextValue.delete("brand");
    nextValue.delete("size");
    nextValue.delete("color");
    nextValue.delete("search");
    updateParams(nextValue);
  };

  // available colors

  async function loadAvailableColors() {
    try {
      setLoading(true);
      const data = await getCustomerProducts();
      const uniqueColors = new Set<string>();

      (data ?? []).forEach((item) => {
        item.colors.forEach((color) => uniqueColors.add(color));
      });

      setAvailableColors(
        Array.from(uniqueColors).sort((a, b) => a.localeCompare(b)),
      );
    } finally {
      setLoading(false);
    }
  }

  // active filter badges
  const activeFilterBadges = useMemo<ActiveFilterBadge[]>(() => {
    const items: ActiveFilterBadge[] = [];

    if (search) {
      items.push({
        key: "brand",
        label: "Search",
        value: `"${search}"`,
      });
    }

    if (filters.category) {
      const found = categories.find((item) => item._id === filters.category);

      items.push({
        key: "category",
        label: "Category",
        value: found?.name || filters.category,
      });
    }

    if (filters.brand) {
      items.push({
        key: "brand",
        label: "Brand",
        value: filters.brand,
      });
    }

    if (filters.color) {
      items.push({
        key: "color",
        label: "Color",
        value: filters.color,
      });
    }

    if (filters.size) {
      items.push({
        key: "size",
        label: "Size",
        value: filters.size,
      });
    }

    return items;
  }, [categories, filters]);

  useEffect(() => {
    void loadCategories();
  }, []);

  useEffect(() => {
    void loadProducts(query);
  }, [query]);

  useEffect(() => {
    void loadAvailableColors();
  }, []);

  return {
    categories,
    products,
    loading,
    filters,
    sort,
    hasActiveFilters,
    changeSort,
    availableColors,
    toggleFacet,
    clearFilters,
    activeFilterBadges,
  };
}
