import { Plus } from 'lucide-react';
import { Link } from 'react-router';

import { AdminTitle } from '@/admin/components/AdminTitle';
// import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SellersTable } from './ui/SellersTable';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { useUsers } from '@/users/hooks/useUsers';

export const AdminSellersPage = () => {
  const { data } = useUsers('seller');

  return (
    <>
      <AdminTitle title="Vendedores" />
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
                <Link to="/admin/vendedores/crear">
                  <Plus />
                  Nuevo
                </Link>
              </Button>
            </div>
            <div className="mt-4 pl-5">
              <SellersTable sellers={data?.data ?? []} />
            </div>
            <div className="p-6 flex justify-end items-center">
              <CustomPagination totalPages={data?.meta.totalPages ?? 0} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminSellersPage;
