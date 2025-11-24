import { Navigate, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { ProductForm } from './ui/ProductForm';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { useProduct } from '@/products/hooks/useProduct';
import { useCategories } from '@/categories/hooks/useCategories';
import type { Product } from '@/products/interfaces/product.interface';

export const AdminProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { categories } = useCategories();

  const { data: product, isLoading, isError, mutation } = useProduct(id || '');

  const handleSubmit = async (productLike: Partial<Product>) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (product: Product) => {
        toast.success('Producto datos guardados correctamente', {
          position: 'top-right',
        });
        navigate(`/admin/productos/${product.id}`, { replace: true });
      },
      onError: (error) => {
        console.log(error);

        toast.error('Error al guardar datos del producto', {
          position: 'top-right',
        });
      },
    });
  };

  if (isLoading) {
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
