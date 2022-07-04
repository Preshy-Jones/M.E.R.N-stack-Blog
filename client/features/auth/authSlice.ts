import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { constants } from "buffer";
import { ClientRequest } from "http";
import client from "../../api/client";
import { RootState } from "../../store/store";
import { LoginPayload } from "../../types/auth";
import { STATUS, Status } from "../../types/status";
import { Constants, ENDPOINTS } from "../../utils/constants";
import { getStorage, setStorage } from "../../utils/localStorage";
import authService from "./authService";

const { GET_CURRENT_USER } = ENDPOINTS;

interface AuthState {
  status: Status;
  isAuthenticated: boolean;
  token: string;
  message: string;
}

const initialState: AuthState = {
  status: STATUS.IDLE,
  isAuthenticated: false,
  token: "",
  message: "",
};
const BASEURL = "http://localhost:8008";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginPayload, thunkAPI) => {
    try {
      return await authService.login(data);
    } catch (error: any) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAuthStatus = createAsyncThunk(
  "auth/current",
  async (state) => {
    try {
      const response = await client.get(GET_CURRENT_USER);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // updateAuthStatus(state) {
    //   const token = getStorage(Constants.AUTH_TOKEN);
    //   if (token) {
    //     state.isAuthenticated = true;
    //     state.token = token;
    //   } else {
    //     state.isAuthenticated = false;
    //   }
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.isAuthenticated = false;
        // console.log(action.payload);
      });
    // .addCase(updateAuthStatus.pending, (state, action) => {
    //   state.status = STATUS.LOADING;
    // })
    // .addCase(updateAuthStatus.fulfilled, (state, action) => {
    //   state.status = STATUS.SUCCESS;
    //   console.log(action.payload);
    //   state.isAuthenticated = true;
    // })
    // .addCase(updateAuthStatus.rejected, (state, action) => {
    //   state.status = STATUS.ERROR;
    //   state.isAuthenticated = false;
    //   console.log(action.payload);
    // });
  },
});

// export const { updateAuthStatus } = authSlice.actions;

export default authSlice.reducer;

export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
