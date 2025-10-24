import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomPasswordInput } from '@/components/custom/CustomPasswordInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Save, X } from 'lucide-react';
import { Link } from 'react-router';

export const AdminSellerPage = () => {
  return (
    <>
      <AdminTitle title="Crear vendedor" />
      <div className="mt-6">
        {/* TODO: puede ser un UserForm */}
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
                    <FieldLabel>Nombres</FieldLabel>
                    <Input type="text" placeholder="Nombre" />
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  </Field>
                  <Field>
                    <FieldLabel>Apellidos</FieldLabel>
                    <Input type="text" placeholder="Apellidos" />
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  </Field>
                  <Field className="md:col-span-2">
                    <FieldLabel>Correo Electrónico</FieldLabel>
                    <Input type="text" placeholder="example@mail.com" />
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  </Field>
                </div>
              </CardContent>
            </Card>
            {/* Password */}
            <Card className="rounded-md">
              <CardHeader>
                <CardTitle>
                  <span className="text-lg">Crear Contraseña</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel>Contraseña</FieldLabel>
                    <CustomPasswordInput placeholder="Contraseña" />
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  </Field>
                  <Field>
                    <FieldLabel>Confirmar Contraseña</FieldLabel>
                    <CustomPasswordInput placeholder="Confirmar Contraseña" />
                    <p className="text-destructive text-xs">
                      Este campo es requerido
                    </p>
                  </Field>
                </div>
              </CardContent>
            </Card>
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
      </div>
    </>
  );
};

export default AdminSellerPage;
