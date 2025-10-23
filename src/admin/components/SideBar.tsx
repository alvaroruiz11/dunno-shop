import { NavLink } from 'react-router';
import {
  ChartNoAxesGantt,
  IdCardLanyard,
  LayoutDashboard,
  Package,
  Shirt,
  Store,
  Users,
} from 'lucide-react';
import { CustomLogo } from '@/components/custom/CustomLogo';
import clsx from 'clsx';
import { NavUser } from './NavUser';

export const SideBar = () => {
  return (
    <>
      <aside className="fixed md:sticky left-0 w-64 inset-y-0 min-w-64 h-screen border-r border-base-200 flex flex-col transition-transform duration-150 md:translate-x-0 z-50">
        <div className="flex justify-center items-center max-h-20 h-full">
          <CustomLogo subtitle="Administrativo" />
        </div>

        <div className="flex min-h-0 p-2 flex-1 flex-col gap-2 overflow-auto">
          <div className="text-sidebar-foreground/70 flex h-8 shrink-0 items-center px-3 text-xs font-bold">
            E-Commerce
          </div>
          <NavLink
            to="/admin/dashboard"
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
            <LayoutDashboard className="size-4" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin/categorias"
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
            <ChartNoAxesGantt className="size-4" />
            <span>Categorías</span>
          </NavLink>
          <NavLink
            to="/admin/productos"
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
            <Shirt className="size-4" />
            <span>Productos</span>
          </NavLink>

          <NavLink
            to="/admin/vendedores"
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
            <IdCardLanyard className="size-4" />
            <span>Vendedores</span>
          </NavLink>
          <NavLink
            to="/admin/clientes"
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
            <Users className="size-4" />
            <span>Clientes</span>
          </NavLink>
          <NavLink
            to="/admin/ordenes"
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
            <Package className="size-4" />
            <span>Ordenes</span>
          </NavLink>
          <NavLink
            to="/admin/tiendas"
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
            <Store className="size-4" />
            <span>Tiendas</span>
          </NavLink>
        </div>
        {/* Footer */}
        <div className="flex flex-col gap-0 p-2">
          <NavUser
            user={{ name: 'Alvaro', email: 'alvaro@google.com', avatar: '' }}
          />
        </div>
      </aside>
    </>
  );
};
