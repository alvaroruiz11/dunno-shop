import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ProfileInfo = () => {
  return (
    <>
      <h2 className="text-xl font-din-next mb-4">Información Personal</h2>
      <form>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
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
                  <Input type="text" id="firstName" placeholder="Nombre" />
                </div>
                <div>
                  <Label className="mb-3" htmlFor="lastName">
                    Apellidos
                  </Label>
                  <Input type="text" id="lastName" placeholder="Apellidos" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <Label className="mb-3" htmlFor="email">
                    Correo electrónico
                  </Label>
                  <Input
                    type="text"
                    id="email"
                    placeholder="Correo electrónico"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Contraseñas */}
          <Card className="shadow-none rounded-md">
            <CardHeader>
              <CardTitle>Cambiar Contraseña</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Label className="mb-3" htmlFor="password">
                    Contraseña
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Contraseña"
                  />
                </div>
                <div>
                  <Label className="mb-3" htmlFor="confirmPassword">
                    Confirmar Contraseña
                  </Label>
                  <Input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirmar Contraseña"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Roles */}
        </div>
        <div className="mt-6 flex justify-end items-center gap-3">
          <Button size="sm" type="submit">
            <Save />
            Guardar
          </Button>
        </div>
      </form>
    </>
  );
};
