import { getDecodedToken } from "../core/utils/decodeToken/decodeToken";
class TokenService {
	getToken() {
		return localStorage.getItem("accessToken");
	}

	getRefreshToken() {
		return localStorage.getItem("refreshToken");
	}

	setToken(token: string) {
		localStorage.setItem("accessToken", token);
	}

	setRefreshToken(refreshToken: string) {
		localStorage.setItem("refreshToken", refreshToken);
	}

	setAllTokens(token: string, refreshToken: string) {
		this.setToken(token);
		this.setRefreshToken(refreshToken);
	}
	
	removeToken() {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	}

	hasToken() {
		return localStorage.getItem("accessToken") != null;
	}

	getEmail() {
		const decodedToken = getDecodedToken(this.getToken());
		return decodedToken ? decodedToken.sub : null;
	}

	getTokenStart() {
		const decodedToken = getDecodedToken(this.getToken());
		return decodedToken ? decodedToken.iat : null;
	}

	getTokenExpire() {
		const decodedToken = getDecodedToken(this.getToken());
		return decodedToken ? decodedToken.exp : null;
	}
}

export default new TokenService();
