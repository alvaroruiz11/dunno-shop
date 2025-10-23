import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { useProducts } from '@/products/hooks/useProducts';
import { ProductGrid } from '@/shop/components/ProductGrid';

export const HomePage = () => {
  const { products, totalPages } = useProducts();

  return (
    <>
      <CustomJumbotron title="Todos los Productos" />
      <section className="py-6">
        <div className="container">
          <ProductGrid products={products || []} />

          <CustomPagination totalPages={totalPages || 0} />
        </div>
      </section>
    </>
  );
};
