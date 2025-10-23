import { Loader2Icon } from 'lucide-react';

export const CustomFullScreenLoading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-3">
      <Loader2Icon className="animate-spin" />
      <span className="font-medium text-xl">Cargando...</span>
    </div>
  );
};
