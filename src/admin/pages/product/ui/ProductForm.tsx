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

import type { Product, Variant } from '@/products/interfaces/product.interface';
import type { Category } from '@/categories/interfaces/category.interface';

interface FormProduct extends Product {
  categoryId: string;
  files?: File[];
  discount?: number;
}

interface Props {
  product: Product;
  categories: Category[];
  onSubmit: (productLike: Partial<FormProduct>) => void;
}

export const ProductForm = ({ product, categories, onSubmit }: Props) => {
  const [dragActive, setDragActive] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormProduct>({
    defaultValues: {
      ...product,
      categoryId: product.category.id,
    },
  });

  const [files, setFiles] = useState<File[]>([]);

  const variants = watch('variants');
  const currentImages = watch('images');

  // variants
  const addVariant = (variant: Variant) => {
    const variantSet = new Set(getValues('variants'));
    variantSet.add(variant);
    setValue('variants', Array.from(variantSet));
  };

  const removeVariant = (variant: Variant) => {
    const variantSet = new Set(getValues('variants'));
    variantSet.delete(variant);
    setValue('variants', Array.from(variantSet));
  };

  const removeImage = (imageName: string) => {
    if (currentImages.length === 1) return;
    const imagesSet = new Set(getValues('images'));
    imagesSet.delete(imageName);
    setValue('images', Array.from(imagesSet));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (!files) return;

    setFiles((prev) => [...prev, ...Array.from(files)]);

    const currentFiles = getValues('files') || [];
    setValue('files', [...currentFiles, ...Array.from(files)]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setFiles((prev) => [...prev, ...Array.from(files)]);
    const currentFiles = getValues('files') || [];
    setValue('files', [...currentFiles, ...Array.from(files)]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                <FieldLabel>Genero</FieldLabel>
                <NativeSelect
                  {...register('gender', {
                    required: 'El campo es requerido',
                  })}
                  defaultValue=""
                  className={cn({ 'border-destructive': errors.gender })}
                >
                  <NativeSelectOption value="">
                    Seleccionar genero
                  </NativeSelectOption>
                  <NativeSelectOption value="MEN">Hombre</NativeSelectOption>
                  <NativeSelectOption value="WOMEN">Mujer</NativeSelectOption>
                  <NativeSelectOption value="KID">Niños</NativeSelectOption>
                  <NativeSelectOption value="UNISEX">Unisex</NativeSelectOption>
                </NativeSelect>
                {errors.gender && (
                  <p className="text-destructive text-xs">
                    {errors.gender.message}
                  </p>
                )}
              </Field>
              <Field className="md:col-span-2">
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
                  {categories.map((category) => (
                    <NativeSelectOption key={category.id} value={category.id}>
                      {category.name}
                    </NativeSelectOption>
                  ))}
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
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
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
            <div className="space-y-3 mt-2">
              <h3 className="text-xs font-medium text-muted-foreground">
                Imágenes actuales
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                {currentImages.map((image, index) => (
                  <div key={index} className="relative group w-14 h-14">
                    <div className="aspect-square rounded-lg flex items-center justify-center">
                      <img
                        src={image}
                        alt="Product"
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    </div>
                    <button
                      type="button"
                      className="cursor-pointer absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      onClick={() => removeImage(image)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={cn('mt-4 space-y-3', { hidden: files.length === 0 })}
            >
              <h3 className="text-xs font-medium text-muted-foreground">
                Imágenes por cargar
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                {files.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="Product"
                    className="rounded-lg w-14 h-14 object-cover"
                  />
                ))}
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
                  type="text"
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
                  type="text"
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
                <Input {...register('discount')} type="text" placeholder="0" />
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
        <ProductVariantsCard
          variants={variants}
          onAddVariant={addVariant}
          onRemoveVariant={removeVariant}
        />
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
