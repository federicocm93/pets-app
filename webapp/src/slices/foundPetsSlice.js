import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFoundPets, getPetsByName } from "../api/pets.service";

const ITEMS_PER_PAGE = 4;

const initialPaginationState = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
};

export const fetchFoundPets = createAsyncThunk(
  "foundPets/fetchFoundPets",
  async (_, { getState }) => {
    const { currentPage } = getState().foundPets.pagination;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    let response;
    try {
      response = await getFoundPets(start, ITEMS_PER_PAGE);
    } catch (error) {
      throw new Error("Failed to fetch foundPets: ", error);
    }

    const totalCount = response.total;
    const totalItems = totalCount ? parseInt(totalCount, 10) : 0;
    const foundPets = await response.items;

    return { foundPets, totalItems };
  }
);

export const searchFoundPetsByName = createAsyncThunk(
  "foundPets/searchFoundPetsByName",
  async (name, { getState }) => {
    const { currentPage } = getState().foundPets.pagination;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    let response;
    try {
      response = await getPetsByName(start, ITEMS_PER_PAGE, name); // Supone que tu API acepta un parámetro `name`
    } catch (error) {
      throw new Error("Failed to fetch foundPets: ", error);
    }

    const totalCount = response.total;
    const totalItems = totalCount ? parseInt(totalCount, 10) : 0;
    const foundPets = await response.items;

    return { foundPets, totalItems };
  }
);

const foundPetsSlice = createSlice({
  name: "foundPets",
  initialState: {
    data: [],
    loading: false,
    error: null,
    pagination: initialPaginationState,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoundPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoundPets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.foundPets;
        state.pagination.totalItems = action.payload.totalItems;
        state.pagination.totalPages = Math.ceil(action.payload.totalItems / ITEMS_PER_PAGE);
      })
      .addCase(fetchFoundPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchFoundPetsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchFoundPetsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.foundPets;
        state.pagination.totalItems = action.payload.totalItems;
        state.pagination.totalPages = Math.ceil(action.payload.totalItems / ITEMS_PER_PAGE);
      })
      .addCase(searchFoundPetsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setSearch } = foundPetsSlice.actions;

export default foundPetsSlice.reducer;
