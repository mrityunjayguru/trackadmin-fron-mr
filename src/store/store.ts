import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer, WebStorage } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import  rootReducer  from './index';
const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage as WebStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: import.meta.env.VITE_APP_NODE_ENV !== 'production', // Enable Redux DevTools in development mode
  });
  

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
