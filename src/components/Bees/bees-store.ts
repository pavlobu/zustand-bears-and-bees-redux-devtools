import { devOnlyDevtools as devtools } from '@pavlobu/zustand-middleware';
import { reactDevtoolsConnectionName } from '../../utils/redux-devtools/constants';
import create from 'zustand';

export interface BeesState {
  bees: number;
  increasePopulation: () => void;
  removeBee: () => void;
  removeAllBees: () => void;
  setSpecificBeesAmount: (n: number) => void;
}

const store = 'app/bees';

export const useBeesStore = create<BeesState>()(devtools((set) => ({
  bees: 0,
  increasePopulation: () => set((state) => ({
    bees: state.bees + 1,
  }), false, { type: 'increasePopulation' }),
  removeBee: () => set((state) => ({
    bees: state.bees - 1,
  }), false, { type: 'removeBee' }),
  removeAllBees: () => set(() => ({
    bees: 0,
  }), false, { type: 'removeAllBees' }),
  setSpecificBeesAmount: (amount: number) => set(() => ({
    bees: amount,
  }), false, { type: 'setSpecificBeesAmount' }),
}), { name: reactDevtoolsConnectionName, store }));
