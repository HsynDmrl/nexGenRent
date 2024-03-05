export function getDecodedToken(token: string | null) {
	if (!token) {
	  return null;
	}
	try {
	  return JSON.parse(atob(token.split('.')[1]));
	} catch (error) {
	  return null;
	}
}