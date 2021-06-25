/*eslint-disable*/
// accomplished useStores
import React from 'react';
import { MobXProviderContext } from 'mobx-react';
import _store from '~@/store';
export type StoreType = typeof _store;

// declare store type
interface ContextType {
  stores: StoreType;
}
// two functions override
function useStores(): StoreType;
function useStores<T extends keyof StoreType>(storeName: T): StoreType[T];

/**
 * Get root store or define store data name
 * @param storeName define store data name
 * @returns typeof StoreType[storeName]
 */
function useStores<T extends keyof StoreType>(storeName?: T) {
  // this MobXProviderContext support by previous mobx-react
  const rootStore = React.useContext(MobXProviderContext);
  const { stores } = rootStore as ContextType;
  return storeName ? stores[storeName] : stores;
}

export { useStores };
