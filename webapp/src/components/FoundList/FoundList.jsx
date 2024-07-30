import PetCard from "../PetCard";
import { useEffect } from "react";
import { Container, Skeleton, Grid, Fab, Alert, Box, Pagination, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoundPets, setCurrentPage } from "../../slices/foundPetsSlice";
import TextInput from "../Shared/TextInput";

export default function FoundList() {
  const dispatch = useDispatch();
  const foundList = useSelector((state) => state.foundPets);
  // const hasMore = useSelector((state) => state.foundPets.hasMore);

  useEffect(() => {
    dispatch(fetchFoundPets());
  }, [dispatch]);

  const handlePagination = (event, page) => {
    console.log(page);
    dispatch(setCurrentPage(page));
    dispatch(fetchFoundPets());
  };

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(#c5e2aa,white)",
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
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
        <Grid container spacing={2}>
          {foundList.data.length ? (
            foundList.data.map((pet) => (
              <Grid item xs={6} key={pet._id}>
                <Link to={`${pet._id}`} key={pet._id} style={{ textDecoration: "none" }}>
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
        <Stack spacing={2} alignItems="center" sx={{ marginTop: "auto" }}>
          <Pagination count={foundList.pagination.totalPages} onChange={handlePagination} />
        </Stack>
        {/* <Alert severity="info" sx={{ margin: 2, borderRadius: 2 }}>
          No existen más perdidos
        </Alert> */}
      </Container>
    </Box>
  );
}
