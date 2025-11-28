import { Link } from 'react-router';
import { Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { currencyFormatter, dateFormatter } from '@/lib/formatter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import type { Order } from '@/orders/interfaces/order.interface';
import clsx from 'clsx';

interface Props {
  orders: Order[];
}

export const OrdersTable = ({ orders }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground w-[50px]">#</TableHead>
          <TableHead className="text-muted-foreground">Nombre</TableHead>
          <TableHead className="text-muted-foreground">Cliente</TableHead>
          <TableHead className="text-muted-foreground">Price</TableHead>
          <TableHead className="text-muted-foreground">Pagado</TableHead>
          <TableHead className="text-muted-foreground">Estado</TableHead>
          <TableHead className="text-muted-foreground">Orden creada</TableHead>
          <TableHead className="text-muted-foreground">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="max-w-[180px]">
              <div className="truncate flex items-center">
                <div>
                  <p className="font-medium">{order.totalItems} Items</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{`${order.user.firstName} ${order.user.lastName}`}</TableCell>
            <TableCell>
              <span className="font-medium">
                {currencyFormatter(order.totalAmount)}
              </span>
            </TableCell>
            <TableCell>
              <Badge
                className={clsx('text-white', {
                  'bg-green-500 ': order.isPaid,
                  'bg-destructive ': !order.isPaid,
                })}
              >
                {`${order.isPaid ? 'Pagado' : 'Pendiente'}`}
              </Badge>
            </TableCell>
            <TableCell>
              <span className="font-medium uppercase">{order.status}</span>
            </TableCell>
            <TableCell>
              <span className="font-medium ">
                {dateFormatter(order.createdAt)}
              </span>
            </TableCell>
            <TableCell className="inline-flex">
              <Button size="sm" variant="outline" asChild>
                <Link to={`/admin/ordenes/${order.id}`}>
                  <Eye />
                </Link>
              </Button>
              {/* <Button size="sm" variant="outline" asChild>
                <Link to={`/admin/categorias/${category.id}`}>
                  <Pencil />
                </Link>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:bg-destructive hover:text-white"
              >
                <Trash />
              </Button> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
