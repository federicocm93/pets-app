import PetCard from "../PetCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { Container, Skeleton, Grid, Fab, Alert } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { getFoundPets } from "../../api/pets.service";
import styles from "./FoundList.module.css";

export default function FoundList() {
  const [foundList, setFoundList] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getFoundPets().then((data) => {
      setFoundList(data);
    });
  }, []);

  const getMoreFound = () => {
    getFoundPets().then((list) => {
      if (!list.length) {
        setHasMore(false);
      }
      setFoundList([...foundList, ...list]);
    });
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
