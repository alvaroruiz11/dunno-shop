import { CheckCircle2, Package, Truck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router';

import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { currencyFormatter, dateFormatter } from '@/lib/formatter';
import { useEffect, useState } from 'react';
import type { Order } from '@/orders/interfaces/order.interface';
import { getOrdersByIUserAction } from '@/orders/actions/get-order-by-user.action';

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusIcon = (status: string) => {
    const statusLower = status.toLowerCase();

    if (
      statusLower.includes('entregado') ||
      statusLower.includes('completado')
    ) {
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    }

    if (
      statusLower.includes('camino') ||
      statusLower.includes('enviado') ||
      statusLower.includes('transito')
    ) {
      return <Truck className="w-5 h-5 text-blue-500" />;
    }

    if (statusLower.includes('pendiente') || statusLower.includes('espera')) {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    }

    return <Package className="w-5 h-5 text-gray-500" />;
  };

  const getStatusBadgeVariant = (status: string) => {
    const statusLower = status.toLowerCase();

    if (
      statusLower.includes('entregado') ||
      statusLower.includes('completado')
    ) {
      return 'secondary' as const;
    }

    if (
      statusLower.includes('camino') ||
      statusLower.includes('enviado') ||
      statusLower.includes('transito')
    ) {
      return 'outline' as const;
    }

    return 'default' as const;
  };

  useEffect(() => {
    setIsLoading(true);
    getOrdersByIUserAction().then((orders) => setOrders(orders));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-din-next mb-4">Mis pedidos</h2>
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No tienes pedidos aún</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-din-next mb-4">Mis pedidos</h2>
      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">
                  Pedido {order.id.substring(0, 8)}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Fecha: {dateFormatter(order.createdAt)}
                </p>
              </div>
              <Badge variant={getStatusBadgeVariant(order.status)}>
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-700">
                {getStatusIcon(order.status)}
                <div>
                  <p>
                    {order.totalItems === 1
                      ? '1 artículo'
                      : `${order.totalItems} artículos`}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: {currencyFormatter(order.totalAmount)}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/orden/${order.id}`}>Ver detalles</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
