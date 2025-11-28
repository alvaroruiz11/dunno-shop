import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { currencyFormatter, dateFormatter } from '@/lib/formatter';
import type { Order } from '@/orders/interfaces/order.interface';
import { User, CreditCard, Info } from 'lucide-react';

interface Props {
  order: Order;
}

export const PaymentDetails = ({ order }: Props) => {
  return (
    <div className="space-y-6">
      {/* Título */}
      <h1 className="text-2xl font-bold text-gray-900">
        Detalles de su Transacción
      </h1>

      {/* Email */}
      <div>
        <p className="text-sm text-gray-600">
          Email: <span className="font-medium text-gray-900">{order.user?.email || 'N/A'}</span>
        </p>
      </div>

      {/* Tabla de items */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.orderItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.sku} - {item.title}
                  </TableCell>
                  <TableCell>{currencyFormatter(item.price)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="text-right font-medium">
                    {currencyFormatter(item.price * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
              
              {/* Resumen */}
              <TableRow>
                <TableCell colSpan={3} className="text-right text-sm">
                  Subtotal:
                </TableCell>
                <TableCell className="text-right font-medium">
                  {currencyFormatter(order.subTotal)}
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell colSpan={3} className="text-right text-sm">
                  Costo de Envío:
                </TableCell>
                <TableCell className="text-right font-medium">
                  {currencyFormatter(0)}
                </TableCell>
              </TableRow>
              
              <TableRow className="border-t-2">
                <TableCell colSpan={3} className="text-right font-bold text-lg">
                  TOTAL:
                </TableCell>
                <TableCell className="text-right font-bold text-lg">
                  {currencyFormatter(order.totalAmount)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Datos de facturación */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Datos de Facturación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">
            Los mismos serán utilizados para la emisión de sus facturas.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">
                {order.user?.firstName} {order.user?.lastName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">{order.id.substring(0, 8)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Las recaudaciones de los distintos canales de pago pueden aparecer
              en su extracto o detalle como Todotix, Todotix SRL o Todotix 3D.
              libélula es un servicio y una marca registrada de Todotix SRL.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

