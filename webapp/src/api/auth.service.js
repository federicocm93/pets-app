import { auth, provider } from "../db/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

export const logInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const loginIn = (username, password) => {
  return axios.post("http://localhost:3000/api/auth/login", { username, password });
};
