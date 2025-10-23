import { Link, Navigate, useParams } from 'react-router';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { useProduct } from '@/products/hooks/useProduct';

import { AddToCard } from './ui/AddToCard';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductSlideshow } from '@/shop/components/ProductSlideshow';
import { ProductMobileSlideshow } from '@/shop/components/ProductMobileSlideshow';
import { currencyFormatter } from '@/lib/formatter';

export const ProductPage = () => {
  const { slug } = useParams();

  const { data: product, isLoading, isError } = useProduct(slug || '');

  if (isError) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="py-14">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-10 md:gap-12">
          <div className="md:col-span-6">
            <ProductSlideshow
              className="hidden md:flex gap-10"
              images={product.images}
            />
            <ProductMobileSlideshow
              className="block md:hidden"
              title={product.title}
              images={product.images}
            />
          </div>
          {/* ProductDetails */}
          <div className="md:col-span-4 px-4">
            <div className="mb-8">
              <Link to="" className="text-muted-foreground font-medium">
                {product.category.name}
              </Link>
              <h1 className="text-4xl font-din-next font-semibold my-4 tracking-wide">
                {product.title}
              </h1>
              <p className="text-xl font-din-next">
                {currencyFormatter(product.price)}
              </p>
            </div>
            {/* Size Selection */}
            <AddToCard product={product} />

            {/* Description */}
            <div className="">
              <Accordion type="multiple">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <span className="text-xl font-din-next">Description</span>
                  </AccordionTrigger>
                  <AccordionContent>{product.description}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div>
          <h2 className="text-2xl font-din-next text-center">
            Otras opciones que podrían gustarte...
          </h2>
        </div>
      </div>
    </section>
  );
};
