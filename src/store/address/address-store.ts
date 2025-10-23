import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  address: {
    email: string;
    firstName: string;
    lastName: string;
    ci: string;
    phone: string;
    departmentId: string;
    provinceId: string;
    cityId: string;
    address: string;
    reference?: string;
  };

  // Methods
  setAddress: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        email: '',
        firstName: '',
        lastName: '',
        ci: '',
        phone: '',
        departmentId: '',
        provinceId: '',
        cityId: '',
        address: '',
      },

      setAddress: (address) => {
        set({ address: address });
      },
    }),
    { name: 'address-storage' }
  )
);
