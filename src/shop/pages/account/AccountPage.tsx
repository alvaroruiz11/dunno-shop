import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import {
  MapPin,
  Package,
  User,
  LogOut,
  Home,
  LayoutDashboard,
} from 'lucide-react';

import { useAuthStore } from '@/store/auth/auth.store';
import { Link, NavLink, Outlet } from 'react-router';
import clsx from 'clsx';

const navLinks = [
  { id: 'home', label: 'Inicio', icon: Home, href: '/account/home' },
  {
    id: 'info',
    label: 'Información personal',
    icon: User,
    href: '/account/info',
  },
  {
    id: 'addresses',
    label: 'Direcciones',
    icon: MapPin,
    href: '/account/addresses',
  },
  {
    id: 'orders',
    label: 'Historial de pedidos',
    icon: Package,
    href: '/account/orders',
  },
];

export default function AccountPage() {
  const logout = useAuthStore((state) => state.logout);
  const isAdmin = useAuthStore((state) => state.isAdmin());

  return (
    <div className="w-full h-full">
      <div className="bg-[#fafbfc] flex">
        <aside className="bg-white fixed md:sticky left-0 w-64 inset-y-0 min-w-64 h-screen border-r border-base-200 flex flex-col">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.id}
                to={item.href}
                className={({ isActive }) =>
                  clsx(
                    'flex w-full items-center gap-2 overflow-hidden rounded-md p-3 text-left outline-hidden transition-[width,height,padding] h-8 text-sm',
                    {
                      'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear':
                        isActive,
                    }
                  )
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={clsx(
                  'flex w-full items-center gap-2 overflow-hidden rounded-md p-3 text-left outline-hidden transition-[width,height,padding] h-8 text-sm',
                  {
                    'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear':
                      false,
                  }
                )}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            )}
            <Separator className="mb-4" />
            <Button
              variant="ghost"
              onClick={logout}
              className="inline-flex items-center justify-start hover:bg-destructive/10 cursor-pointer"
            >
              <LogOut className="text-destructive" />
              <span className="text-destructive">Cerrar sesión</span>
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
