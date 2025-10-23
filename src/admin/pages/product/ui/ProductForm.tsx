import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { CloudUpload, Save, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import { ProductVariantsCard } from './ProductVariantsCard';
import { cn } from '@/lib/utils';
import { slugPattern } from '@/lib/form-utils';

import type { Product } from '@/products/interfaces/product.interface';

interface FormProduct extends Product {
  categoryId: string;
  files?: File[];
  discount?: number;
}

export const ProductForm = () => {
  const [dragActive, setDragActive] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm<FormProduct>();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  return (
    <form>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Informacion basica */}
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>
              <span className="text-lg">Información básica</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Titulo</FieldLabel>
                <Input
                  {...register('title', { required: 'El campo es requerido' })}
                  placeholder="Titulo"
                  className={cn({ 'border-destructive': errors.title })}
                />
                {errors.title && (
                  <p className="text-destructive text-xs">
                    {errors.title.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel>Categoría</FieldLabel>
                <NativeSelect
                  {...register('categoryId', {
                    required: 'El campo es requerido',
                  })}
                  defaultValue=""
                  className={cn({ 'border-destructive': errors.categoryId })}
                >
                  <NativeSelectOption value="">
                    Seleccionar categoría
                  </NativeSelectOption>
                </NativeSelect>
                {errors.categoryId && (
                  <p className="text-destructive text-xs">
                    {errors.categoryId.message}
                  </p>
                )}
              </Field>
              <Field className="md:col-span-2">
                <FieldLabel>Descripción</FieldLabel>
                <Textarea
                  {...register('description')}
                  placeholder="Descripción"
                />
              </Field>
            </div>
          </CardContent>
        </Card>
        {/* Upload */}
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>
              <span className="text-lg">Subir imágenes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`relative border-2 border-dashed rounded-md p-6 text-center transition-all duration-200 ${
                dragActive
                  ? 'border-blue-400 bg-blue-50/30'
                  : 'border-input hover:border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              // onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-4">
                <CloudUpload className="mx-auto text-muted-foreground size-9" />
                <div>
                  <div>
                    <p className="text-lg font-medium text-primary/80">
                      Arrastra las imágenes aquí
                    </p>
                    <p className="text-sm text-muted-foreground">
                      o haz clic para buscar
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, WebP hasta 10MB cada una
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Precios */}
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>
              <span className="text-lg">Precios</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Precio Costo (Bs.)</FieldLabel>
                <Input
                  {...register('costPrice', { required: true, min: 1 })}
                  type="number"
                  placeholder="0"
                  className={cn({ 'border-destructive': errors.costPrice })}
                />
                {errors.costPrice && (
                  <p className="text-destructive text-xs">
                    El precio debe de ser mayor a 0
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel>Precio Venta (Bs.)</FieldLabel>
                <Input
                  {...register('price', { required: true, min: 1 })}
                  type="number"
                  placeholder="0"
                />
                {errors.price && (
                  <p className="text-destructive text-xs">
                    El precio debe de ser mayor a 0
                  </p>
                )}
              </Field>
              <Field className="md:col-span-2">
                <FieldLabel>Descuento (%)</FieldLabel>
                <Input
                  {...register('discount')}
                  type="number"
                  min="0"
                  placeholder="0"
                />
              </Field>
            </div>
          </CardContent>
        </Card>
        {/* SEO */}
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>
              <span className="text-lg">SEO (Meta)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Slug</FieldLabel>
                <Input
                  {...register('slug', {
                    required: 'El campo es requerido',
                    pattern: slugPattern,
                  })}
                  placeholder="Slug"
                  className={cn({ 'border-destructive': errors.slug })}
                />
                {errors.slug && (
                  <p className="text-destructive text-xs">
                    {errors.slug.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel>Titulo</FieldLabel>
                <Input {...register('title')} placeholder="Meta" />
              </Field>
              <Field className="md:col-span-2">
                <FieldLabel>Descripción</FieldLabel>
                <Textarea placeholder="Descripción" />
              </Field>
            </div>
          </CardContent>
        </Card>
        {/* Variantes Productos */}
        <ProductVariantsCard />
      </div>
      <div className="mt-6 flex justify-end items-center gap-3">
        <Button size="sm" variant="ghost" type="button" asChild>
          <Link to="/admin/productos">
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
