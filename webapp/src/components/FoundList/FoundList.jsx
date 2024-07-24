import PetCard from "../PetCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";
import { Container, Skeleton, Grid, Fab, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FoundList.module.css";
import { fetchFoundPets } from "../../slices/foundPetsSlice";

export default function FoundList() {
  // const [foundList, setFoundList] = useState([]);
  const foundList = useSelector((state) => state.foundPets.list);
  const hasMore = useSelector((state) => state.foundPets.hasMore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoundPets);
  }, []);

  const getMoreFound = () => {
    // Only fetch more if there are already items in the list
    if (foundList.length) {
      dispatch(fetchFoundPets);
    }

    return foundList;
  };

  return (
    <Container
      id="scrollableContainer"
      maxWidth="sm"
      className={styles.container}
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
      <InfiniteScroll
        dataLength={foundList.length}
        next={getMoreFound}
        hasMore={hasMore}
        scrollThreshold={0.95}
        endMessage={
          <Alert severity="info" sx={{ margin: 2, borderRadius: 2 }}>
            No existen más perdidos
          </Alert>
        }
        loader={
          <Grid sx={{ flexGrow: 1 }} container>
            <Grid item xs={12}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ borderRadius: 2, height: 400, margin: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ borderRadius: 2, height: 400, margin: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{ borderRadius: 2, height: 400, margin: 2 }}
              />
            </Grid>
          </Grid>
        }
      >
        {foundList.map((pet) => (
          <Link
            to={`${pet.id}`}
            key={pet.id}
            style={{ textDecoration: "none" }}
          >
            <PetCard
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              image={pet.image}
              when={pet.when}
            />
          </Link>
        ))}
      </InfiniteScroll>
    </Container>
  );
}
