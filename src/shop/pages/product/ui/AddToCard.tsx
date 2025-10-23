import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';

import { QuantitySelector } from './QuantitySelector';
import { SizeSelector } from './SizeSelector';

import { AlertCircleIcon } from 'lucide-react';
import type {
  CartProduct,
  Product,
  Variant,
} from '@/products/interfaces/product.interface';
import { useCartStore } from '@/store/cart/cart-store';


interface Props {
  product: Product;
}

export const AddToCard = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const openCartSidebar = useCartStore((state) => state.openCartSidebar);

  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!selectedVariant) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: selectedVariant.size,
      productVariantId: selectedVariant.id,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSelectedVariant(undefined);
    openCartSidebar();
  };
  return (
    <>
      {posted && !selectedVariant && (
        <Alert variant="destructive" className="mb-2">
          <AlertCircleIcon />
          <AlertTitle>Debe de seleccionar una talla*</AlertTitle>
        </Alert>
      )}
      <div className="space-y-3 my-6">
        <p className="font-din-next">
          <span className="text-primary/70 mr-1">Talla:</span>{' '}
          {selectedVariant?.size}
        </p>
        <SizeSelector
          selectedVariant={selectedVariant}
          variants={product.variants}
          onVariantChanged={setSelectedVariant}
        />
      </div>
      {/* Quantity */}
      <div className="space-y-3 my-6">
        <p className="font-din-next text-primary/70">Cantidad:</p>
        <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <Button
          variant="outline"
          className="text-lg py-6 cursor-pointer font-din-next"
          onClick={addToCart}
        >
          Añadir al carrito
        </Button>
        <Button
          className="text-lg py-6 cursor-pointer font-din-next"
          onClick={addToCart}
        >
          Comprar ahora
        </Button>
      </div>
    </>
  );
};
