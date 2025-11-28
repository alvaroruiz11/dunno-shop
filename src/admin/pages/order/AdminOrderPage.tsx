import { Navigate, useParams } from 'react-router';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { useOrder } from '@/orders/hooks/useOrder';
import { OrderInvoiceTable } from './ui/OrderInvoiceTable';

export const AdminOrderPage = () => {
  const { id } = useParams();

  const { data: order, isLoading, isError } = useOrder(id || '');

  if (isError) {
    return <Navigate to="/admin/ordenes" replace />;
  }
  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!order) {
    return <Navigate to="/admin/ordenes" replace />;
  }

  return (
    <>
      <AdminTitle title="Detalle Orden" />
      <div className="mt-6">
        <OrderInvoiceTable order={order} />
      </div>
    </>
  );
};

export default AdminOrderPage;
