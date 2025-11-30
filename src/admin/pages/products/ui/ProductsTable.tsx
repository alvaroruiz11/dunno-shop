import { Link } from 'react-router';
import { BadgeCheckIcon, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Spinner } from '@/components/ui/spinner';
import { currencyFormatter, dateFormatter } from '@/lib/formatter';
import type { Product } from '@/products/interfaces/product.interface';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';

interface Props {
  products: Product[];
  isLoading?: boolean;
  onDelete: (productId: string) => void;
}

export const ProductsTable = ({
  products,
  isLoading = false,
  onDelete,
}: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground w-[50px]">#</TableHead>
          <TableHead className="text-muted-foreground w-[330px]">
            Titulo
          </TableHead>
          <TableHead className="text-muted-foreground">Categoría</TableHead>
          <TableHead className="text-muted-foreground">Precio</TableHead>
          <TableHead className="text-muted-foreground w-[150px]">
            Estado
          </TableHead>
          <TableHead className="text-muted-foreground">Stock</TableHead>
          <TableHead className="text-muted-foreground">Creando en</TableHead>
          <TableHead className="text-muted-foreground">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={8} className="h-[400px]">
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <Spinner className="size-8 text-primary" />
                <span className="text-muted-foreground font-medium">
                  Cargando productos...
                </span>
              </div>
            </TableCell>
          </TableRow>
        ) : products && products.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="h-[400px]">
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <p className="text-muted-foreground text-lg font-medium">
                  No hay productos registrados
                </p>
                <p className="text-muted-foreground text-sm">
                  Comienza agregando tu primer producto
                </p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          products.map((product, index) => (
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
                <Badge
                  variant="secondary"
                  className={clsx('text-white', {
                    'bg-green-500': product.isActive,
                    'bg-destructive': !product.isActive,
                  })}
                >
                  <BadgeCheckIcon />
                  {product.isActive ? 'Activo' : 'Desactivado'}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="font-medium">
                  {Array.isArray(product.variants) &&
                  product.variants.length > 0
                    ? (() => {
                        const totalStock = product.variants.reduce(
                          (acc, variant) => acc + variant.stock,
                          0
                        );
                        return `${totalStock} stock de ${product.variants.length} variantes`;
                      })()
                    : '0 stock'}
                </span>
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
                  onClick={() => onDelete(product.id)}
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
