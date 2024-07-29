import { auth, provider } from "../db/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const logInWithGoogle = () => {
  return signInWithPopup(auth, provider).then((result) => {
    return {
      access_token: GoogleAuthProvider.credentialFromResult(result)?.accessToken,
      name: result?.user?.displayName,
    };
  });
};

export const loginIn = (username, password) => {
  return axios.post("http://localhost:3000/api/auth/login", { username, password });
};
