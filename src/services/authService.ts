import axiosInstance from "../core/utils/interceptors/axiosInterceptors";
import tokenService from "./tokenService";

class AuthService {

	login(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
		return axiosInstance.post("/auth/login", { email, password })
			.then(response => {
				const { accessToken, refreshToken } = response.data;
				return { accessToken, refreshToken };
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

	async refreshAccessToken(): Promise<void> {
        try {
            const refreshToken = tokenService.getRefreshToken();
            if (!refreshToken) throw new Error("No refresh token available.");

            const response = await axiosInstance.post("/auth/refresh-token", { refreshToken });
            const { accessToken, refreshToken: newRefreshToken } = response.data;
			console.log("refreshAccessToken", accessToken, newRefreshToken);
            tokenService.setAllTokens(accessToken, newRefreshToken || refreshToken);
        } catch (error) {
            console.error("Refresh token error:", error);
            throw error;
        }
    }
	// async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> {
	// 	try {
	// 		const response = await axiosInstance.post("/auth/refresh", { refreshToken });
	// 		const { accessToken, refreshToken: newRefreshToken } = response.data;
	// 		tokenService.setToken(accessToken);
	// 		tokenService.setRefreshToken(newRefreshToken);
	// 		return { accessToken, newRefreshToken };
	// 	} catch (error) {
	// 		console.error("Refresh token error:", error);
	// 		throw error;
	// 	}
	// }
	
	// async loginUserDirectly(email: string, password: string): Promise<void> {
	// 	try {
	// 	  const tokens = await this.login(email, password);
	// 	  const accessToken = tokens.accessToken;
	// 	  const refreshToken = tokens.refreshToken;
	
	// 	  tokenService.setToken(accessToken);
	// 	  tokenService.setRefreshToken(refreshToken);
	// 	} catch (error) {
	// 	  console.error("Login error:", error);
	// 	}
	// }
	
//   async refreshAccessToken(refreshToken: string): Promise<string> {
//     try {
//       const response = await axiosInstance.post("/auth/refresh-", {
//         refreshToken,
//       });

//       console.log("refreshAccessToken");
//       console.log("accessToken:", response.data.accessToken);
//       console.log("refreshToken:", response.data.refreshToken);
      
//       const newAccessToken = response.data.accessToken;
//       const newRefreshToken = response.data.refreshToken;

//       tokenService.setToken(newAccessToken);
//       tokenService.setRefreshToken(newRefreshToken);

//       return newAccessToken;
//     } catch (error) {
//       console.error("Refresh token error:", error);
//       throw error;
//     }
//   }

//   async getTokenFromLogin(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
//     const response = await axiosInstance.post("/auth/login", {
//       email,
//       password,
//     });
//     const tokens = {
//       accessToken: response.data.accessToken,
//       refreshToken: response.data.refreshToken
//     };

//     return tokens;
// 	}

//   async getTokenFromRegister(
//     name: string,
//     surname: string,
//     nationalityId: string,
//     gsm: string,
//     email: string,
//     password: string,
//     roleId: number): Promise<void> {
//     await axiosInstance.post("/auth/register", {name, surname, nationalityId, gsm, email, password, roleId });
//     console.log(name, surname, nationalityId, gsm, email, password, roleId );
//     console.log("Registration request sent successfully");
//   }
}


export default new AuthService();
