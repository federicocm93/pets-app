import PetCard from "../PetCard";
import { useEffect, useState } from "react";
import {
  Container,
  Skeleton,
  Grid,
  Fab,
  Alert,
  Box,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFoundPets,
  searchFoundPetsByName,
  setCurrentPage,
  setSearch,
} from "../../slices/foundPetsSlice";
import { useDebounce } from "use-debounce";

export default function FoundList() {
  const dispatch = useDispatch();
  const foundList = useSelector((state) => state.foundPets);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue] = useDebounce(inputValue, 500);

  useEffect(() => {
    dispatch(fetchFoundPets());
  }, [dispatch]);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length > 2) {
      dispatch(setSearch(debouncedValue));
      dispatch(searchFoundPetsByName(debouncedValue));
    } else if (debouncedValue.length == 0) {
      dispatch(fetchFoundPets());
    }
  }, [debouncedValue]);

  const handlePagination = (event, page) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchFoundPets());
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(#c5e2aa,white)",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          padding: "20px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <TextField
          type="search"
          placeholder="Ingrese un nombre"
          margin="normal"
          value={inputValue}
          onChange={handleInputChange}
          sx={{
            padding: "10px",
            input: {
              background: "white",
              borderRadius: 4,
              boxShadow: 1,
            },
            "& fieldset": { border: "none" },
            flexGrow: 1,
          }}
        />
        <Link to="../found">
          <Fab
            color="primary"
            aria-label="add"
            style={{
              position: "fixed",
              bottom: "5%",
              right: "5%",
              transform: "scale(1.2)",
            }}
          >
            <AddIcon />
          </Fab>
        </Link>
        <Grid
          container
          spacing={2}
          sx={{
            flexGrow: 1,
          }}
        >
          {foundList.data.length ? (
            foundList.data.map((pet) => (
              <Grid item xs={12} md={6} key={pet._id}>
                <Link to={`/list/${pet._id}`} key={pet._id} style={{ textDecoration: "none" }}>
                  <PetCard
                    key={pet._id}
                    name={pet.name}
                    breed={pet.breed}
                    image={pet.image}
                    when={pet.when}
                  />
                </Link>
              </Grid>
            ))
          ) : (
            <Grid sx={{ flex: 1 }} container>
              <Grid item xs={6}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{ borderRadius: 2, height: 400, margin: 2 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{ borderRadius: 2, height: 400, margin: 2 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{ borderRadius: 2, height: 400, margin: 2 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{ borderRadius: 2, height: 400, margin: 2 }}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="end"
          sx={{ marginTop: "auto", flexGrow: 1 }}
        >
          <Pagination count={foundList.pagination.totalPages} onChange={handlePagination} />
        </Stack>
        {/* <Alert severity="info" sx={{ margin: 2, borderRadius: 2 }}>
          No existen más perdidos
        </Alert> */}
      </Container>
    </Box>
  );
}
