import { create } from 'zustand';
import { getToCart } from '@/actions/cart/getToCart';

interface CartStore {
  items: any[]; 
  fetchItems: (userId: string, jwt: string) => Promise<void>;
}

const useCartStore = create<CartStore>((set) => ({
  items: [],
  fetchItems: async (userId: string, jwt: string) => {
    try {
      const data = await getToCart(userId, jwt);
      set({ items: data }); 
    } catch (error) {
      console.error("Error fetching items:", error); 
    }
  },
}));

export default useCartStore;
