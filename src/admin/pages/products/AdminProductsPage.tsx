import { Link } from 'react-router';
import { Plus } from 'lucide-react';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ProductsTable } from '@/products/components/ProductsTable';
import { useProducts } from '@/products/hooks/useProducts';

export const AdminProductsPage = () => {
  const { products, totalPages } = useProducts();

  return (
    <>
      <AdminTitle title="Productos" />
      <div className="mt-6">
        <Card className="shadow-none rounded-md">
          <CardContent className="p-0">
            <div className="px-5 flex justify-between items-center">
              <div>
                <Input
                  type="text"
                  placeholder="Buscar"
                  className="max-w-md w-full"
                />
              </div>
              <Button size="sm" asChild>
                <Link to="/admin/productos/crear">
                  <Plus />
                  Nuevo
                </Link>
              </Button>
            </div>
            <div className="mt-4 pl-5">
              <ProductsTable products={products || []} />
            </div>
            <div className="p-6 flex justify-end items-center">
              <CustomPagination totalPages={totalPages || 0} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminProductsPage;
