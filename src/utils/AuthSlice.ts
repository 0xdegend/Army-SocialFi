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
  leaderboard: any;
}

const initialState: UserState = {
  user: null,
  address: null,
  balance: null,
  apiResponse: null,
  loading: false,
  token: "",
  userMainData: null,
  leaderboard: null,
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
        state.user = payload?.data?.user;
        console.log(payload);
      })
      .addCase(authenticateUser.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        localStorage.removeItem("userAuth");
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.userMainData = payload?.user;
        console.log(payload);
      })
      .addCase(getGeneralLeaderboard.fulfilled, (state, { payload }) => {
        state.leaderboard = payload?.leaderboard;
      })
      .addCase(getGeneralLeaderboard.rejected, (state, { payload }) => {
        localStorage.removeItem("userAuth");
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
export const getGeneralLeaderboard = createAsyncThunk(
  "getGeneralLeaderboard",
  async (payload: any, { rejectWithValue, getState }) => {
    const { user }: any = getState();
    const token = localStorage.getItem("userAuth");
    try {
      const { data } = await APIService.get(`${url.generalLeaderboard}`, {
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
