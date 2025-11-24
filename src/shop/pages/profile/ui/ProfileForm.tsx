import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ChevronsUpDown, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Field, FieldLabel } from '@/components/ui/field';
import { CustomPasswordInput } from '@/components/custom/CustomPasswordInput';
import { emailPattern } from '@/lib/form-utils';
import { cn } from '@/lib/utils';
import type { User } from '@/users/interfaces/users-response.interface';

interface FormInputs extends User {
  password?: string;
  currentPassword?: string;
  password2?: string;
}

interface Props {
  user: User;

  onSubmit: (userLike: Partial<User>) => void;
}

export const ProfileForm = ({ user, onSubmit }: Props) => {
  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: user,
  });

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 grid-cols-1">
        {/* Informacion Basica */}
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Información Básica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <Label className="mb-3" htmlFor="firstName">
                  Nombre
                </Label>
                <Input
                  {...register('firstName', {
                    required: 'Este campo es requerido',
                  })}
                  type="text"
                  id="firstName"
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
              </div>
              <div>
                <Label className="mb-3" htmlFor="lastName">
                  Apellidos
                </Label>
                <Input
                  {...register('lastName', {
                    required: 'Este campo es requerido',
                  })}
                  type="text"
                  id="lastName"
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
              </div>
              <div className="col-span-1 md:col-span-2">
                <Label className="mb-3" htmlFor="email">
                  Correo electrónico
                </Label>
                <Input
                  type="text"
                  id="email"
                  placeholder="Correo electrónico"
                  className={cn({
                    'border-destructive': errors.email,
                  })}
                  {...register('email', { pattern: emailPattern })}
                />
                {errors.email && (
                  <p className="text-destructive text-xs">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Contraseñas */}
        <Collapsible
          open={isOpenChangePassword}
          onOpenChange={setIsOpenChangePassword}
        >
          <CollapsibleTrigger asChild>
            <div className="cursor-pointer flex items-center justify-between mb-4 px-3">
              <h4 className="text-lg font-semibold">
                Cambiar contraseña (opcional)
              </h4>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronsUpDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="shadow-none rounded-md">
              <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Field className="lg:col-span-2">
                    <FieldLabel htmlFor="password">
                      Contraseña Actual
                    </FieldLabel>
                    <CustomPasswordInput
                      id="password"
                      placeholder="Contraseña"
                      className={cn({
                        'border-destructive': errors.currentPassword,
                      })}
                      {...register('currentPassword', {
                        minLength: {
                          value: 6,
                          message: 'Tiene que ser mas de 6 caracteres',
                        },
                      })}
                    />
                    {errors.currentPassword && (
                      <p className="text-destructive text-xs">
                        {errors.currentPassword.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Nueva Contraseña</FieldLabel>
                    <CustomPasswordInput
                      id="password"
                      placeholder="Contraseña"
                      {...register('password', {
                        minLength: {
                          value: 6,
                          message: 'Tiene que ser mas de 6 caracteres',
                        },
                      })}
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
                    <FieldLabel htmlFor="confirmPassword">
                      Confirmar Contraseña
                    </FieldLabel>
                    <Input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirmar Contraseña"
                      className={cn({
                        'border-destructive': errors.password2,
                      })}
                      {...register('password2', {
                        validate: (value) => {
                          if (password) {
                            return (
                              value === password || 'La contraseña no coinciden'
                            );
                          }
                        },
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
          </CollapsibleContent>
        </Collapsible>

        {/* Roles */}
      </div>
      <div className="mt-6 flex justify-end items-center gap-3">
        <Button size="sm" type="submit">
          <Save />
          Guardar
        </Button>
      </div>
    </form>
  );
};
