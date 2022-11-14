import { devOnlyDevtools as devtools } from '@pavlobu/zustand-middleware';
import { reactDevtoolsConnectionName } from '../../utils/redux-devtools/constants';
import create from 'zustand';

export interface BearsState {
  bears: number;
  increasePopulation: () => void;
  removeBear: () => void;
  removeAllBears: () => void;
  setSpecificBearsAmount: (n: number) => void;
}

const store = 'app/bears';

export const useBearsStore = create<BearsState>()(devtools((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({
    bears: state.bears + 1,
  }), false, { type: 'increasePopulation' }),
  removeBear: () => set((state) => ({
    bears: state.bears - 1,
  }), false, { type: 'removeBear' }),
  removeAllBears: () => set(() => ({
    bears: 0,
  }), false, { type: 'removeAllBears' }),
  setSpecificBearsAmount: (amount: number) => set(() => ({
    bears: amount,
  }), false, { type: 'setSpecificBearsAmount' }),
}), { name: reactDevtoolsConnectionName, store }));
