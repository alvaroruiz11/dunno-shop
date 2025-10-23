import { Link, NavLink } from 'react-router';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from '@/components/ui/navigation-menu';

import { useCartStore } from '@/store/cart/cart-store';
import { CustomLogo } from '@/components/custom/CustomLogo';

// import { useCategories } from '@/categories/hooks/useCategories';

export const TopMenu = () => {
  // const { data: categories = [] } = useCategories();

  const { openCartSidebar } = useCartStore();
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  return (
    <nav className="bg-white sticky w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="container flex flex-wrap items-center justify-between py-6 px-4">
        <Button
          variant="ghost"
          size="sm"
          className="p-1.5 inline-flex md:hidden"
        >
          <Menu className="size-5.5" />
        </Button>
        <CustomLogo />
        <div className="flex md:order-2 md:space-x-0 rtl:space-x-reverse">
          <div className="inline-flex items-center gap-1.5">
            <Button
              className="hidden md:inline-flex p-1.5"
              size="sm"
              variant="ghost"
            >
              <Search className="size-5.5" />
            </Button>

            <Button
              className="hidden md:inline-flex p-1.5"
              size="sm"
              variant="ghost"
              asChild
            >
              <Link to="/auth/login">
                <User className="size-5.5" />
              </Link>
            </Button>

            <Button
              className="p-1.5 relative"
              size="sm"
              variant="ghost"
              onClick={openCartSidebar}
            >
              {totalItemsInCart > 0 && (
                <div>
                  <span className="animate-fade-in absolute text-xs w-5 h-5 inline-flex justify-center items-center rounded-full font-bold -top-1.5 right-0.5 bg-primary text-white">
                    {totalItemsInCart}
                  </span>
                </div>
              )}
              <ShoppingCart className="size-5.5" />
            </Button>
          </div>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex font-din-next font-bold md:space-x-8 flex-row items-center">
            {/* <li>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:text-gray-600/80 transition-colors duration-200 text-base px-1 font-din-next font-bold">
                      VER TODO
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="text-muted-foreground font-medium w-[150px]">
                        {categories.map((category) => (
                          <li key={category.id}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/categoria/${category.name.toLowerCase()}`}
                              >
                                {category.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </li> */}
            <li>
              <NavLink
                to="/genero/men"
                className="block hover:text-gray-600/80 transition-colors duration-200"
              >
                MEN
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/genero/women"
                className="block hover:text-gray-600/80 transition-colors duration-200"
              >
                WOMEN
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/genero/unisex"
                className="block hover:text-gray-600/80 transition-colors duration-200"
              >
                UNISEX
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
