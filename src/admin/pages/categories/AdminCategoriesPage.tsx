import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronRight, ChevronsUpDown, Plus } from 'lucide-react';
import { CategoriesTable } from './ui/CategoriesTable';
import { useCategories } from '@/categories/hooks/useCategories';
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';

export const AdminCategoriesPage = () => {
  const { categories, totalPages } = useCategories();

  const [isOpen, setIsOpen] = useState(false);
  const [openAdvanced, setOpenAdvanced] = useState(false);

  return (
    <>
      <AdminTitle title="Categorías" />
      <div className="mt-6">
        <Card className="shadow-none rounded-md">
          <CardContent className="p-0">
            <div className="px-5 flex justify-between items-center">
              <div>
                <Input
                  type="text"
                  placeholder="Buscar"
                  className="max-w-md w-full"
                />
              </div>
              <Button size="sm" onClick={() => setIsOpen(true)}>
                <Plus />
                Nuevo
              </Button>
            </div>
            <div className="mt-4 pl-5">
              {/* <ProductsTable products={products || []} /> */}
              <CategoriesTable categories={categories || []} />
            </div>
            <div className="p-6 flex justify-end items-center">
              <CustomPagination totalPages={totalPages || 0} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear categoría</DialogTitle>
              <DialogDescription>
                Crea una nueva categoría para tus productos.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <Field>
                <FieldLabel>Nombre</FieldLabel>
                <Input id="name" name="name" placeholder="Nombre" />
              </Field>
              <Field>
                <FieldLabel>Slug</FieldLabel>
                <Input id="slug" name="slug" placeholder="Slug" />
              </Field>

              <Field>
                <Collapsible open={openAdvanced} onOpenChange={setOpenAdvanced}>
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-sm font-semibold">
                        Categoría padre (opcional)
                      </h4>
                      <Button variant="ghost" size="icon" className="size-8">
                        <ChevronsUpDown />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3">
                    <Field>
                      <NativeSelect>
                        <NativeSelectOption value="">
                          Seleccionar categoría padre
                        </NativeSelectOption>
                        {categories?.map((cat) => (
                          <NativeSelectOption key={cat.id} value={cat.id}>
                            {cat.name}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </Field>
                  </CollapsibleContent>
                </Collapsible>
              </Field>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default AdminCategoriesPage;
