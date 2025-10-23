import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/shop/pages/product/ui/QuantitySelector';

import type { CartProduct } from '@/products/interfaces/product.interface';
import { useCartStore } from '@/store/cart/cart-store';
import { currencyFormatter } from '@/lib/formatter';

interface Props {
  productsInCart: CartProduct[];
}

export const ProductsInCart = ({ productsInCart }: Props) => {
  const removeProductInCart = useCartStore((state) => state.removeProduct);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  return (
    <div className="space-y-2">
      {productsInCart.map((product) => (
        <div
          className="flex px-4 py-3 gap-2 items-center"
          key={`${product.slug} - ${product.size}`}
        >
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="object-cover rounded-md"
              width="100"
              height="100"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="text-sm">
                <h3 className="font-din-next">{product.title}</h3>
                <span className="text-gray-500">Talla: {product.size}</span>
              </div>
              <Button
                className="text-gray-400"
                variant="ghost"
                size="sm"
                onClick={() => removeProductInCart(product)}
              >
                <Trash2 />
              </Button>
            </div>
            <div className="flex mt-3 justify-between items-center">
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={(quantity) =>
                  updateProductQuantity(product, quantity)
                }
              />
              <div className="text-sm font-medium">
                <span>{currencyFormatter(product.price)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
