import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { currencyFormatter } from '@/lib/formatter';
import type { Order } from '@/orders/interfaces/order.interface';
import { QrCode, CreditCard, Download, Share2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  order: Order;
}

type PaymentMethod = 'qr' | 'card' | 'mobile';

export const PaymentMethods = ({ order }: Props) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('qr');
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Simular countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calcular fecha de expiración (24 horas desde ahora)
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24);

  const handleDownloadQR = () => {
    // Simular descarga del QR
    console.log('Descargando QR...');
  };

  const handleShareQR = () => {
    // Simular compartir QR
    if (navigator.share) {
      navigator.share({
        title: 'Código QR de pago',
        text: `Pago de ${currencyFormatter(order.totalAmount)}`,
      });
    }
  };

  const handleGenerateNewQR = () => {
    // Simular generación de nuevo QR
    console.log('Generando nuevo QR...');
  };

  const paymentMethods = [
    {
      id: 'qr' as PaymentMethod,
      name: 'QR-SIMPLE',
      icon: QrCode,
      description: 'Pago con código QR',
    },
    {
      id: 'card' as PaymentMethod,
      name: 'Tarjeta',
      icon: CreditCard,
      description: 'Agregar tarjeta',
    },
    {
      id: 'mobile' as PaymentMethod,
      name: 'Billetera Móvil',
      icon: CreditCard,
      description: 'Pago móvil',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Título y contador */}
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold text-gray-900">
          Métodos de Pago
        </h1>
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2">
          <p className="text-xs text-yellow-800 font-medium">
            Tiempo límite para pagar
          </p>
          <p className="text-sm font-bold text-yellow-900">
            {timeLeft.hours} horas {timeLeft.minutes} minutos{' '}
            {timeLeft.seconds} segundos
          </p>
        </div>
      </div>

      {/* Selección de método de pago */}
      <div>
        <p className="text-sm text-gray-700 mb-3">
          Seleccione su método de pago:
        </p>
        <div className="grid grid-cols-3 gap-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={cn(
                  'relative p-4 border-2 rounded-lg transition-all',
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-green-500 rounded-full p-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}
                <Icon className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                <p className="text-xs text-center font-medium">
                  {method.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido según método seleccionado */}
      {selectedMethod === 'qr' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Código QR-SIMPLE</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Instrucciones */}
            <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
              <li>
                Descargue su QR haciendo click en DESCARGAR QR
              </li>
              <li>
                Abra la aplicación móvil de su banco en su teléfono celular
              </li>
              <li>Seleccione la forma de pago QR-SIMPLE.</li>
              <li>
                Capture el siguiente código QR con la cámara de su teléfono.
              </li>
              <li>
                Espere algunos segundos para que confirmemos su pago.
              </li>
            </ol>

            {/* QR Code placeholder */}
            <div className="flex justify-center">
              <div className="relative bg-white p-6 border-2 border-gray-300 rounded-lg">
                <div 
                  className="w-64 h-64 bg-white rounded flex items-center justify-center relative border-2 border-gray-200"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(0deg, #000 0px, #000 8px, #fff 8px, #fff 16px),
                      repeating-linear-gradient(90deg, #000 0px, #000 8px, #fff 8px, #fff 16px)
                    `,
                    backgroundSize: '32px 32px',
                  }}
                >
                  {/* Ícono de dólar en el centro */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="bg-black rounded-full p-4 shadow-lg">
                      <span className="text-white font-bold text-3xl">$</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="font-bold text-lg">
                    {currencyFormatter(order.totalAmount)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Vence:{' '}
                    {expirationDate.toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}{' '}
                    {expirationDate.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </p>
                  <button
                    onClick={handleGenerateNewQR}
                    className="text-sm text-blue-600 hover:underline mt-2"
                  >
                    Generar nuevo QR
                  </button>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <Button
                onClick={handleDownloadQR}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar QR
              </Button>
              <Button
                onClick={handleShareQR}
                variant="outline"
                className="flex-1 border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir QR
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedMethod === 'card' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Agregar Tarjeta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                Esta es una simulación. Aquí se integraría el formulario para
                agregar una tarjeta de crédito o débito.
              </p>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de tarjeta
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de expiración
                  </label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre en la tarjeta
                </label>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              </div>
            </div>
            
            <Button className="w-full" disabled>
              Agregar Tarjeta
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedMethod === 'mobile' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Billetera Móvil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                Esta funcionalidad estará disponible próximamente.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

