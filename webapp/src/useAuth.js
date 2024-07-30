import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const token = localStorage.getItem("access_token");
  let decodedToken = jwtDecode(token);
  let currentDate = new Date();

  // JWT exp is in seconds
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("Token expired.");
    return false;
  } else {
    console.log("Valid token");
    return true;
  }
};
