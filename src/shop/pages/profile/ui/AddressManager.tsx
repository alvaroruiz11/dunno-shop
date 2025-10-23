import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MapPin } from 'lucide-react';

export default function AddressManager() {
  const addresses = [
    {
      id: 1,
      name: 'Álvaro Ruiz',
      country: 'España',
      default: true,
    },
  ];

  return (
    <>
      <h2 className="text-xl font-din-next mb-4">Direcciones</h2>
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Direcciones Guardados
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Direcciones */}
            {addresses.map((address) => (
              <div
                key={address.id}
                className="relative border border-gray-200 rounded-md p-5 bg-muted/50 hover:shadow-md transition-all"
              >
                {address.default && (
                  <span className="absolute top-3 right-3 text-xs bg-black text-white px-2 py-0.5 rounded-md">
                    Predeterminada
                  </span>
                )}
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">{address.name}</p>
                    <p className="text-sm text-gray-600">{address.country}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" className="flex-1">
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}

            {/* Botón para agregar nueva dirección */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-5 hover:border-gray-400 transition-all cursor-pointer hover:bg-gray-50">
              <Plus className="w-6 h-6 text-gray-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Agregar dirección
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
