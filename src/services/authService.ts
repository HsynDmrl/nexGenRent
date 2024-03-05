import axiosInstance from "../core/utils/interceptors/axiosInterceptors";
import tokenService from "./tokenService";

class AuthService {

	login(email: string, password: string, rememberMe: boolean): Promise<{ accessToken: string, refreshToken?: string }> {
		return axiosInstance.post("/auth/login", { email, password })
			.then(response => {
				if (rememberMe) {
					const { accessToken, refreshToken } = response.data;
					return { accessToken, refreshToken };
				} else {
					const { accessToken } = response.data;
					return { accessToken };
				}
			})
			.catch(error => {
				throw error;
			});
	}
	

	register(
		name: string,
		surname: string,
		nationalityId: string,
		gsm: string,
		email: string,
		password: string,
		roleId: number): Promise<void> {
		return axiosInstance.post("/auth/register", {name, surname, nationalityId, gsm, email, password, roleId });
	}

	async refreshAccessToken(): Promise<{ accessToken: string, refreshToken: string }> {
		try {
			const refreshToken = tokenService.getRefreshToken();
			if (!refreshToken) throw new Error("No refresh token available.");
	
			const response = await axiosInstance.post("/auth/refresh-token", { refreshToken });
			const { accessToken, refreshToken: newRefreshToken } = response.data;
	
			tokenService.setAllTokens(accessToken, newRefreshToken || refreshToken);
			return { accessToken, refreshToken: newRefreshToken || refreshToken };
		} catch (error) {
			console.error("Refresh token error:", error);
			throw error;
		}
	}
	
}


export default new AuthService();
