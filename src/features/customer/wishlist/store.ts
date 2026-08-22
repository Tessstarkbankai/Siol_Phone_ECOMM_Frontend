import { create } from "zustand";
import type { CustomerWishlistItem } from "./types";
import { toast } from "sonner";
import {
  addCustomerWishlist,
  getCustomerWishlist,
  removeCustomerWishlistItem,
} from "./api";

type CustomerWishlistStore = {
  items: CustomerWishlistItem[];
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  setItems: (items: CustomerWishlistItem[]) => void;
  loadWishlist: () => Promise<void>;
  addItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clear: () => void;
};

export const useCustomerWishlistStore = create<CustomerWishlistStore>(
  (set) => ({
    items: [],
    isOpen: false,
    setOpen: (value) => set({ isOpen: value }),
    setItems: (items) => set({ items }),
    clear: () => set({ items: [], isOpen: false }),
    loadWishlist: async () => {
      try {
        const response = await getCustomerWishlist();
        set({ items: response.items ?? [] });
      } catch {
        set({ items: [] });
      }
    },
    addItem: async (productId) => {
      try {
        const response = await addCustomerWishlist({ productId });
        set({ items: response?.items ?? [] });
        toast.success("Added to wishlist! ❤️");
      } catch (error) {
        toast.error("Please login to save items to your wishlist");
      }
    },
    removeItem: async (productId) => {
      try {
        const response = await removeCustomerWishlistItem(productId);
        set({ items: response?.items ?? [] });
        toast.success("Removed from wishlist");
      } catch {
        toast.error("Failed to update wishlist");
      }
    },
  }),
);
