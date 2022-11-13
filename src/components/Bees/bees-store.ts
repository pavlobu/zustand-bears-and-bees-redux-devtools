import { GenericStoreState } from '../../utils/redux-devtools/types';
import { devOnly } from '../../utils/redux-devtools/dev-only';
import { devtools } from 'zustand/middleware';
import { storeKey } from '../../utils/redux-devtools/constants';
import create from 'zustand';

export interface BeesState extends GenericStoreState {
  bees: number;
  increasePopulation: () => void;
  removeBee: () => void;
  removeAllBees: () => void;
  setSpecificBeesAmount: (n: number) => void;
}

const storeName = 'app/bees';

export const useBeesStore = create<BeesState>()(devtools((set) => ({
  // [storeKey]: devOnly(storeName),
  bees: 0,
  increasePopulation: () => set((state) => ({
    bees: state.bees + 1,
  }), false, { type: devOnly('increasePopulation') }),
  removeBee: () => set((state) => ({
    bees: state.bees - 1,
  }), false, { type: devOnly('removeBee') }),
  removeAllBees: () => set(() => ({
    bees: 0,
  }), false, { type: devOnly('removeAllBees') }),
  setSpecificBeesAmount: (amount: number) => set(() => ({
    bees: amount,
  }), false, { type: devOnly('setSpecificBeesAmount'), storeName: devOnly(storeName) }),
}), { name: window.title, storeName: devOnly(storeName) }));

// connectToDevtools(useBeesStore);
