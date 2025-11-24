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
import type { Category } from '@/products/interfaces/product.interface';
import { dateFormatter } from '@/lib/formatter';

interface Props {
  categories: Category[];
}

export const CategoriesTable = ({ categories }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground w-[50px]">#</TableHead>
          <TableHead className="text-muted-foreground">Nombre</TableHead>
          <TableHead className="text-muted-foreground">Subcategorías</TableHead>
          <TableHead className="text-muted-foreground">Creando en</TableHead>
          <TableHead className="text-muted-foreground">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, index) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="max-w-[180px]">
              <div className="truncate flex items-center">
                <div>
                  <p className="font-medium">{category.name}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>{'-'}</TableCell>
            <TableCell>
              <span className="font-medium">{dateFormatter(new Date())}</span>
            </TableCell>
            <TableCell className="inline-flex">
              <Button size="sm" variant="ghost" asChild>
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
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
