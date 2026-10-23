import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";

const secretKey = "your-secret-key";

export const encryptToken = (token) => {
  return CryptoJS.AES.encrypt(token, secretKey).toString();
};

export const decryptToken = (encryptedToken) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
export const getAuthData = () => {
  const encryptedToken = localStorage.getItem("token");
  if (encryptedToken) {
    try {
      const decodedToken = jwtDecode(encryptedToken);
      return decodedToken;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  } else {
    console.log("No token found in localStorage");
    return null;
  }
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
};

export const truncateDescription = (description, wordLimit) => {
  if (!description) return "";

  const words = description.split(" ");
  if (words.length <= wordLimit) {
    return description;
  }

  return words.slice(0, wordLimit).join(" ") + "...";
};

export const setAuthData = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
};

// export const getAuthDatum = () => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     const decodedToken = token ? jwtDecode(token) : null;

//     const user = localStorage.getItem("user");
//     return {
//       decodedToken,
//       user: user ? JSON.parse(user) : null,
//     };
//   }
//   return { decodedToken: null, user: null };
// };

export const getAuthDatum = () => {
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem("token");
      
      if (!token || token.split('.').length !== 3) {
        console.error('Invalid token format');
        return { decodedToken: null, user: null };
      }

      let decodedToken = null;
      try {
        decodedToken = token ? jwtDecode(token) : null;
      } catch (decodeError) {
        console.error('Token decoding failed:', decodeError);

        localStorage.removeItem("token");
        return { decodedToken: null, user: null };
      }

      const user = localStorage.getItem("user");
      let parsedUser = null;
      
      try {
        parsedUser = user ? JSON.parse(user) : null;
      } catch (parseError) {
        console.error('Failed to parse user data:', parseError);

        localStorage.removeItem("user");
        return { decodedToken, user: null };
      }

      return {
        decodedToken,
        user: parsedUser,
      };
    } catch (error) {
      console.error('Error in getAuthDatum:', error);
      return { decodedToken: null, user: null };
    }
  }
  return { decodedToken: null, user: null };
};

export const clearAuthDatum = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
};
