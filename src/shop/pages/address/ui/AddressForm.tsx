import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StarIcon } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';
import {
  getCitiesByProvinceAction,
  getProvincesByDepartmentAction,
} from '@/address/actions/locations';

import type { Address } from '@/address/interfaces/address.interface';
import type { Location } from '@/address/interfaces/location.interface';

interface FormInputs extends Address {
  departmentId: string;
  provinceId: string;
  cityId: string;
}

interface Props {
  address: Address;
  departments: Location[];

  onSubmit: (addressLike: Partial<Address>) => void;
}

export const AddressForm = ({ address, departments, onSubmit }: Props) => {
  const {
    register,
    resetField,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      ...address,
      departmentId: address.department.id,
      provinceId: address.department.province.id,
      cityId: address.department.province.city.id,
    },
  });

  const departmentId = watch('departmentId');
  const provinceId = watch('provinceId');
  const cityId = watch('cityId');
  const isDefault = watch('isDefault');

  const [provinces, setProvinces] = useState<Location[]>([]);
  const [cities, setCities] = useState<Location[]>([]);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <div className="flex justify-end">
            <Toggle
              data-state={isDefault ? 'on' : 'off'}
              aria-label="Toggle star"
              className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
              onClick={() => setValue('isDefault', !isDefault)}
            >
              <StarIcon />
              Predeterminado
            </Toggle>
          </div>
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
              <Field>
                <FieldLabel htmlFor="first-name">
                  Nombres
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...register('firstName', { required: true })}
                  id="first-name"
                  placeholder="Nombres"
                  className={`${errors.firstName ? 'border-destructive' : ''}`}
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
                >
                  <NativeSelectOption value="">
                    Seleccionar departamento
                  </NativeSelectOption>
                  {departments.map((d) => (
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
                  value={provinceId}
                  className={`${errors.provinceId ? 'border-destructive' : ''}`}
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
                  value={cityId}
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
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
      <div className="flex items-center justify-end gap-4 pt-6">
        <Button type="button" variant="ghost">
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
};
