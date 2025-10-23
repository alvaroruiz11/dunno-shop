import { Link } from 'react-router';

import type { Product } from '@/products/interfaces/product.interface';
import { currencyFormatter } from '@/lib/formatter';

interface Props {
  product: Product;
}
export const ProductCard = ({ product }: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-8 w-full max-w-sm">
      {/* Imagen con efecto */}
      <Link to={`/producto/${product.slug}`} className="block">
        <div className="relative overflow-hidden group">
          {/* Imagen principal */}
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <img
            src={product.images[1]}
            alt={product.title}
            className="absolute inset-0 object-cover w-full h-full opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          />

          {/* Etiqueta de agotado */}
          {/* <span className="absolute top-2 left-2 bg-black text-white text-sm font-bold rounded-full px-3 py-1">
              Agotado
            </span> */}
        </div>
      </Link>

      {/* Información del producto */}
      <div className="mt-4">
        <Link to={`/producto/${product.slug}`} className="block">
          <p className="text-muted-foreground font-din-next text-xs mb-2">
            {product.category.name}
          </p>
          <h2 className="font-din-next md:text-lg">{product.title}</h2>
          <p className="text-sm md:text-base text-primary/70 font-medium  mt-1">
            {currencyFormatter(product.price)}
          </p>
        </Link>
      </div>
    </div>
  );
};
