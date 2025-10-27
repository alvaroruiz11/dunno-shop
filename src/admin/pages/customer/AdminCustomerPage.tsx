import { Navigate, useNavigate, useParams } from 'react-router';
import { AdminTitle } from '@/admin/components/AdminTitle';
import { UserForm } from '@/users/components/UserForm';
import { useUser } from '@/users/hooks/useUser';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import type { User } from '@/users/interfaces/users-response.interface';
import { toast } from 'sonner';

export const AdminCustomerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, isError, mutation } = useUser(id || '');

  const handleSubmit = async (data: Partial<User>) => {
    await mutation.mutateAsync(
      { ...data },
      {
        onSuccess: (customer) => {
          toast.success('Cliente datos guardados', { position: 'top-right' });
          navigate(`/admin/clientes/${customer.id}`, { replace: true });
        },
        onError: (error) => {
          console.log(error);
          toast.error('Error al guardar datos del cliente', {
            position: 'top-right',
          });
        },
      }
    );
  };

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (isError) {
    return <Navigate to="/admin/clientes" />;
  }

  if (!user) {
    return <Navigate to="/admin/clientes" />;
  }

  return (
    <>
      <AdminTitle title="Crear cliente" />
      <div className="mt-6">
        {/* TODO: puede ser un UserForm */}
        <UserForm user={user} onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default AdminCustomerPage;
