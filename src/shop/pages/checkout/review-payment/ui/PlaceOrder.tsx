import { Link } from 'react-router';
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

interface Props {
  isPlacingOrder: boolean;
  setIsPlacingOrder: (isPlacing: boolean) => void;
  onPlaceOrder: () => void;
}

export const PlaceOrder = ({
  isPlacingOrder,
  setIsPlacingOrder,
  onPlaceOrder,
}: Props) => {
  const getSummaryInformation = useCartStore(
    (state) => state.getSummaryInformation
  );

  const { totalAmount, totalTax, subTotal, itemsInCart } =
    getSummaryInformation();
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
          onClick={onPlaceOrder}
        >
          Realizar pedido
        </Button>
      </CardFooter>
    </Card>
  );
};
