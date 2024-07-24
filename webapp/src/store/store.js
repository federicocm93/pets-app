import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import foundPetsReducer from "../slices/foundPetsSlice";

export default configureStore({
  reducer: {
    foundPets: foundPetsReducer,
  },
  middleware: [thunk],
});
