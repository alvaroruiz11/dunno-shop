import { Separator } from '@/components/ui/separator';
import { currencyFormatter } from '@/lib/formatter';
import { useCartStore } from '@/store/cart/cart-store';

export const OrderSummary = () => {
  const getSummaryInformation = useCartStore(
    (state) => state.getSummaryInformation
  );

  const { totalAmount, totalTax, subTotal, itemsInCart } =
    getSummaryInformation();

  return (
    <>
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
        <span className="font-din-next mt-5 font-semibold text-2xl">Total</span>
        <span className="font-din-next mt-5 font-semibold text-2xl text-right">
          {currencyFormatter(totalAmount)}
        </span>
      </div>
    </>
  );
};
