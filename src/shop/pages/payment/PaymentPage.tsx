import { useParams } from 'react-router';
import { useOrder } from '@/orders/hooks/useOrder';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { Navigate } from 'react-router';
import { PaymentDetails } from './ui/PaymentDetails';
import { PaymentMethods } from './ui/PaymentMethods';

export const PaymentPage = () => {
  const { id } = useParams();

  const { data: order, isLoading, isError } = useOrder(id || '');

  if (isError) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sección izquierda - Detalles de la transacción */}
          <div>
            <PaymentDetails order={order} />
          </div>

          {/* Sección derecha - Métodos de pago */}
          <div>
            <PaymentMethods order={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
