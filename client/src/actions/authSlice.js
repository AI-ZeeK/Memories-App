import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signinApi, signupAPi } from "../api";

const LS = localStorage;
const userData =
  LS.getItem("profile") !== null ? JSON.parse(LS.getItem("profile")) : [];

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: "",
  userData,
};
export const signin = createAsyncThunk(
  "auth/signin",
  async (formData, thunkAPI) => {
    try {
      console.log(signin);
      const { data } = await signinApi(formData);
      console.log(data);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("rrerere", error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signin",
  async (formData, thunkAPI) => {
    try {
      const { data } = await signupAPi(formData);
      return data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("rrerere", error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const AuthSlice = createSlice({
  name: "APISERVICE",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
      console.log("ddffff");
    },
    setLogout: (state) => {
      state.token = [];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userData = payload;
        localStorage.setItem("profile", JSON.stringify({ ...payload?.data }));
      })
      .addCase(signin.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = payload;
      });

    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userData = payload;
        localStorage.setItem("profile", JSON.stringify({ ...payload?.data }));
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = payload;
      });
  },
});

export const { reset, setLogout, setMode } = AuthSlice.actions;
export default AuthSlice.reducer;
