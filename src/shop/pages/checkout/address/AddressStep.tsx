import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { ProductsInCart } from '../ui/ProductsInCart';
import {
  getCitiesByProvinceAction,
  getDepartmentsAction,
  getProvincesByDepartmentAction,
} from '@/address/actions/locations';

import { useAddressStore } from '@/store/address/address-store';
import type { Location } from '@/address/interfaces/location.interface';

export interface FormInputs {
  email: string;
  firstName: string;
  lastName: string;
  ci: string;
  phone: string;
  departmentId: string;
  provinceId: string;
  cityId: string;
  address: string;
  reference?: string;
}

export const AddressStep = () => {
  const { data: departments, isLoading: isLoadingDepartments } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartmentsAction,
  });

  const address = useAddressStore((state) => state.address);
  const setAddress = useAddressStore((state) => state.setAddress);

  const {
    register,
    reset,
    resetField,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>();

  const departmentId = watch('departmentId');
  const provinceId = watch('provinceId');

  const [provinces, setProvinces] = useState<Location[]>([]);
  const [cities, setCities] = useState<Location[]>([]);

  const onSubmit = (data: FormInputs) => {
    setAddress(data);
    window.location.hash = '#payment';
  };

  useEffect(() => {
    if (departmentId) {
      getProvincesByDepartmentAction(departmentId).then((resp) =>
        setProvinces(resp)
      );
      resetField('provinceId');
      resetField('cityId');
      setCities([]);
      setProvinces([]);
    }
  }, [departmentId, resetField]);

  useEffect(() => {
    if (provinceId) {
      getCitiesByProvinceAction(provinceId).then((resp) => setCities(resp));
      resetField('cityId');
    }
  }, [provinceId, resetField]);

  useEffect(() => {
    if (address.firstName) {
      reset(address);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <h2 className="text-2xl font-semibold font-din-next">
              Información de envió
            </h2>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                <Field className="md:col-span-2">
                  <FieldLabel htmlFor="email">
                    Correo electrónico{' '}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...register('email', { required: true })}
                    id="email"
                    placeholder="johndoe@domain.com"
                    className={`${errors.email ? 'border-destructive' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  )}
                  {/* <FieldDescription>
                    <span className="text-sm">
                      Puedes crear una cuenta después de finalizar la compra.
                    </span>
                  </FieldDescription> */}
                </Field>
                <Field>
                  <FieldLabel htmlFor="first-name">
                    Nombres
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...register('firstName', { required: true })}
                    id="first-name"
                    placeholder="Nombres"
                    className={`${
                      errors.firstName ? 'border-destructive' : ''
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="last-name">
                    Apellidos
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...register('lastName', { required: true })}
                    id="last-name"
                    placeholder="Apellidos"
                    className={`${errors.lastName ? 'border-destructive' : ''}`}
                  />
                  {errors.lastName && (
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="ci">
                    CI/CE
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...register('ci', { required: true })}
                    id="ci"
                    placeholder="1234567"
                    className={`${errors.ci ? 'border-destructive' : ''}`}
                  />
                  {errors.ci && (
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="ci">
                    Número de celular
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...register('phone', { required: true })}
                    id="ci"
                    placeholder="12345678"
                    className={`${errors.phone ? 'border-destructive' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </Field>
              </div>
              {/* Departamento, Provincia, Ciudad */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-6">
                <Field>
                  <FieldLabel htmlFor="department">
                    Departamento
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <NativeSelect
                    id="department"
                    {...register('departmentId', { required: true })}
                    className={`${
                      errors.departmentId ? 'border-destructive' : ''
                    }`}
                    disabled={isLoadingDepartments}
                  >
                    <NativeSelectOption value="">
                      Seleccionar departamento
                    </NativeSelectOption>
                    {departments?.map((d) => (
                      <NativeSelectOption key={d.id} value={d.id}>
                        {d.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  {errors.departmentId && (
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="province">
                    Provincia
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <NativeSelect
                    id="province"
                    {...register('provinceId', { required: true })}
                    disabled={!departmentId}
                    className={`${
                      errors.provinceId ? 'border-destructive' : ''
                    }`}
                  >
                    <NativeSelectOption value="">
                      Seleccionar provincia
                    </NativeSelectOption>
                    {provinces?.map((p) => (
                      <NativeSelectOption key={p.id} value={p.id}>
                        {p.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  {errors.provinceId && (
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="city">
                    Ciudad
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <NativeSelect
                    id="city"
                    {...register('cityId', { required: true })}
                    disabled={!provinceId}
                    className={`${errors.cityId ? 'border-destructive' : ''}`}
                  >
                    <NativeSelectOption value="">
                      Seleccionar ciudad
                    </NativeSelectOption>
                    {cities?.map((c) => (
                      <NativeSelectOption key={c.id} value={c.id}>
                        {c.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  {errors.cityId && (
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  )}
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="address">
                  Dirección
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <Textarea
                  {...register('address', { required: true })}
                  id="address"
                  placeholder="Dirección"
                  className={`${errors.address ? 'border-destructive' : ''}`}
                />
                {errors.address && (
                  <p className="text-destructive text-xs">
                    Este campo es requerido
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="reference">Referencia</FieldLabel>
                <Input
                  {...register('reference')}
                  id="reference"
                  placeholder="Referencia"
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="w-full py-6 text-lg font-din-next"
                  size="lg"
                >
                  Siguiente paso
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
      <Card className="w-full max-w-lg mx-auto h-fit">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold font-din-next">
            <span>Resumen</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductsInCart />
        </CardContent>
        <CardFooter className="justify-center">
          <Button
            size="sm"
            variant="link"
            className="text-muted-foreground"
            asChild
          >
            <Link to="/cart">Volver a carrito</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
