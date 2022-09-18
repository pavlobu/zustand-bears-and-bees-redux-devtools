import { StoreApi } from "zustand";
import { GenericStoreState } from "./types";

type ConnectFn = (s: StoreApi<GenericStoreState>) => void;

export const connectToDevtools = (store: StoreApi<GenericStoreState>) => {
  if (process.env.REACT_APP_CUSTOM_NODE_ENV !== 'production') {
    const connectToReduxDevtools: ConnectFn = require('./redux-devtools-connection').default;
    connectToReduxDevtools(store);
  }
}