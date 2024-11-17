import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSimplifiedError } from "../../utils";
import { APIService } from "../../utils/APIService";
import { url } from "../../utils/endpoints";

export interface AuthState {
  loading: boolean;
  fetchLoading: boolean;
  userData: any;
  token: string;
  verifiedStatus: boolean;
  registerSuccess: boolean;
  allCoaches: any;
  allMyStudent: any;
  updateProfileSuccess: boolean;
  allStudents: any;
  redirectUrl: string;
  singleUserProfile: any;
  dashboardStats: any;
}

const initialState: AuthState = {
  loading: false,
  userData: {},
  token: "",
  verifiedStatus: false,
  registerSuccess: false,
  fetchLoading: false,
  allCoaches: [],
  allStudents: [],
  allMyStudent: [],
  updateProfileSuccess: false,
  redirectUrl: "",
  singleUserProfile: [],
  dashboardStats: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: () => {
      return initialState;
    },
    restoreDefault: (state) => {
      state.registerSuccess = false;

      state.updateProfileSuccess = false;
      state.redirectUrl = "";
    },
    resetRedirect: (state) => {
      state.redirectUrl = "";
    },

    saveRedirectUrl: (state, action: PayloadAction<any>) => {
      state.redirectUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;

        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(socialRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(socialRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload;
        state.token = payload.tokens;
      })
      .addCase(socialRegister.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload.data?.user;
        state.token = payload.data?.token;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
      })

      .addCase(verifyUserEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUserEmail.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.verifiedStatus = true;
      })
      .addCase(verifyUserEmail.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.userData = payload.data;
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userData = payload.data;
        state.updateProfileSuccess = true;
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getAllCoaches.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCoaches.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allCoaches = payload.data;
      })
      .addCase(getAllCoaches.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getAllStudent.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllStudent.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.allStudents = payload.data;
      })
      .addCase(getAllStudent.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getAllMyStudent.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getAllMyStudent.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.allMyStudent = payload.data;
      })
      .addCase(getAllMyStudent.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getSingleUserDetail.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getSingleUserDetail.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.singleUserProfile = payload.data;
      })
      .addCase(getSingleUserDetail.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(getDashboardStarts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getDashboardStarts.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.dashboardStats = payload;
      })
      .addCase(getDashboardStarts.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.fetchLoading = false;
      });
  },
});

export const registerUser = createAsyncThunk(
  "registerUser",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.register}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.forgotPassword}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.resetPassword}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.put(`${url.updatePassword}`, payload, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const socialRegister = createAsyncThunk(
  "socialRegister",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(`${url.socialRegister}`, payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async (payload: any, { rejectWithValue }) => {
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

export const verifyUserEmail = createAsyncThunk(
  "verifyUserEmail",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await APIService.post(
        `${url.verifyUserEmail}?${payload}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "getUserProfiles",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.userProfile}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);
export const getDashboardStarts = createAsyncThunk(
  "getDashboardStats",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(`${url.stats}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (payload: any, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.put(`${url.userProfile}`, payload, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(
        getSimplifiedError(error.response ? error : error)
      );
    }
  }
);

export const getAllCoaches = createAsyncThunk(
  "getAllCoaches",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.coachByLang}`,

        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
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
export const getSingleUserDetail = createAsyncThunk(
  "getSingleUserDetail",
  async (payload: string | undefined, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.user}/${payload}`,

        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
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
export const getAllStudent = createAsyncThunk(
  "getAllStudent",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.allUser}/student`,

        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
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
export const getAllMyStudent = createAsyncThunk(
  "getAllMyStudent",
  async (_, { rejectWithValue, getState }) => {
    const { auth }: any = getState();
    try {
      const { data } = await APIService.get(
        `${url.allMyStudent}`,

        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
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

export const authSelector = (state: any) => state.auth;

export const { clearState, restoreDefault, resetRedirect, saveRedirectUrl } =
  authSlice.actions;
export default authSlice.reducer;
// function getState(): any {
//   throw new Error("Function not implemented.");
// }
