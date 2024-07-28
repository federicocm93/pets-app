import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import foundPetsReducer from "../slices/foundPetsSlice";
import authReducer from "../slices/authSlice";

export default configureStore({
  reducer: {
    foundPets: foundPetsReducer,
    auth: authReducer,
  },
  middleware: [thunk],
});
