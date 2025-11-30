import { Link } from 'react-router';
import { Plus } from 'lucide-react';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CategoriesTable } from './ui/CategoriesTable';
import { useCategories } from '@/categories/hooks/useCategories';
import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteCategoryById } from '@/categories/actions/delete-category-by-id.action';
import { CustomDialogConfirm } from '@/components/custom/CustomDialogConfirm';
import { ButtonGroup } from '@/components/ui/button-group';

export const AdminCategoriesPage = () => {
  const queryClient = useQueryClient();

  const [active, setActive] = useState<'0' | '1' | undefined>(undefined);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const categoryId = useRef<string | undefined>(undefined);

  const { categories, totalPages, isLoading } = useCategories(active);

  const handleDeleteCategory = async () => {
    if (!categoryId.current) return;
    const resp = await deleteCategoryById(categoryId.current);
    if (!resp) {
      toast.error('Ocurrió un problema', { position: 'top-right' });
      categoryId.current = undefined;
      setIsOpenConfirm(false);
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['categories'] });
    toast.success('Categoría desactivado', { position: 'top-right' });
    categoryId.current = undefined;
    setIsOpenConfirm(false);
  };

  const setDeleteCategoryId = (id: string) => {
    categoryId.current = id;
    setIsOpenConfirm(true);
  };

  return (
    <>
      <AdminTitle title="Categorías" />
      <div className="mt-6">
        <Card className="shadow-none rounded-md">
          <CardContent className="p-0">
            <div className="px-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Input
                  type="text"
                  placeholder="Buscar"
                  className="max-w-md w-full"
                />
                <ButtonGroup>
                  <Button
                    size="sm"
                    variant={active === undefined ? 'default' : 'outline'}
                    className="transition-all duration-150"
                    onClick={() => setActive(undefined)}
                  >
                    Todos
                  </Button>
                  <Button
                    size="sm"
                    variant={active === '1' ? 'default' : 'outline'}
                    className="transition-all duration-150"
                    onClick={() => setActive('1')}
                  >
                    Activo
                  </Button>
                  <Button
                    size="sm"
                    variant={active === '0' ? 'default' : 'outline'}
                    className="transition-all duration-150"
                    onClick={() => setActive('0')}
                  >
                    Desactivado
                  </Button>
                </ButtonGroup>
              </div>
              <Button size="sm" asChild>
                <Link to="/admin/categorias/nuevo">
                  <Plus />
                  Nuevo
                </Link>
              </Button>
            </div>
            <div className="mt-4 pl-5">
              <CategoriesTable
                categories={categories || []}
                isLoading={isLoading}
                onDelete={setDeleteCategoryId}
              />
            </div>
            <div className="p-6 flex justify-end items-center">
              <CustomPagination totalPages={totalPages || 0} />
            </div>
          </CardContent>
        </Card>
      </div>
      <CustomDialogConfirm
        title="Confirmar eliminación"
        description="Estás a punto de eliminar esta categoría. ¿Quieres continuar?"
        open={isOpenConfirm}
        onOpenChange={setIsOpenConfirm}
        onConfirm={handleDeleteCategory}
      />
    </>
  );
};

export default AdminCategoriesPage;
