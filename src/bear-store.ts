import create from 'zustand'
import { connectToDevtools } from './utils/connect-to-devtools';
import { GenericStoreState, storeKey } from './utils/types';

export interface BearsState extends GenericStoreState {
  bears: number;
  increasePopulation: () => void;
  removeBear: () => void;
  removeAllBears: () => void;
  setSpecificBearsAmount: (n: number) => void;
}

export const useBearStore = create<BearsState>()((set) => ({
  [storeKey]: 'app/bears',
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeBear: () => set((state) => ({ bears: state.bears - 1})),
  removeAllBears: () => set({ bears: 0 }),
  setSpecificBearsAmount: (amount: number) => set({ bears: amount }),
}));

connectToDevtools(useBearStore);