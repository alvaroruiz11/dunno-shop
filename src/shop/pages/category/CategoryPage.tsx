import { useParams } from 'react-router';

import { useProducts } from '@/products/hooks/useProducts';
import { ProductGrid } from '@/shop/components/ProductGrid';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { CustomPagination } from '@/components/custom/CustomPagination';

export const CategoryPage = () => {
  const { category = '' } = useParams();

  const { products, totalPages } = useProducts(category);

  const categoryLabel = category.toUpperCase();

  return (
    <>
      <CustomJumbotron title={`${categoryLabel}`} />
      <section className="py-6">
        <div className="container">
          <ProductGrid products={products || []} />

          <CustomPagination totalPages={totalPages || 0} />
        </div>
      </section>
    </>
  );
};
