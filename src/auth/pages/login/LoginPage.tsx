import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { CustomLogo } from '@/components/custom/CustomLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/auth/auth.store';
import { toast } from 'sonner';

export const LoginPage = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const isAuthenticated = await login(email, password);

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
          <form className="p-6 md:p-8" onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center">
                <CustomLogo />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="********"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Iniciar Sesión
              </Button>
              <div className="text-center text-sm">
                ¿No tienes cuenta?{' '}
                <Link
                  to="/auth/registro"
                  className="underline underline-offset-4"
                >
                  Crear una
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

export default LoginPage;
