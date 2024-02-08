import { TokenDetails } from "./tokenDetails";

export interface AuthState {
    token: string;
    refreshToken: string;
    tokenDetails: TokenDetails;
    isAuthenticated: boolean;
}