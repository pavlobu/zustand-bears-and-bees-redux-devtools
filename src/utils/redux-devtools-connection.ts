import { StoreApi } from "zustand";
import { GenericStoreState, storeKey } from "./types";
import keyBy from 'lodash/keyBy';
import isEqual from "lodash/isEqual";
import { Dictionary } from "lodash";

type ReduxDevtoolsConnection = {
  init: (state: Dictionary<GenericStoreState>) => void;
  send: (alias: string, state: any) => void;
  subscribe: (callback: (evt: { state: string, type: string }) => void) => void;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: {
      connect: (args: { name: string }) => ReduxDevtoolsConnection;
    },
    ENVIRONMENT: string;
    title: string;
  }
}

let connection: ReduxDevtoolsConnection | undefined;

if (process.env.REACT_APP_CUSTOM_NODE_ENV !== 'production') {
  connection = window.__REDUX_DEVTOOLS_EXTENSION__?.connect({
    name: window.title,
  });
}

const storeInits: GenericStoreState[] = [];
const stores: StoreApi<GenericStoreState>[] = [];

const connectStoreToReduxDevtools = (store: StoreApi<GenericStoreState>) => {
    const storeNameKeyAlias = store.getState()[storeKey];
    stores.push(store);
    storeInits.push(store.getState());
    const inits = keyBy(storeInits, storeKey);
    connection?.init(inits);
  
    let isUpdateFromDevtools = false;
    connection?.subscribe((evt) => {
      if (evt.type === "DISPATCH") {
        if (evt.state === undefined) {
          return;
        }
        const newState = JSON.parse(evt.state);
        isUpdateFromDevtools = true;
        if (!isEqual(store.getState(), newState[storeNameKeyAlias])) {
          store.setState(newState[storeNameKeyAlias]);
        }
        isUpdateFromDevtools = false;
      }
    });
  
    store.subscribe((newState) => {
      const storesStates = stores.map((store) => store.getState());
      const currentStates = keyBy(storesStates, storeKey);
      if (!isUpdateFromDevtools) {
        connection?.send(storeNameKeyAlias, {
          ...currentStates,
          [storeNameKeyAlias]: newState
        });
      }
    });
  }

export default connectStoreToReduxDevtools;