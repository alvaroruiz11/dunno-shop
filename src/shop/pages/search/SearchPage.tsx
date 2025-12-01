import { useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/products/hooks/useProducts';
import { ProductGrid } from '@/shop/components/ProductGrid';
import { Search, X } from 'lucide-react';

export const SearchPage = () => {
  const navigate = useNavigate();
  const {
    products,
    isLoading,
    totalPages,
    count,
    query: initialQuery,
  } = useProducts();

  const [query, setQuery] = useState(initialQuery);

  const clearQuery = () => setQuery('');

  const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const target = e.target as HTMLInputElement;

    const query = target.value;

    if (query.length === 0) return;

    navigate(`/search?query=${query.toLowerCase().trim()}`);
    setQuery('');
  };

  return (
    <>
      <div className="w-full bg-[#f7f7f9] py-14 px-6 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Resultados de "{query || initialQuery}"
        </h1>

        {/* Search bar */}
        <div className="flex items-center w-full max-w-3xl relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar…"
            className="rounded-full pr-14 h-12 text-lg"
            onKeyDown={onSearch}
          />

          {/* Clear button */}
          {query && (
            <button
              onClick={clearQuery}
              className="absolute right-14 text-gray-500 hover:text-black transition"
            >
              <X size={20} />
            </button>
          )}

          {/* Search button */}
          <Button className="absolute right-0 h-12 rounded-l-none rounded-r-full px-6 bg-black hover:bg-gray-800">
            <Search size={20} className="text-white" />
          </Button>
        </div>

        {/* Results counter */}
        <p className="mt-10 text-gray-600 text-sm">
          Se muestran <strong>{count}</strong> resultados.
        </p>
      </div>
      <div className="pt-4 pb-20">
        <ProductGrid products={products || []} />
        <CustomPagination totalPages={totalPages || 1} />
      </div>
    </>
  );
};

export default SearchPage;
