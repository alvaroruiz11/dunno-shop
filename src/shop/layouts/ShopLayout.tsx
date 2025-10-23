import { Outlet } from 'react-router';
import { TopMenu } from '../components/TopMenu';
import { Footer } from '../components/Footer';
import { CartSidebar } from '../components/CartSidebar';

export const ShopLayout = () => {
  return (
    <div>
      <TopMenu />
      <CartSidebar />
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
