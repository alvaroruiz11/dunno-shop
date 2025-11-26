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
import { dateFormatter } from '@/lib/formatter';
import type { Category } from '@/categories/interfaces/category.interface';
import { Link } from 'react-router';

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
          <TableHead className="text-muted-foreground">
            Categoría padre
          </TableHead>
          <TableHead className="text-muted-foreground">Nivel</TableHead>
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
            <TableCell>{category.parentCategory?.name || '-'}</TableCell>
            <TableCell>{`${
              category.parentCategory ? 'Hijo' : 'Padre'
            }`}</TableCell>
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
