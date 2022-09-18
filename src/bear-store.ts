import create, { StoreApi } from 'zustand'
// import connectToReduxDevtools from './redux-devtools-connection';
import { GenericStoreState, storeNameKey } from './types';

export interface BearsState extends GenericStoreState {
  bears: number;
  increasePopulation: () => void;
  removeBear: () => void;
  removeAllBears: () => void;
  setSpecificBearsAmount: (n: number) => void;
}

export const useBearStore = create<BearsState>()((set) => ({
  [storeNameKey]: 'bears',
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeBear: () => set((state) => ({ bears: state.bears - 1})),
  removeAllBears: () => set({ bears: 0 }),
  setSpecificBearsAmount: (amount: number) => set({ bears: amount }),
}));

if (process.env.REACT_APP_CUSTOM_NODE_ENV !== 'production') {
  const connectToReduxDevtools: (s: StoreApi<GenericStoreState>) => void = require('./redux-devtools-connection').default;
  // console.log('connectToReduxDevtools!', connectToReduxDevtools);
  connectToReduxDevtools(useBearStore);
}