import type { Variant } from '@/products/interfaces/product.interface';

interface Props {
  selectedVariant?: Variant;
  variants: Variant[];
  onVariantChanged: (variant: Variant) => void;
}
export const SizeSelector = ({
  variants,
  selectedVariant,
  onVariantChanged,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onVariantChanged(variant)}
          className={`px-4.5 py-2.5 cursor-pointer rounded-2xl flex items-center justify-center border font-din-next transition-all
            ${
              selectedVariant?.id === variant.id
                ? 'border-black bg-black text-white'
                : 'border-gray-300 hover:border-gray-400'
            }`}
        >
          {variant.size}
        </button>
      ))}
    </div>
  );
};
