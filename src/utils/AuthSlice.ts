import {
  createSlice,
  PayloadAction,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { APIService } from "./APIService";
import { url } from "./endpoints";
import { getSimplifiedError } from ".";

interface UserState {
  user: any;
  address: string | null;
  balance: number | null;
  apiResponse: any;
  loading: boolean;
  token: string;
  userMainData: any;
}

const initialState: UserState = {
  user: null,
  address: null,
  balance: null,
  apiResponse: null,
  loading: false,
  token: "",
  userMainData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload?.data?.token;
        state.apiResponse = payload;

        console.log(payload);
      })
      .addCase(authenticateUser.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.userMainData = payload;
        console.log(payload)
      });
  },
});

export const authenticateUser = createAsyncThunk(
  "authenticateUser",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.post(`${url.login}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "getUserProfile",
  async (payload: any, { rejectWithValue, getState }) => {
    const { user }: any = getState();
    const token = localStorage.getItem("userAuth");
    try {
      const { data } = await APIService.get(`${url.profile}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
