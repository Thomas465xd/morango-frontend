// src/store/cart.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types";

type CartState = {
	items: CartItem[];

	addItem: (productId: string, quantity?: number) => void;
	removeItem: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;

    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
};

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],

			addItem: (productId, quantity = 1) => {
				const items = get().items;
				const existingItem = items.find(
					(i) => i.productId === productId,
				);

				if (existingItem) {
					set({
						items: items.map((i) =>
							i.productId === productId
								? { ...i, quantity: i.quantity + quantity }
								: i,
						),
					});
				} else {
					set({
						items: [...items, { productId, quantity }],
					});
				}
			},

			removeItem: (productId) => {
				set({
					items: get().items.filter((i) => i.productId !== productId),
				});
			},

			updateQuantity: (productId, quantity) => {
				if (quantity <= 0) {
					get().removeItem(productId);
					return;
				}

				set({
					items: get().items.map((i) =>
						i.productId === productId ? { ...i, quantity } : i,
					),
				});
			},

			clearCart: () => {
				set({ items: [] });
			},

            // Cart UI states
            isOpen: false,

            openCart: () => set({ isOpen: true }),

            closeCart: () => set({ isOpen: false }),

            toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
		}),
		{
			name: "cart", // localStorage key
		},
	),
);
