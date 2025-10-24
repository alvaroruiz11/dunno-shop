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

export const CustomersTable = () => {
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
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell className="max-w-[180px]">
            <div>
              <p className="font-medium">Alvaro Ruiz</p>
            </div>
          </TableCell>

          <TableCell>
            <span className="font-medium">alvaro@google.com</span>
          </TableCell>
          <TableCell>
            <span className="">{20}</span>
          </TableCell>
          <TableCell>
            <span className="font-medium">{currencyFormatter(232)}</span>
          </TableCell>
          <TableCell>
            {/* {
                'bg-blue-600': user.is_active,
                'bg-destructive': !user.is_active,
              } */}
            <Badge
              variant="secondary"
              className={clsx('text-white bg-destructive')}
            >
              <BadgeCheckIcon />
              {/* {user.is_active ? 'Activo' : 'Inactivo'} */}
              Activo
            </Badge>
          </TableCell>
          <TableCell>
            <span className="font-medium">{dateFormatter(new Date())}</span>
          </TableCell>
          <TableCell className="inline-flex">
            <Button size="sm" variant="ghost" asChild>
              <Link to={`/admin/vendedores/${123}`}>
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
      </TableBody>
    </Table>
  );
};
