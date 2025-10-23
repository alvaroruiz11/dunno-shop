import { Link } from 'react-router';
import { Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import type { Product } from '../interfaces/product.interface';
import { currencyFormatter, dateFormatter } from '../../lib/formatter';

interface Props {
  products: Product[];
}

export const ProductsTable = ({ products }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground w-[50px]">#</TableHead>
          <TableHead className="text-muted-foreground">Titulo</TableHead>
          <TableHead className="text-muted-foreground">Categoría</TableHead>
          <TableHead className="text-muted-foreground">Precio</TableHead>
          <TableHead className="text-muted-foreground">Pedidos</TableHead>
          <TableHead className="text-muted-foreground">Stock</TableHead>
          <TableHead className="text-muted-foreground">Creando en</TableHead>
          <TableHead className="text-muted-foreground">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={product.id} className="">
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="max-w-[180px]">
              <div className="truncate flex items-center">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="rounded-md w-10 h-10 mr-3"
                />
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-xs text-muted-foreground uppercase">
                    #{product.gender}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>
              <span className="font-medium">
                {currencyFormatter(product.price)}
              </span>
            </TableCell>
            <TableCell>
              <span className="">{20}</span>
            </TableCell>
            <TableCell>
              <span className="text-green-600 font-medium">Disponible</span>
            </TableCell>
            <TableCell>
              <span className="font-medium">{dateFormatter(new Date())}</span>
            </TableCell>
            <TableCell className="inline-flex">
              <Button size="sm" variant="ghost" asChild>
                <Link to={`/admin/productos/${product.id}`}>
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
