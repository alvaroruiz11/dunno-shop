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
import { dateFormatter } from '@/lib/formatter';
import type { Category } from '@/categories/interfaces/category.interface';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';
import clsx from 'clsx';

interface Props {
  categories: Category[];
  isLoading?: boolean;
  onDelete: (categoryId: string) => void;
}

export const CategoriesTable = ({
  categories,
  isLoading = false,
  onDelete,
}: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground w-[50px]">#</TableHead>
          <TableHead className="text-muted-foreground">Nombre</TableHead>
          <TableHead className="text-muted-foreground">
            Categoría padre
          </TableHead>
          <TableHead className="text-muted-foreground">Nivel</TableHead>
          <TableHead className="text-muted-foreground">Estado</TableHead>
          <TableHead className="text-muted-foreground">Creando en</TableHead>
          <TableHead className="text-muted-foreground">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="h-[400px]">
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <Spinner className="size-8 text-primary" />
                <span className="text-muted-foreground font-medium">
                  Cargando categorías...
                </span>
              </div>
            </TableCell>
          </TableRow>
        ) : categories && categories.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-[400px]">
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <p className="text-muted-foreground text-lg font-medium">
                  No hay categorías registradas
                </p>
                <p className="text-muted-foreground text-sm">
                  Comienza agregando tu primera categoría
                </p>
              </div>
            </TableCell>
          </TableRow>
        ) : (
          categories.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="max-w-[180px]">
                <div className="truncate flex items-center">
                  <div>
                    <p className="font-medium">{category.name}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{category.parentCategory?.name || '-'}</TableCell>
              <TableCell>{`${
                category.parentCategory ? 'Hijo' : 'Padre'
              }`}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={clsx('text-white', {
                    'bg-green-500': category.isActive,
                    'bg-destructive': !category.isActive,
                  })}
                >
                  <BadgeCheckIcon />
                  {category.isActive ? 'Activo' : 'Desactivado'}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="font-medium">{dateFormatter(new Date())}</span>
              </TableCell>
              <TableCell className="inline-flex">
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/admin/categorias/${category.id}`}>
                    <Pencil />
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive hover:text-white"
                  onClick={() => onDelete(category.id)}
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
