import create from 'zustand'
import { connectToDevtools } from './utils/connect-to-devtools';
import { GenericStoreState, storeKey } from './utils/types';

export interface CatsState extends GenericStoreState {
  cats: number;
  increasePopulation: () => void;
  removeCat: () => void;
  removeAllCats: () => void;
  setSpecificCatsAmount: (n: number) => void;
}

export const useCatStore = create<CatsState>()((set) => ({
  [storeKey]: 'app/cats',
  cats: 0,
  increasePopulation: () => set((state) => ({ cats: state.cats + 1 })),
  removeCat: () => set((state) => ({ cats: state.cats - 1})),
  removeAllCats: () => set({ cats: 0 }),
  setSpecificCatsAmount: (amount: number) => set({ cats: amount }),
}));

connectToDevtools(useCatStore);