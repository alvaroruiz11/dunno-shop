import { Plus } from 'lucide-react';
import { Link } from 'react-router';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomersTable } from './ui/CustomersTable';
import { useUsers } from '@/users/hooks/useUsers';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';

export const AdminCustomersPage = () => {
  const { data } = useUsers('customer');

  return (
    <>
      <AdminTitle title="Clientes" />
      <div className="mt-6">
        <Card className="shadow-none rounded-md">
          <CardContent className="p-0">
            <div className="px-5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Input
                  type="text"
                  placeholder="Buscar"
                  className="max-w-md w-full"
                />
                <div>
                  <NativeSelect defaultValue="" className="w-[125px]">
                    <NativeSelectOption value="" disabled>
                      Estado
                    </NativeSelectOption>
                    <NativeSelectOption value="1">Activos</NativeSelectOption>
                    <NativeSelectOption value="0">
                      Desactivados
                    </NativeSelectOption>
                  </NativeSelect>
                </div>
              </div>
              <Button size="sm" asChild>
                <Link to="/admin/clientes/crear">
                  <Plus />
                  Nuevo
                </Link>
              </Button>
            </div>
            <div className="mt-4 pl-5">
              <CustomersTable customers={data?.data || []} />
            </div>
            <div className="p-6 flex justify-end items-center">
              <CustomPagination totalPages={data?.meta.totalPages || 0} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminCustomersPage;
