import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';

import apiService from './src/features/query/apiService';
import authSlice from './src/features/auth/auth.slice';
import eventCreateService from './src/features/query/eventCreateService';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Only auth slice will be persisted
};

const rootReducer = combineReducers({
  auth: authSlice,
  [apiService.reducerPath]: apiService.reducer,
  [eventCreateService.reducerPath]: eventCreateService.reducer
  // other reducers can be added here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore these actions for the serializable check
      },
    }).concat(apiService.middleware,eventCreateService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
const persistor = persistStore(store);

export { persistor, store };
