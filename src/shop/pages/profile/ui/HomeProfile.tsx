import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, ShoppingBag, User } from 'lucide-react';

const cards = [
  {
    title: 'Mi cuenta',
    description: 'Actualiza tus datos personales y contraseña.',
    icon: <User className="w-6 h-6 text-emerald-500" />,
  },
  {
    title: 'Direcciones guardadas',
    description: 'Administra tus direcciones de envío y facturación.',
    icon: <MapPin className="w-6 h-6 text-rose-500" />,
  },
  {
    title: 'Mis pedidos',
    description: 'Consulta el estado y el historial de tus compras.',
    icon: <ShoppingBag className="w-6 h-6 text-indigo-600" />,
  },
];

export const HomeProfile = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">¡Bienvenido, Álvaro!</h1>
        <p className="text-gray-600">
          Bienvenido a tu cuenta. Gestiona tu información, pedidos y
          direcciones.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card
            key={card.title}
            className="hover:shadow-md transition-all hover:-translate-y-1"
          >
            <CardContent className="flex flex-col items-center justify-center text-center p-6">
              <div className="mb-3">{card.icon}</div>
              <h3 className="font-semibold text-base mb-1">{card.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{card.description}</p>
              <Button variant="outline" size="sm">
                Ver más
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button size="lg" className="bg-black text-white hover:bg-gray-800">
          Iniciar compras
        </Button>
      </div>
    </div>
  );
};
