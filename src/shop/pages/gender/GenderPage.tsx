import { useParams } from 'react-router';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { ProductGrid } from '../../components/ProductGrid';
import { useProducts } from '@/products/hooks/useProducts';

export const GenderPage = () => {
  const { gender } = useParams();
  const { products, totalPages } = useProducts();

  const genderLabel =
    gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : 'Unisex';

  return (
    <>
      <CustomJumbotron title={`Productos para ${genderLabel}`} />
      <section className="py-6">
        <div className="container">
          <ProductGrid products={products || []} />

          <CustomPagination totalPages={totalPages || 0} />
        </div>
      </section>
    </>
  );
};
