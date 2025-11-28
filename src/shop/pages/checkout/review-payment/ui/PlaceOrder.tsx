import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cart/cart-store';
import { ProductsInCart } from '../../ui/ProductsInCart';
import { currencyFormatter } from '@/lib/formatter';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useAddressStore } from '@/store/address/address-store';
import { placeOrderAction } from '@/orders/actions/place-order.action';
import { toast } from 'sonner';

export const PlaceOrder = () => {
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const getSummaryInformation = useCartStore(
    (state) => state.getSummaryInformation
  );

  const cart = useCartStore((state) => state.cart);
  const cleanCart = useCartStore((state) => state.clearCart);
  const address = useAddressStore((state) => state.address);

  const { totalAmount, totalTax, subTotal, itemsInCart } =
    getSummaryInformation();

  const placeOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((item) => ({
      productVariantId: item.productVariantId,
      quantity: item.quantity,
    }));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { departmentId, provinceId, ...addressToOrder } = address;

    const resp = await placeOrderAction(productsToOrder, addressToOrder);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      toast.error('Error en crear orden', { position: 'top-center' });
      return;
    }
    //* Todo salio bien
    cleanCart();
    navigate(`orden/${resp.order!.id}`);
    toast.success('Orden creada, proceda con el pago', {
      position: 'top-center',
    });
  };

  return (
    <Card className="w-full max-w-lg mx-auto h-fit">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold font-din-next">
          <span>Resumen</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ProductsInCart />
        <Separator className="my-4" />
        <div className="grid grid-cols-2 space-y-1 mb-4">
          <span>No. Productos</span>
          <span className="text-right">
            {itemsInCart === 1 ? '1 articulo' : `${itemsInCart} artículos`}
          </span>

          <span>SubTotal</span>
          <span className="text-right">{currencyFormatter(subTotal)}</span>

          <span>Impuestos (15%)</span>
          <span className="text-right">{currencyFormatter(totalTax)}</span>
        </div>
        <Separator />
        <div className="grid grid-cols-2 space-y-1">
          <span className="font-din-next mt-5 font-semibold text-2xl">
            Total
          </span>
          <span className="font-din-next mt-5 font-semibold text-2xl text-right">
            {currencyFormatter(totalAmount)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-5">
        <div className="flex items-center w-full gap-3">
          <Checkbox
            id="terms"
            defaultChecked={isPlacingOrder}
            onClick={() => setIsPlacingOrder(!isPlacingOrder)}
          />
          <Label htmlFor="terms">
            He leído y acepto los
            <Link to="/terminos-y-condiciones" className="underline">
              (Términos y Condiciones.)
            </Link>
          </Label>
        </div>
        <Button
          className="w-full py-6 text-lg font-din-next"
          disabled={!isPlacingOrder}
          onClick={placeOrder}
        >
          Realizar pedido
        </Button>
      </CardFooter>
    </Card>
  );
};
