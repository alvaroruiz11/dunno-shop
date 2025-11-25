import { Navigate, useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Card, CardContent } from '@/components/ui/card';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { AddressForm } from './ui/AddressForm';
import { getDepartmentsAction } from '@/address/actions/locations';
import { useAddress } from '@/address/hooks/useAddress';
import type { Address } from '@/address/interfaces/address.interface';

export const AddressPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: departments, isLoading: isLoadingDepartments } = useQuery({
    queryKey: ['departments'],
    queryFn: getDepartmentsAction,
  });

  const { data: address, isLoading, isError, mutation } = useAddress(id || '');

  const handleSubmit = async (data: Partial<Address>) => {
    await mutation.mutateAsync(data, {
      onSuccess: () => {
        toast.success('Dirección guardada correctamente', {
          position: 'top-right',
        });

        navigate(-1);
      },
      onError: () => {
        toast.error('Error a guardar dirección', {
          position: 'top-right',
        });
      },
    });
  };

  if (isError) {
    return <Navigate to="/account/addresses" replace />;
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (isLoadingDepartments) {
    return <CustomFullScreenLoading />;
  }

  if (!departments) {
    return <Navigate to="/account/addresses" replace />;
  }

  if (!address) {
    return <Navigate to="/account/addresses" replace />;
  }

  return (
    <>
      <h2 className="text-xl font-din-next mb-4">Nueva dirección</h2>
      <div className="w-full mx-auto px-4 pb-24">
        <Card className="shadow-none rounded-md">
          <CardContent>
            <AddressForm
              address={address}
              departments={departments}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
