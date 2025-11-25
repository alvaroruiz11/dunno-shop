import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MapPin } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth/auth.store';
import { getAddressByUserId } from '@/address/actions/get-address-by-user-id.action';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { Link } from 'react-router';
import { CustomDialogConfirm } from '@/components/custom/CustomDialogConfirm';
import { useRef, useState } from 'react';
import { deleteAddressAction } from '@/address/actions/delete-address.action';

export default function AddressesPage() {
  const userId = useAuthStore((state) => state.user?.id);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const selectedAddressId = useRef<string | undefined>(undefined);

  const { data: addresses, isLoading } = useQuery({
    queryKey: ['addresses', { userId: { userId } }],
    queryFn: () => getAddressByUserId(userId || ''),
    staleTime: 1000 * 60 * 5,
  });

  const handleDeleteAddress = async () => {
    await deleteAddressAction(selectedAddressId.current || '');
    queryClient.invalidateQueries({
      queryKey: ['addresses', { userId: { userId } }],
    });
    selectedAddressId.current = undefined;
    setIsOpen(false);
  };

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

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
            {addresses?.map((address) => (
              <div
                key={address.id}
                className="relative border border-gray-200 rounded-md p-5 bg-muted/50 hover:shadow-md transition-all"
              >
                {address.isDefault && (
                  <span className="absolute top-3 right-3 text-xs bg-black text-white px-2 py-0.5 rounded-md">
                    Predeterminada
                  </span>
                )}
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                  <div>
                    <p className="font-medium">
                      {address.firstName} {address.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{`${address.department.name}, ${address.department.province.name}, ${address.department.province.city.name}`}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <Link to={`/account/addresses/${address.id}`}>Editar</Link>
                  </Button>
                  <Button
                    onClick={() => {
                      selectedAddressId.current = address.id;
                      setIsOpen(true);
                    }}
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}

            {/* Botón para agregar nueva dirección */}
            <Link
              to="/account/addresses/nuevo"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-5 hover:border-gray-400 transition-all cursor-pointer hover:bg-gray-50"
            >
              <Plus className="w-6 h-6 text-gray-500 mb-2" />
              <span className="text-sm font-medium text-gray-700">
                Agregar dirección
              </span>
            </Link>
          </div>
        </CardContent>
      </Card>
      <CustomDialogConfirm
        title="Confirmar eliminación"
        description="Estas a punto de eliminar esta dirección. ¿Quieres continuar?"
        open={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={handleDeleteAddress}
      />
    </>
  );
}
