import { currencyFormatter } from '@/lib/formatter';
import { useCartStore } from '@/store/cart/cart-store';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);

  return (
    <>
      {productsInCart.map((product) => (
        <div
          className="flex py-4 gap-2 items-center"
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
          <div className="flex-1 flex flex-col gap-1">
            <h3 className="font-din-next">{product.title}</h3>
            <span className="text-sm">Talla: {product.size}</span>
            <span className="text-sm">Cantidad: {product.quantity}</span>
            <span className="text-sm font-medium">
              {currencyFormatter(product.price)}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
