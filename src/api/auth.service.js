import { auth, provider } from "../db/firebase";
import { signInWithPopup } from "firebase/auth";

export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};
