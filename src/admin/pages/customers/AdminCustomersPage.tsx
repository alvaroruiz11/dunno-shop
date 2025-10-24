import { Plus } from 'lucide-react';
import { Link } from 'react-router';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomersTable } from './ui/CustomersTable';

export const AdminCustomersPage = () => {
  return (
    <>
      <AdminTitle title="Clientes" />
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
                <Link to="/admin/clientes/crear">
                  <Plus />
                  Nuevo
                </Link>
              </Button>
            </div>
            <div className="mt-4 pl-5">
              <CustomersTable />
            </div>
            <div className="p-6 flex justify-end items-center">
              <CustomPagination totalPages={0} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminCustomersPage;
