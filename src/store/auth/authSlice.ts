import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import tokenService from "../../services/tokenService";
import { increaseRequestCount, decreaseRequestCount } from "../loading/loadingSlice";
import { AuthState} from "../../models/auth/authState";
import { LoginCredentials } from "../../models/auth/loginCredentials";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, rememberMe }: LoginCredentials & { rememberMe: boolean }) => {
    try {
      const tokenResponse: { accessToken: string, refreshToken?: string } = await authService.login(email, password, rememberMe);
      return tokenResponse;
    } catch (error) {
      throw error;
    }
  }
);

const initialState: AuthState = {
  token: tokenService.getToken() || "",
  refreshToken: tokenService.getRefreshToken() || "",
  tokenDetails: {
    email: tokenService.getEmail() || "",
    tokenStart: tokenService.getTokenStart() || "",
    tokenExpire: tokenService.getTokenExpire() || "",
  },
  isAuthenticated: tokenService.hasToken() || false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      tokenService.removeToken();
    },
    updateTokenDetails: (state, action) => {
      const { email, tokenStart, tokenExpire } = action.payload;
      state.tokenDetails.email = email;
      state.tokenDetails.tokenStart = tokenStart;
      state.tokenDetails.tokenExpire = tokenExpire;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        increaseRequestCount();
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        decreaseRequestCount();
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
        if (action.payload.refreshToken) {
          state.refreshToken = action.payload.refreshToken;
          tokenService.setToken(state.token);
          tokenService.setRefreshToken(state.refreshToken);
        }else if(action.payload.accessToken && action.payload.accessToken){
          tokenService.setToken(state.token);
        }
        state.tokenDetails = {
          email: tokenService.getEmail() || "",
          tokenStart: tokenService.getTokenStart() || "",
          tokenExpire: tokenService.getTokenExpire() || "",
        };
        //console.log("tokenDetails: ", state.tokenDetails);
        //console.log("accessToken: ", state.token);
        //console.log("refreshToken: ", state.refreshToken);
        //console.log("isAuthenticated: ", state.isAuthenticated);
      })      
      .addCase(loginUser.rejected, (state) => {
        decreaseRequestCount();
      });
  },
});

export const authReducer = authSlice.reducer;
export const { logOut, updateTokenDetails }  = authSlice.actions;
