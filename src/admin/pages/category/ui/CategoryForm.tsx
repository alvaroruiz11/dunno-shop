import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { ChevronsUpDown, Save, X } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { slugPattern } from '@/lib/form-utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';

import type { Category } from '@/categories/interfaces/category.interface';

interface FormInputs extends Category {
  parentId?: string;
}

interface Props {
  category: Category;
  parentCategories: Category[];

  onSubmit: (categoryLike: Partial<Category>) => void;
}

export const CategoryForm = ({
  category,
  parentCategories,
  onSubmit,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: category,
  });
  const [openAdvanced, setOpenAdvanced] = useState(false);
  return (
    <form
      className="max-w-4xl w-full mx-auto pb-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-1 gap-6">
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>
              <span className="text-lg">Información básica</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Field>
                <FieldLabel>Nombre</FieldLabel>
                <Input
                  {...register('name', { required: 'Este campo es requerido' })}
                  id="name"
                  name="name"
                  placeholder="Nombre"
                />
                {errors.name && (
                  <p className="text-destructive text-xs">
                    {errors.name.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel>Slug</FieldLabel>
                <Input
                  {...register('slug', {
                    required: 'Este campo es requerido',
                    pattern: slugPattern,
                  })}
                  id="slug"
                  name="slug"
                  placeholder="Slug"
                />
                {errors.slug && (
                  <p className="text-destructive text-xs">
                    {errors.slug.message}
                  </p>
                )}
              </Field>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>
              <span className="text-lg">Categoría Jerárquica</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                  <NativeSelect {...register('parentId')}>
                    <NativeSelectOption value="">
                      Seleccionar categoría padre
                    </NativeSelectOption>
                    {parentCategories.map((cat) => (
                      <NativeSelectOption key={cat.id} value={cat.id}>
                        {cat.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </Field>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 flex justify-end items-center gap-3">
        <Button size="sm" variant="ghost" type="button" asChild>
          <Link to="/admin/categorias">
            <X />
            Cancelar
          </Link>
        </Button>
        <Button size="sm" type="submit">
          <Save />
          Guardar
        </Button>
      </div>
    </form>
  );
};
