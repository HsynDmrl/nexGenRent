export function getDecodedToken(token) {
	if (!token) {
	  return null;
	}
	try {
	  return JSON.parse(atob(token.split('.')[1]));
	} catch (error) {
	  console.error("Error decoding token:", error);
	  return null;
	}
}