import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CartProduct } from '@/products/interfaces/product.interface';

interface State {
  // properties
  cart: CartProduct[];
  isCartSidebarOpen: boolean;
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    totalTax: number;
    totalAmount: number;
    itemsInCart: number;
  };

  // methods
  openCartSidebar: () => void;
  closeCartSidebar: () => void;

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartSidebarOpen: false,

      openCartSidebar: () => set({ isCartSidebarOpen: true }),
      closeCartSidebar: () => set({ isCartSidebarOpen: false }),

      // methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce((subTotal, item) => {
          return item.quantity * item.price + subTotal;
        }, 0);

        const totalTax = subTotal * 0.15;

        const totalAmount = subTotal + totalTax;

        const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

        return {
          subTotal: subTotal,
          totalTax: totalTax,
          totalAmount: totalAmount,
          itemsInCart: itemsInCart,
        };
      },
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) =>
            item.id === product.id &&
            item.productVariantId === product.productVariantId
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Se que el producto existe por la talla... tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
        return;
      },
    }),
    { name: 'shopping-cart' }
  )
);
