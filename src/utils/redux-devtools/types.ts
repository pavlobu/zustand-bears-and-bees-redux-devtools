import { actionKey, storeKey } from './constants';

export interface GenericStoreState {
  [storeKey]?: string;
  [actionKey]?: string;
}
