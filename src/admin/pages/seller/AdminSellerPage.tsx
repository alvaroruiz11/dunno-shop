import { Navigate, useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';

import { useUser } from '@/users/hooks/useUser';
import { UserForm } from '@/users/components/UserForm';
import type { User } from '@/users/interfaces/users-response.interface';

export const AdminSellerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, isError, mutation } = useUser(id || '');

  const handleSubmit = async (data: Partial<User>) => {
    await mutation.mutateAsync(
      { ...data, roles: ['seller'] },
      {
        onSuccess: (data) => {
          toast.success('Vendedor datos guardados correctamente', {
            position: 'top-right',
          });

          navigate(`/admin/vendedores/${data.id}`, { replace: true });
        },
        onError: (error) => {
          console.log(error);
          toast.error('Error al guardar datos del vendedor', {
            position: 'top-right',
          });
        },
      }
    );
  };

  if (isError) {
    return <Navigate to="/admin/vendedores" replace />;
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (!user) {
    return <Navigate to="/admin/vendedores" replace />;
  }

  return (
    <>
      <AdminTitle
        title={user.id === 'crear' ? 'Crear vendedor' : 'Editar vendedor'}
      />
      <div className="mt-6">
        <UserForm user={user} onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default AdminSellerPage;
