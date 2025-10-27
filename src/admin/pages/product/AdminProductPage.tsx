import { AdminTitle } from '@/admin/components/AdminTitle';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/products/interfaces/product.interface';
import { useProduct } from '@/products/hooks/useProduct';
import { Navigate, useParams } from 'react-router';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { useCategories } from '@/categories/hooks/useCategories';
import { createUpdateProductAction } from '@/products/actions/create-update-product.action';

export const AdminProductPage = () => {
  const { id } = useParams();

  const { categories, isLoading: isLoadingCategories } = useCategories();

  const { data: product, isLoading, isError } = useProduct(id || '');

  const handleSubmit = (data: Partial<Product>) => {
    createUpdateProductAction(data);
  };

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (isLoadingCategories) {
    return <CustomFullScreenLoading />;
  }

  if (isError) {
    return <Navigate to="/admin/productos" replace />;
  }

  if (!product) {
    return <Navigate to="/admin/productos" replace />;
  }

  return (
    <>
      <AdminTitle
        title={product.id === 'crear' ? 'Crear producto' : 'Editar producto'}
      />
      <div className="mt-6">
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          categories={categories || []}
        />
      </div>
    </>
  );
};

export default AdminProductPage;
