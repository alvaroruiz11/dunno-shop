import { Navigate, useParams } from 'react-router';

import { AdminTitle } from '@/admin/components/AdminTitle';

import { UserForm } from '@/users/components/UserForm';

import { useUser } from '@/users/hooks/useUser';
import type { User } from '@/users/interfaces/users-response.interface';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';

export const AdminCustomerPage = () => {
  const { id } = useParams();

  const { data: user, isLoading, isError } = useUser(id || '');

  const handleSubmit = (data: Partial<User>) => {
    console.log({ data });
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
