import { CheckCircle2, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const orders = [
  {
    id: 'ORD-00123',
    date: '10/10/2025',
    total: 420.5,
    status: 'Entregado',
    items: 3,
  },
  {
    id: 'ORD-00122',
    date: '05/10/2025',
    total: 180,
    status: 'En camino',
    items: 2,
  },
];
export const OrderHistory = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Entregado':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'En camino':
        return <Truck className="w-5 h-5 text-blue-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };
  return (
    <div>
      <h2 className="text-xl font-din-next mb-4">Mis pedidos</h2>
      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Pedido {order.id}</CardTitle>
                <p className="text-sm text-gray-500">Fecha: {order.date}</p>
              </div>
              <Badge
                variant={
                  order.status === 'Entregado'
                    ? 'secondary'
                    : order.status === 'En camino'
                    ? 'outline'
                    : 'default'
                }
              >
                {order.status}
              </Badge>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-700">
                {getStatusIcon(order.status)}
                <div>
                  <p>{order.items} artículos</p>
                  <p className="text-sm text-gray-500">
                    Total: Bs {order.total.toFixed(2)}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Ver detalles
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
