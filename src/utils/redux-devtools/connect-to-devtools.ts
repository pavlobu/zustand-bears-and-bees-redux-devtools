import { GenericStoreState } from './types';
import { StoreApi } from 'zustand';
import { isDevEnv } from './is-dev-env';

type ConnectFn = (s: StoreApi<GenericStoreState>) => void;

export const connectToDevtools = (store: StoreApi<GenericStoreState>) => {
  if (isDevEnv) {
    import('./redux-devtools-connection')
      .then((module) => {
        const connectToReduxDevtools: ConnectFn = module.default;
        connectToReduxDevtools(store);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Unable to import redux devtools connection module', err);
      });
  }
};
