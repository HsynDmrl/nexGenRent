import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import tokenService from "../../services/tokenService";
import { AuthState} from "../../models/auth/authState";
import { LoginCredentials } from "../../models/auth/loginCredentials";

const refreshSession = async () => {
  const tokenResponse = await authService.refreshAccessToken();
  const accessToken = tokenResponse.accessToken;
  const refreshToken = tokenResponse.refreshToken;
  
  return { accessToken, refreshToken };
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, rememberMe }: LoginCredentials & { rememberMe: boolean }) => {
    try {
      let tokenResponse: { accessToken: string, refreshToken?: string } = await authService.login(email, password, rememberMe);
      
      const currentTime = new Date().getTime() / 1000;
      if (tokenService.getTokenExpire() && tokenService.getTokenExpire() < currentTime) {
        tokenResponse = await refreshSession();
      }

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
      state.token = action.payload.accessToken;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.accessToken;
        if (action.payload.refreshToken) {
          state.refreshToken = action.payload.refreshToken;
          tokenService.setToken(state.token);
          tokenService.setRefreshToken(state.refreshToken);
        } else if (action.payload.accessToken && action.payload.accessToken){
          tokenService.setToken(state.token);
        }
        state.tokenDetails = {
          email: tokenService.getEmail() || "",
          tokenStart: tokenService.getTokenStart() || "",
          tokenExpire: tokenService.getTokenExpire() || "",
        };
      })
  },
});

export const authReducer = authSlice.reducer;
export const { logOut, updateTokenDetails }  = authSlice.actions;
