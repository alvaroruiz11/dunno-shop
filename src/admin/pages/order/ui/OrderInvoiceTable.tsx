import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { currencyFormatter, dateTimeFormatter } from '@/lib/formatter';
import type { Order } from '@/orders/interfaces/order.interface';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';

interface Props {
  order: Order;
}

export const OrderInvoiceTable = ({ order }: Props) => {
  // Calcular el descuento
  const discount = order.subTotal + order.totalTax - order.totalAmount;

  // Formatear SKU como hashtag
  const formatHashtag = (sku: string) => {
    return sku.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  };

  return (
    <div className="grid md:grid-cols-12 gap-4">
      <div className="md:col-span-8">
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-lg">#{order.id.substring(0, 3)}</span>
                <span className="text-sm text-muted-foreground">
                  {dateTimeFormatter(order.createdAt)}
                </span>
              </div>
            </CardTitle>
            <CardAction>
              <Button size="sm" variant="outline">
                <FileText />
                Factura
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-muted-foreground w-[80px]">
                      ID
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Nombre
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Categoría
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Precio
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Cantidad
                    </TableHead>
                    <TableHead className="text-muted-foreground text-right">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.orderItems.map((item, index) => (
                    <TableRow key={item.id} className="font-medium">
                      <TableCell className="font-medium">
                        {1000 + index + 1}
                      </TableCell>
                      <TableCell className="max-w-[180px]">
                        <div className="truncate flex items-center">
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="rounded-md w-12 h-12 mr-3"
                          />
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              #{formatHashtag(item.sku)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{currencyFormatter(item.price)}</TableCell>
                      <TableCell>{item.quantity}x</TableCell>
                      <TableCell className="text-right font-medium">
                        {currencyFormatter(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* Resumen de la compra */}
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-right text-sm text-muted-foreground font-medium"
                    >
                      Sub Total
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {currencyFormatter(order.subTotal)}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-right text-sm text-muted-foreground font-medium"
                    >
                      Impuesto
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      + {currencyFormatter(order.totalTax)}
                    </TableCell>
                  </TableRow>

                  {discount > 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-right text-sm text-green-600"
                      >
                        Descuento
                      </TableCell>
                      <TableCell className="text-right font-medium text-green-600">
                        - {currencyFormatter(discount)}
                      </TableCell>
                    </TableRow>
                  )}

                  <TableRow className="border-t">
                    <TableCell
                      colSpan={5}
                      className="text-lg text-right font-semibold"
                    >
                      Total
                    </TableCell>
                    <TableCell className="text-right font-semibold text-lg">
                      {currencyFormatter(order.totalAmount)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-4">
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="">
                <AvatarFallback>
                  {`${order.user.firstName.at(0)}${order.user.lastName.at(0)}`}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{`${order.user.firstName} ${order.user.lastName}`}</p>
                <p className="text-sm mt-1 text-muted-foreground font-medium">
                  {order.user.email}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
