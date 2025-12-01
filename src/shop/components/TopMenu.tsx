import { Link, NavLink } from 'react-router';
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { useCartStore } from '@/store/cart/cart-store';
import { CustomLogo } from '@/components/custom/CustomLogo';
import { useAuthStore } from '@/store/auth/auth.store';

import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { useQuery } from '@tanstack/react-query';
import { getNavigationCategoriesAction } from '@/categories/actions/get-navigation-categories.action copy';
import SearchModal from './SearchModal';

export const TopMenu = () => {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['navigation-categories'],
    queryFn: getNavigationCategoriesAction,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );

  const authStatus = useAuthStore((state) => state.authStatus);
  const { openCartSidebar } = useCartStore();
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  return (
    <>
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
                onClick={() => setIsSearchModalOpen(true)}
              >
                <Search className="size-5.5" />
              </Button>

              <Button
                className="hidden md:inline-flex p-1.5"
                size="sm"
                variant="ghost"
                asChild
              >
                <Link
                  to={`${
                    authStatus === 'authenticated'
                      ? '/account/home'
                      : '/auth/login'
                  }`}
                >
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
            <ul className="flex font-din-next font-bold md:space-x-6 flex-row items-center">
              {/* Botón "Ver todo" con menú desplegable */}
              <li className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  onMouseEnter={() => setIsMenuOpen(true)}
                  onMouseLeave={() => setIsMenuOpen(false)}
                  className="font-din-next font-bold text-base hover:text-gray-600/80 transition-colors duration-200 flex items-center gap-1"
                >
                  Ver todo
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${
                      isMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Menú desplegable */}
                {isMenuOpen && (
                  <div
                    className="absolute left-0 top-4 mt-2 w-[200px] bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-2 z-50"
                    onMouseEnter={() => setIsMenuOpen(true)}
                    onMouseLeave={() => {
                      setIsMenuOpen(false);
                      setHoveredCategoryId(null);
                    }}
                  >
                    <ul className="space-y-0">
                      {categories.length > 0 ? (
                        categories.map((category) => {
                          const hasSubCategories =
                            category.subCategories &&
                            category.subCategories.length > 0;
                          const isHovered = hoveredCategoryId === category.id;

                          return (
                            <li
                              key={category.id}
                              className="relative"
                              onMouseEnter={() =>
                                hasSubCategories &&
                                setHoveredCategoryId(category.id)
                              }
                              onMouseLeave={() => setHoveredCategoryId(null)}
                            >
                              {hasSubCategories ? (
                                <>
                                  <div className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors duration-150">
                                    <div className=" relative flex-1 text-sm text-gray-900 hover:text-primary transition-colors duration-150">
                                      {category.name}
                                    </div>
                                    <ChevronRight className="size-4 text-gray-400 shrink-0 ml-2" />
                                  </div>
                                  {/* Submenú al lado derecho */}
                                  {isHovered && (
                                    <div className="absolute right-0 top-0 ml-1 w-[120px] bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                                      <ul className="space-y-0">
                                        <li>
                                          <Link
                                            to={`/categorias/${category.slug}`}
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors duration-150"
                                          >
                                            <span>Ver todo</span>
                                            <ChevronRight className="size-3.5" />
                                          </Link>
                                        </li>
                                        {category.subCategories.map(
                                          (subCategory) => (
                                            <li key={subCategory.id}>
                                              <Link
                                                to={`/categorias/${subCategory.slug}`}
                                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                                              >
                                                {subCategory.name}
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Link
                                  to={`/categorias/${category.slug}`}
                                  className="block px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-50 hover:text-primary transition-colors duration-150"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {category.name}
                                </Link>
                              )}
                            </li>
                          );
                        })
                      ) : (
                        <li className="px-4 py-2 text-sm text-gray-500">
                          No hay categorías disponibles
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </li>

              {/* Enlaces de género */}
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
      <SearchModal
        open={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};
