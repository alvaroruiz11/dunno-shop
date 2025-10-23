import clsx from 'clsx';
import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useCartStore } from '@/store/cart/cart-store';
import { ProductsInCart } from './ProductsInCart';

export const CartSidebar = () => {
  const isCartSidebarOpen = useCartStore((state) => state.isCartSidebarOpen);
  const productsInCart = useCartStore((state) => state.cart);
  const closeCartSidebar = useCartStore((state) => state.closeCartSidebar);
  const getSummaryInformation = useCartStore(
    (state) => state.getSummaryInformation
  );
  const totalItemInCart = useCartStore((state) => state.getTotalItems());

  const [, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [productsInCart]);

  return (
    <>
      {isCartSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-65"
          onClick={closeCartSidebar}
        ></div>
      )}
      <aside
        className={clsx(
          'fixed inset-y-0 right-0 z-70 w-[340px] md:w-[450px] bg-white transform transition-transform duration-300 ease-in-out',
          `${isCartSidebarOpen ? '' : 'translate-x-full'}`
        )}
      >
        <div className="flex justify-between items-center px-4 min-h-16 border-b border-gray-200 text-lg">
          <p className="font-din-next font-semibold">Carrito de compras</p>
          <button
            className="p-2 inline-flex items-center rounded-md cursor-pointer"
            onClick={closeCartSidebar}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col justify-between">
          {totalItemInCart === 0 ? (
            <div className="text-center py-10 flex flex-col justify-center items-center gap-5 min-h-screen">
              <ShoppingCart className="w-8 h-8" />
              <h3 className="font-semibold text-2xl font-din-next">
                Tu carrito esta vació
              </h3>
              <button
                className="text-sm underline text-muted-foreground cursor-pointer"
                onClick={closeCartSidebar}
              >
                Continuar navegando
              </button>
            </div>
          ) : (
            <div className="h-screen w-full">
              <div className="h-[calc(100%-240px)] overflow-y-scroll">
                <ProductsInCart productsInCart={productsInCart} />
              </div>

              <div className="bg-white absolute w-full px-4 bottom-0">
                <div className="border-t border-gray-200 py-4 font-din-next font-semibold text-xl">
                  <div className="flex justify-between items-center mb-4">
                    <p>Subtotal</p>
                    <p>Bs. {getSummaryInformation().subTotal}</p>
                  </div>
                  <div className="flex flex-col gap-2 mb-2">
                    <Button asChild size="lg">
                      <Link onClick={closeCartSidebar} to="/cart">
                        Comprar ahora
                      </Link>
                    </Button>
                    <Button onClick={closeCartSidebar} variant="outline" size="lg">
                      Continuar compra
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
