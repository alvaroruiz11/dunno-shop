import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OrderSummary } from './ui/OrderSummary';
import { Link } from 'react-router';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cart/cart-store';
import { ProductsInCart } from '@/shop/components/ProductsInCart';

export const CartPage = () => {
  const productsInCart = useCartStore((state) => state.cart);
  return (
    <section className="py-14">
      <div className="container px-4">
        <h2 className="text-3xl font-din-next mb-6">Carrito de Compras</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProductsInCart productsInCart={productsInCart} />

          <Card className="w-full max-w-lg mx-auto h-fit">
            <CardHeader>
              <CardTitle>
                <span className="text-2xl font-semibold font-din-next">
                  Resumen
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Código de descuento"
                  className="py-6"
                />
                <Button className="py-6">Aplicar</Button>
              </div>
              <Separator className="my-4" />
              <OrderSummary />
            </CardContent>
            <CardFooter>
              <Button className="w-full py-6 text-lg" asChild>
                <Link to="/checkout#shipping">Ir a pagar</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};
