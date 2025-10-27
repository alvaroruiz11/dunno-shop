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
import type { Variant } from '@/products/interfaces/product.interface';

interface FormInputs {
  id: string;
  sku: string;
  color: string | null;
  size: string;
  stock: number;
  stockAlert?: number;
}

interface Props {
  variants: Variant[];

  // Methods
  onAddVariant: (variant: Variant) => void;
  onRemoveVariant: (variant: Variant) => void;
}

export const ProductVariantsCard = ({
  variants,
  onAddVariant,
  onRemoveVariant,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formValue, setFormValue] = useState<FormInputs>({
    id: '',
    sku: '',
    color: null,
    size: '',
    stock: 0,
    stockAlert: 0,
  });

  const inputChange = (field: keyof FormInputs, value: string | number) => {
    setFormValue((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const addVariante = () => {
    onAddVariant(formValue);
    setIsOpen(false);
  };

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
              {/* <TableHead className="text-muted-foreground">
                Alerta Stock
              </TableHead> */}
              <TableHead className="text-muted-foreground text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants && variants.length > 0 ? (
              variants.map((variant, index) => (
                <TableRow key={variant.sku}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{variant.sku}</TableCell>
                  <TableCell>{variant.size}</TableCell>
                  <TableCell>{variant.color || '-'}</TableCell>
                  <TableCell>{variant.stock}</TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      // onClick={() => handleOpen(v)}
                      className="h-8 w-8"
                      type="button"
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onRemoveVariant(variant)}
                      className="h-8 w-8"
                      type="button"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="text-center font-medium py-4">
                    No hay variantes del producto
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Crear Variante</DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field className="sm:col-span-2">
              <FieldLabel>SKU</FieldLabel>
              <Input
                type="text"
                placeholder="SKU"
                name="sku"
                onChange={(e) => inputChange('sku', e.target.value)}
                value={formValue.sku}
              />
            </Field>
            <Field>
              <FieldLabel>Talla</FieldLabel>
              <Input
                type="text"
                placeholder="Talla"
                name="size"
                onChange={(e) => inputChange('size', e.target.value)}
                value={formValue.size}
              />
            </Field>
            <Field>
              <FieldLabel>Color</FieldLabel>
              <Input
                type="text"
                placeholder="Color"
                name="color"
                onChange={(e) => inputChange('color', e.target.value ?? null)}
                value={formValue.color || ''}
              />
            </Field>
            <Field>
              <FieldLabel>Stock</FieldLabel>
              <Input
                type="number"
                placeholder="0"
                name="stock"
                onChange={(e) => inputChange('stock', e.target.value)}
                value={formValue.stock}
              />
            </Field>
            <Field>
              <FieldLabel>Alerta Stock</FieldLabel>
              <Input
                type="number"
                placeholder="0"
                name="stockAlert"
                onChange={(e) => inputChange('stockAlert', e.target.value)}
                value={formValue.stockAlert}
              />
            </Field>
          </div>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button size="sm" type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button size="sm" type="button" onClick={addVariante}>
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
