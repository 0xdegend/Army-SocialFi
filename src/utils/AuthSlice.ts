import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";

interface UserState {
  user: any;
  address: string | null;
  balance: number | null;
  apiResponse: any;
}

const initialState: UserState = {
  user: null,
  address: null,
  balance: null,
  apiResponse: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;

export const store = configureStore({
  reducer: userSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
