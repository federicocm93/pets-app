import { getFoundPets } from "../api/pets.service";

const initialState = {
  list: [],
  hasMore: true,
};

export default function foundPetsReducer(state = initialState, action) {
  switch (action.type) {
    case "foundPets/foundPetsLoaded": {
      if (!action.payload.length) {
        return {
          list: state.list,
          hasMore: false,
        };
      } else {
        return {
          list: [...state.list, ...action.payload],
          hasMore: true,
        };
      }
    }
    default:
      return state;
  }
}

export async function fetchFoundPets(dispatch) {
  const response = await getFoundPets();
  dispatch({ type: "foundPets/foundPetsLoaded", payload: response });
}
