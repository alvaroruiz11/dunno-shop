import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

export const ProductVariantsCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="col-span-2 rounded-md">
      <CardHeader>
        <CardTitle>
          <span className="text-lg">Variantes del Producto</span>
        </CardTitle>
        <CardAction>
          <Button type="button" size="sm" onClick={() => setIsOpen(true)}>
            <Plus className="size-4" />
            Agregar
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">#</TableHead>
              <TableHead className="text-muted-foreground">SKU</TableHead>
              <TableHead className="text-muted-foreground">Talla</TableHead>
              <TableHead className="text-muted-foreground">Color</TableHead>
              <TableHead className="text-muted-foreground">Stock</TableHead>
              <TableHead className="text-muted-foreground">
                Alerta Stock
              </TableHead>
              <TableHead className="text-muted-foreground text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell className="font-medium">{'PRODUCT001'}</TableCell>
              <TableCell>{'XL'}</TableCell>
              <TableCell>{'-'}</TableCell>
              <TableCell>{'20'}</TableCell>
              <TableCell>{5}</TableCell>
              {/* <TableCell>{v.sku}</TableCell>
                  <TableCell>{v.size}</TableCell>
                  <TableCell>{v.color || '-'}</TableCell>
                  <TableCell>{v.stock}</TableCell> */}
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  // onClick={() => handleOpen(v)}
                  className="h-8 w-8"
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  // onClick={() => handleDelete(v.id)}
                  className="h-8 w-8"
                >
                  <Trash2 className="size-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <form>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Variante</DialogTitle>
            </DialogHeader>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field className="sm:col-span-2">
                <FieldLabel>SKU</FieldLabel>
                <Input type="text" placeholder="SKU" />
              </Field>
              <Field>
                <FieldLabel>Talla</FieldLabel>
                <Input type="text" placeholder="Talla" />
              </Field>
              <Field>
                <FieldLabel>Color</FieldLabel>
                <Input type="text" placeholder="Color" />
              </Field>
              <Field>
                <FieldLabel>Stock</FieldLabel>
                <Input type="number" placeholder="0" />
              </Field>
              <Field>
                <FieldLabel>Alerta Stock</FieldLabel>
                <Input type="number" placeholder="0" />
              </Field>
            </div>
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button size="sm" type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button size="sm" type="submit">
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </Card>
  );
};
