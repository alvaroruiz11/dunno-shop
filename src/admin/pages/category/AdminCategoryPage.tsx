import { Navigate, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { CategoryForm } from './ui/CategoryForm';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';

import { useCategories } from '@/categories/hooks/useCategories';
import { useCategory } from '@/categories/hooks/useCategory';
import type { Category } from '@/categories/interfaces/category.interface';

export const AdminCategoryPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { categories } = useCategories();

  const {
    data: category,
    isLoading,
    isError,
    mutation,
  } = useCategory(id || '');

  const isCreating = id === 'nuevo';

  const handleSubmit = async (data: Partial<Category>) => {
    await mutation.mutateAsync(data, {
      onSuccess: (category) => {
        toast.success('Categoría guardada correctamente', {
          position: 'top-right',
        });

        navigate(`/admin/categorias/${category.id}`, { replace: true });
      },
      onError: () => {
        toast.error('Error al guardar categoría', {
          position: 'top-right',
        });
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/categorias" replace />;
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!category) {
    return <Navigate to="/admin/categorias" replace />;
  }

  return (
    <>
      <AdminTitle
        title={`${isCreating ? 'Crear categoría' : 'Editar categoría'} `}
      />
      <div className="mt-6">
        {/* TODO: puede ser un UserForm */}
        <CategoryForm
          category={category}
          parentCategories={categories || []}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default AdminCategoryPage;
