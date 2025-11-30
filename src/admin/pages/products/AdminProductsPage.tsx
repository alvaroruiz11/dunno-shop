import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { Plus } from 'lucide-react';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { useProducts } from '@/products/hooks/useProducts';
import { ProductsTable } from './ui/ProductsTable';
import { CustomDialogConfirm } from '@/components/custom/CustomDialogConfirm';
import { deleteProductById } from '@/products/actions/delete-product-by-id.action';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { ButtonGroup } from '@/components/ui/button-group';

export const AdminProductsPage = () => {
  const queryClient = useQueryClient();
  const [active, setActive] = useState<'0' | '1' | undefined>(undefined);

  const { products, totalPages, isLoading } = useProducts('', active);

  const productId = useRef<string | undefined>(undefined);

  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const handleDeleteProduct = async () => {
    if (!productId.current) return;
    const resp = await deleteProductById(productId.current);
    if (!resp) {
      toast.error('Ocurrió un problema', { position: 'top-right' });
      productId.current = undefined;
      setIsOpenConfirm(false);
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['products'] });
    toast.success('Producto desactivado', { position: 'top-right' });
    productId.current = undefined;
    setIsOpenConfirm(false);
  };

  const setDeleteProductId = (id: string) => {
    productId.current = id;
    setIsOpenConfirm(true);
  };

  return (
    <>
      <AdminTitle title="Productos" />
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
                <Link to="/admin/productos/crear">
                  <Plus />
                  Nuevo
                </Link>
              </Button>
            </div>
            <div className="mt-4 pl-5">
              <ProductsTable
                products={products || []}
                isLoading={isLoading}
                onDelete={setDeleteProductId}
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
        description="Estás a punto de eliminar este producto. ¿Quieres continuar?"
        open={isOpenConfirm}
        onOpenChange={setIsOpenConfirm}
        onConfirm={handleDeleteProduct}
      />
    </>
  );
};

export default AdminProductsPage;
