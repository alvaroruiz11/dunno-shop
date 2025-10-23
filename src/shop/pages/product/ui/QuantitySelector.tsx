import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const incrementQuantity = () => {
    onQuantityChanged(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity === 1) return;
    onQuantityChanged(quantity - 1);
  };
  return (
    <div className="flex items-center border px-2 w-max rounded-2xl">
      <Button
        variant="ghost"
        size="sm"
        onClick={decrementQuantity}
        className="py-4.5 rounded-l-md w-7 cursor-pointer"
      >
        <Minus className="w-1 h-1" />
      </Button>
      <span className="w-10 font-din-next text-center">{quantity}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={incrementQuantity}
        className="py-4.5 rounded-r-md w-7 cursor-pointer"
      >
        <Plus className="w-1 h-1" />
      </Button>
    </div>
  );
};
