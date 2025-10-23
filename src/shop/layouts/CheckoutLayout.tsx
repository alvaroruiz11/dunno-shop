import { Link, Outlet } from 'react-router';
import { ChevronLeft } from 'lucide-react';

import { CustomLogo } from '@/components/custom/CustomLogo';
import { Button } from '@/components/ui/button';

export const CheckoutLayout = () => {
  return (
    <>
      <nav className="bg-white z-20 sticky w-full top-0 start-0 border-b border-gray-200">
        <div className="container flex flex-wrap items-center justify-between py-6 px-2">
          <CustomLogo subtitle="Checkout" />
          <Button variant="link" asChild>
            <Link to="/cart">
              <ChevronLeft />
              Regresar
            </Link>
          </Button>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default CheckoutLayout;
