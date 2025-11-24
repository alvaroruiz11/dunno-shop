import { Navigate } from 'react-router';

import { useAuthStore } from '@/store/auth/auth.store';
import { useUser } from '@/users/hooks/useUser';
import { toast } from 'sonner';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';

import type { User } from '@/users/interfaces/users-response.interface';
import { ProfileForm } from './ProfileForm';

export const ProfileInfo = () => {
  const userId = useAuthStore((state) => state.user?.id);

  const { mutation, data: user, isError, isLoading } = useUser(userId || '');

  const onSubmit = async (data: Partial<User>) => {
    await mutation.mutateAsync(
      { ...data },
      {
        onSuccess: () => {
          toast.success('Datos actualizados', {
            position: 'top-right',
          });
        },
        onError: (error) => {
          console.log(error);
          toast.error('Error al guardar datos', {
            position: 'top-right',
          });
        },
      }
    );
  };

  if (isError) {
    return <Navigate to="/profile" replace />;
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!user) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <>
      <h2 className="text-xl font-din-next mb-4">Información Personal</h2>
      <ProfileForm user={user} onSubmit={onSubmit}/>
    </>
  );
};
