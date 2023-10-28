import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/userSlice";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: { user: userReducer  },
  reducer: persistedReducer,

  middleware: ( getDefaultMiddleware ) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store);
