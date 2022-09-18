import create, { StoreApi } from 'zustand'
// import connectToReduxDevtools from './redux-devtools-connection';
import { GenericStoreState, storeNameKey } from './types';

export interface CatsState extends GenericStoreState {
  cats: number;
  increasePopulation: () => void;
  removeCat: () => void;
  removeAllCats: () => void;
  setSpecificCatsAmount: (n: number) => void;
}

export const useCatStore = create<CatsState>()((set) => ({
  [storeNameKey]: 'cats',
  cats: 0,
  increasePopulation: () => set((state) => ({ cats: state.cats + 1 })),
  removeCat: () => set((state) => ({ cats: state.cats - 1})),
  removeAllCats: () => set({ cats: 0 }),
  setSpecificCatsAmount: (amount: number) => set({ cats: amount }),
}));

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.BUILD_ENV', process.env.BUILD_ENV);
console.log('process.env.REACT_APP_CUSTOM_NODE_ENV', process.env.REACT_APP_CUSTOM_NODE_ENV);

if (process.env.REACT_APP_CUSTOM_NODE_ENV !== 'production') {
  const connectToReduxDevtools: (s: StoreApi<GenericStoreState>) => void = require('./redux-devtools-connection').default;
  // console.log('connectToReduxDevtools', connectToReduxDevtools);
  connectToReduxDevtools(useCatStore);
}