import { GenericStoreState } from '../../utils/redux-devtools/types';
import { devOnly } from '../../utils/redux-devtools/dev-only';
import { devtools } from 'zustand/middleware';
import { storeKey } from '../../utils/redux-devtools/constants';
import create from 'zustand';

export interface BearsState extends GenericStoreState {
  bears: number;
  increasePopulation: () => void;
  removeBear: () => void;
  removeAllBears: () => void;
  setSpecificBearsAmount: (n: number) => void;
}

const storeName = 'app/bears';

export const useBearsStore = create<BearsState>()(devtools((set) => ({
  // [storeKey]: devOnly(storeName),
  bears: 0,
  increasePopulation: () => set((state) => ({
    bears: state.bears + 1,
  }), false, { type: devOnly('increasePopulation') }),
  removeBear: () => set((state) => ({
    bears: state.bears - 1,
  }), false, { type: devOnly('removeBear') }),
  removeAllBears: () => set(() => ({
    bears: 0,
  }), false, { type: devOnly('removeAllBears') }),
  setSpecificBearsAmount: (amount: number) => set(() => ({
    bears: amount,
  }), false, { type: devOnly('setSpecificBearsAmount') }),
}), { name: window.title, storeName: devOnly(storeName) }));

// connectToDevtools(useBearsStore);
