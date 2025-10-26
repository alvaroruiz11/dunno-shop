import { Link } from 'react-router';
import { BadgeCheckIcon, Pencil, Trash } from 'lucide-react';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
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
import type { User } from '@/users/interfaces/users-response.interface';

interface Props {
  customers: User[];
}

export const CustomersTable = ({ customers }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground w-[50px]">#</TableHead>
          <TableHead className="text-muted-foreground">Nombre</TableHead>

          <TableHead className="text-muted-foreground">
            Correo Electrónico
          </TableHead>
          <TableHead className="text-muted-foreground">Ventas</TableHead>
          <TableHead className="text-muted-foreground">Aporte</TableHead>
          <TableHead className="text-muted-foreground">Estado</TableHead>
          <TableHead className="text-muted-foreground">Creando en</TableHead>
          <TableHead className="text-muted-foreground">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer, index) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="max-w-[180px]">
              <div>
                <p className="font-medium">
                  {customer.firstName} {customer.lastName}
                </p>
              </div>
            </TableCell>

            <TableCell>
              <span className="font-medium">{customer.email}</span>
            </TableCell>
            <TableCell>
              <span className="">{20}</span>
            </TableCell>
            <TableCell>
              <span className="font-medium">{currencyFormatter(232)}</span>
            </TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={clsx('text-white', {
                  'bg-blue-600': customer.isActive,
                  'bg-destructive': !customer.isActive,
                })}
              >
                <BadgeCheckIcon />
                {customer.isActive ? 'Activo' : 'Inactivo'}
              </Badge>
            </TableCell>
            <TableCell>
              <span className="font-medium">{dateFormatter(new Date())}</span>
            </TableCell>
            <TableCell className="inline-flex">
              <Button size="sm" variant="ghost" asChild>
                <Link to={`/admin/clientes/${customer.id}`}>
                  <Pencil />
                </Link>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive hover:bg-destructive hover:text-white"
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
