import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { X, Save } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { CustomPasswordInput } from '@/components/custom/CustomPasswordInput';
import { Button } from '@/components/ui/button';
import { emailPattern } from '@/lib/form-utils';
import { cn } from '@/lib/utils';

import type { User } from '../interfaces/users-response.interface';

interface FormInputs extends User {
  password?: string;
  currentPassword?: string;
  password2?: string;
}

interface Props {
  user: User;

  onSubmit: (userLike: Partial<User>) => void;
}

export const UserForm = ({ user, onSubmit }: Props) => {
  const navigate = useNavigate();

  const isCreating = user.id === 'crear';

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm<FormInputs>({
    defaultValues: user,
  });

  const password = watch('password');

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        resetField('password');
        resetField('password2');
        resetField('currentPassword');
      })}
    >
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
                <FieldLabel>Nombres</FieldLabel>
                <Input
                  {...register('firstName', {
                    required: 'El campo es requerido',
                  })}
                  type="text"
                  placeholder="Nombre"
                  className={cn({
                    'border-destructive': errors.firstName,
                  })}
                />
                {errors.firstName && (
                  <p className="text-destructive text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel>Apellidos</FieldLabel>
                <Input
                  {...register('lastName', {
                    required: 'El campo es requerido',
                  })}
                  type="text"
                  placeholder="Apellidos"
                  className={cn({
                    'border-destructive': errors.lastName,
                  })}
                />
                {errors.lastName && (
                  <p className="text-destructive text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </Field>
              <Field className="md:col-span-2">
                <FieldLabel>Correo Electrónico</FieldLabel>
                <Input
                  {...register('email', {
                    required: 'El campo es requerido',
                    pattern: emailPattern,
                  })}
                  type="text"
                  placeholder="example@mail.com"
                  className={cn({
                    'border-destructive': errors.email,
                  })}
                />
                {errors.email && (
                  <p className="text-destructive text-xs">
                    {errors.email.message}
                  </p>
                )}
              </Field>
            </div>
          </CardContent>
        </Card>
        {/* Password */}
        <Card className="rounded-md">
          <CardHeader>
            <CardTitle>
              <span className="text-lg">
                {isCreating ? 'Crear Contraseña' : 'Cambiar contraseña'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {!isCreating && (
                <Field className="md:col-span-2">
                  <FieldLabel>Contraseña actual</FieldLabel>
                  <CustomPasswordInput
                    {...register('currentPassword', {
                      minLength: {
                        value: 6,
                        message: 'Tiene que ser mas de 6 caracteres',
                      },
                    })}
                    placeholder="Contraseña actual"
                    className={cn({
                      'border-destructive': errors.currentPassword,
                    })}
                  />
                  {errors.currentPassword && (
                    <p className="text-destructive text-xs">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </Field>
              )}
              <Field>
                <FieldLabel>
                  {isCreating ? 'Contraseña' : 'Nueva contraseña'}
                </FieldLabel>
                <CustomPasswordInput
                  {...register('password', {
                    required: isCreating && 'El campo es requerido',
                    minLength: {
                      value: 6,
                      message: 'Tiene que ser mas de 6 caracteres',
                    },
                  })}
                  placeholder="Contraseña"
                  className={cn({
                    'border-destructive': errors.password,
                  })}
                />
                {errors.password && (
                  <p className="text-destructive text-xs">
                    {errors.password.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel>Confirmar Contraseña</FieldLabel>
                <CustomPasswordInput
                  {...register('password2', {
                    required: isCreating && 'El campo es requerido',
                    validate: (value) => {
                      return value === password || 'La contraseña no coinciden';
                    },
                  })}
                  placeholder="Confirmar Contraseña"
                  className={cn({
                    'border-destructive': errors.password2,
                  })}
                />
                {errors.password2 && (
                  <p className="text-destructive text-xs">
                    {errors.password2.message}
                  </p>
                )}
              </Field>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 flex justify-end items-center gap-3">
        <Button
          size="sm"
          variant="ghost"
          type="button"
          onClick={() => navigate(-1)}
        >
          <X />
          Cancelar
        </Button>
        <Button size="sm" type="submit">
          <Save />
          Guardar
        </Button>
      </div>
    </form>
  );
};
