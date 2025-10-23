import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

import { CustomLogo } from '@/components/custom/CustomLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { FormLike } from '@/auth/actions/register.action';
import { emailPattern } from '@/lib/form-utils';
import { useAuthStore } from '@/store/auth/auth.store';
import { toast } from 'sonner';

interface RegisterForm extends FormLike {
  password2: string;
}

export const RegisterPage = () => {
  const navigate = useNavigate();

  const registerUser = useAuthStore((state) => state.register);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>();

  const password = watch('password');

  const onSubmit = async (data: RegisterForm) => {
    const isAuthenticated = await registerUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    });

    if (isAuthenticated) {
      navigate('/');
      return;
    }

    toast.error('Credenciales incorrectas', {
      position: 'top-center',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center">
                <CustomLogo />
                <p className="text-balance text-muted-foreground">
                  Ingrese a nuestra aplicación
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  {...register('firstName', {
                    required: 'El campo es requerido',
                  })}
                  id="firstName"
                  type="text"
                  placeholder="Nombre"
                />
                {errors.firstName && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input
                  {...register('lastName', {
                    required: 'El campo es requerido',
                  })}
                  id="lastName"
                  type="text"
                  placeholder="Apellidos"
                />
                {errors.lastName && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  {...register('email', {
                    required: 'El campo es requerido',
                    pattern: emailPattern,
                  })}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  {...register('password', {
                    required: 'El campo es requerido',
                  })}
                  id="password"
                  type="password"
                  placeholder="********"
                />
                {errors.password && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password2">Confirmar contraseña</Label>
                <Input
                  {...register('password2', {
                    required: 'El campo es requerido',
                    validate: (value) =>
                      value === password || 'La contraseña no coinciden',
                  })}
                  id="password2"
                  type="password"
                  placeholder="********"
                />
                {errors.password2 && (
                  <p className="text-destructive text-xs mt-1">
                    {errors.password2.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Crear cuenta
              </Button>

              <div className="text-center text-sm">
                ¿Ya tienes cuenta?{' '}
                <Link to="/auth/login" className="underline underline-offset-4">
                  Iniciar sesión
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/assets/images/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
