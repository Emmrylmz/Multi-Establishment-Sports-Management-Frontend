import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';

import authQueryService from './src/features/query/authQueryService';
import eventQueryService from './src/features/query/eventQueryService';
import authSlice from './src/features/auth/auth.slice';
import teamQueryService from './src/features/query/teamQueryService';
import userInfoQueryService from './src/features/query/userInfoQueryService'; // Import the userInfoQueryService
import paymentQueryService from './src/features/query/paymentQueryService'; // Import the paymentQueryService
import PersonalTrainingService from './src/features/query/personalTrainingService';
import ConstantsQueryService from './src/features/query/constantsQueryService';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Only auth slice will be persisted
};

const rootReducer = combineReducers({
  auth: authSlice,
  [authQueryService.reducerPath]: authQueryService.reducer,
  [eventQueryService.reducerPath]: eventQueryService.reducer,
  [teamQueryService.reducerPath]: teamQueryService.reducer,
  [userInfoQueryService.reducerPath]: userInfoQueryService.reducer, // Add the userInfoQueryService reducer
  [paymentQueryService.reducerPath]: paymentQueryService.reducer, // Add the paymentQueryService reducer
  [PersonalTrainingService.reducerPath]: PersonalTrainingService.reducer,
  [ConstantsQueryService.reducerPath]: ConstantsQueryService.reducer,
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
    }).concat(
      authQueryService.middleware,
      eventQueryService.middleware,
      teamQueryService.middleware,
      userInfoQueryService.middleware, // Add the userInfoQueryService middleware
      paymentQueryService.middleware,
      PersonalTrainingService.middleware,
      ConstantsQueryService.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
const persistor = persistStore(store);

export { persistor, store };
