import { Link } from 'react-router';
import { Plus } from 'lucide-react';
import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { OrdersTable } from './ui/OrdersTable';
import { useOrders } from '@/orders/hooks/useOrders';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';

export const AdminOrdersPage = () => {
  const { data, isLoading } = useOrders();

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  return (
    <>
      <AdminTitle title="Ordenes" />
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
                <Link to="/admin/ordenes/nuevo">
                  <Plus />
                  Nuevo
                </Link>
              </Button>
            </div>
            <div className="mt-4 pl-5">
              <OrdersTable orders={data?.data || []} />
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

export default AdminOrdersPage;
