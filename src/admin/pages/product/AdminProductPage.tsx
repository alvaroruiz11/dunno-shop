import { AdminTitle } from '@/admin/components/AdminTitle';
import { ProductForm } from './ui/ProductForm';

export const AdminProductPage = () => {
  return (
    <>
      <AdminTitle title="Crear producto" />
      <div className="mt-6">
        <ProductForm />
      </div>
    </>
  );
};

export default AdminProductPage;
