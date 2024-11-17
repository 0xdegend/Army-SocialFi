import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
import session from "redux-persist/lib/storage/session";

import authReducer from "../features/auth/authSlice";


const rootReducer = combineReducers({

  auth: authReducer,
 
});

const persistConfig = {
  key: "root",
  storage: session,
  whitelist: ["auth"], //add any reducer you want to be persisted here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.VITE_NODE_ENV !== "production",
  middleware: (getDefualtMiddleware) =>
    getDefualtMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
