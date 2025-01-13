import {
  createSlice,
  PayloadAction,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { APIService } from "./APIService";
import { url } from "./endpoints";
import { getSimplifiedError } from ".";
import { toast } from "react-hot-toast";

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
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.userMainData = payload?.user;
        console.log(payload);
      })
      .addCase(getGeneralLeaderboard.fulfilled, (state, { payload }) => {
        state.leaderboard = payload?.leaderboard;
      })
      .addCase(updateAccessLevel.fulfilled, (state, { payload }) => {
        toast.success("🫡 Roger that, Soldier Level Updated");
      })
      .addCase(createCampaign.fulfilled, (state, { payload }) => {
        toast.success("🫡 Roger that, Campaign Created");
      })
      .addCase(addCampaignTweet.fulfilled, (state, { payload }) => {
        toast.success("🫡 Aye Aye, Tweet Added to Campaign");
      })
      .addCase(endCampaign.fulfilled, (state, { payload }) => {
        toast.success("🫡 Aye Aye, Campaign Ended");
      })
      .addCase(claimWelcomePoints.fulfilled, (state, { payload }) => {
        toast.success("🫡 Welcome Points Claimed");
      })
      .addCase(linkEvmWallet.fulfilled, (state, { payload }) => {
        toast.success("🫡 Roger that, Wallet linked successfully");
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

export const createCampaign = createAsyncThunk(
  "createCampaign",
  async (payload: any, { rejectWithValue, getState }) => {
    const { user }: any = getState();
    const token = localStorage.getItem("userAuth");
    try {
      const { data } = await APIService.post(`${url.campaign}`, payload, {
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

export const addCampaignTweet = createAsyncThunk(
  "addCampaignTweet",
  async ({ campaignID, ...payload }: any, { rejectWithValue, getState }) => {
    const { user }: any = getState();
    const token = localStorage.getItem("userAuth");
    try {
      const { data } = await APIService.post(
        `${url.addTweet}${campaignID}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const linkEvmWallet = createAsyncThunk(
  "linkEvmWallet",
  async ({ userID, ...payload }: any, { rejectWithValue, getState }) => {
    const { user }: any = getState();
    const token = localStorage.getItem("userAuth");
    try {
      const { data } = await APIService.post(
        `${url.linkAddress}${userID}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const getAllCampaigns = createAsyncThunk(
  "getAllCampaigns",
  async (payload: any, { rejectWithValue, getState }) => {
    const { user }: any = getState();
    const token = localStorage.getItem("userAuth");
    try {
      const { data } = await APIService.get(`${url.allCampaign}`, {
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

export const updateAccessLevel = createAsyncThunk(
  "updateAccessLevel",
  async (payload: any, { rejectWithValue, getState }) => {
    const { user }: any = getState();
    const token = localStorage.getItem("userAuth");
    try {
      const { data } = await APIService.post(
        `${url.updateAccessLevel}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const endCampaign = createAsyncThunk(
  "endCampaign",
  async ({ campaignID, ...payload }: any, { rejectWithValue, getState }) => {
    const { user }: any = getState();
    const token = localStorage.getItem("userAuth");
    try {
      const { data } = await APIService.get(`${url.endCampaign}${campaignID}`, {
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

export const claimWelcomePoints = createAsyncThunk(
  "claimWelcomePoints",
  async ({ userID, ...payload }: any, { rejectWithValue, getState }) => {
    const { user }: any = getState();
    const token = localStorage.getItem("userAuth");
    try {
      const { data } = await APIService.get(`${url.welcomePoints}${userID}`, {
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
