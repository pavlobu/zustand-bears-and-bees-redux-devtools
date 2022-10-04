/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Dictionary } from 'lodash';
import { GenericStoreState } from './types';
import { StoreApi } from 'zustand';
import { actionKey, storeKey } from './constants';
import { isDevEnv } from './is-dev-env';
import isEqual from 'lodash/isEqual';
import keyBy from 'lodash/keyBy';

type ReduxDevtoolsConnection = {
  init: (state: Dictionary<GenericStoreState>) => void;
  send: (alias: string, state: unknown) => void;
  subscribe: (callback: (evt: { state: string; type: string }) => void) => void;
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: {
      connect: (args: { name: string }) => ReduxDevtoolsConnection;
    };
    ENVIRONMENT: string;
    title: string;
  }
}

let connection: ReduxDevtoolsConnection | undefined;
if (isDevEnv) {
  connection = window.__REDUX_DEVTOOLS_EXTENSION__?.connect({
    name: window.title,
  });
}

const storeInits: GenericStoreState[] = [];
const stores: StoreApi<GenericStoreState>[] = [];
// TODO: handle remove store if no one is using it anymore
// TODO: but maybe it is unnecessary, coz we are only using this tool in dev envs

const connectStoreToReduxDevtools = (store: StoreApi<GenericStoreState>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const storeAlias = store.getState()[storeKey] as string;
  if (storeAlias === undefined) {
    throw new Error(`Your store should have "${storeKey}" key value pair set. e.g. "${storeKey}": "app/bear"`);
  }
  stores.push(store);
  storeInits.push(store.getState());
  const inits = keyBy(storeInits, storeKey);
  connection?.init(inits);

  let isUpdateFromDevtools = false;
  connection?.subscribe((evt) => {
    if (evt.type === 'DISPATCH') {
      if (evt.state === undefined) {
        return;
      }
      const newState = JSON.parse(evt.state) as GenericStoreState;
      isUpdateFromDevtools = true;
      // @ts-ignore
      if (!isEqual(store.getState(), newState[storeAlias])) {
        // @ts-ignore
        store.setState(newState[storeAlias]);
      }
      isUpdateFromDevtools = false;
    }
  });

  store.subscribe((newState) => {
    const storesStates = stores.map((storeState) => storeState.getState());
    const currentStates = keyBy(storesStates, storeKey);
    if (!isUpdateFromDevtools) {
      connection?.send(`${storeAlias}/${newState[actionKey] ?? 'NO-ACTION-KEY'}`, {
        ...currentStates,
        [storeAlias]: newState,
      });
    }
  });
};

// eslint-disable-next-line import/no-default-export
export default connectStoreToReduxDevtools;
