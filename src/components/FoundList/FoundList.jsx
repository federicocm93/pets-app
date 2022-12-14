import PetCard from "../PetCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { Container, Skeleton, Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { getFoundPets } from "../../api/pets.service";
import styles from "./FoundList.module.css";

export default function FoundList() {
  const [foundList, setFoundList] = useState([]);

  useEffect(() => {
    getFoundPets().then((data) => {
      setFoundList(data);
    });
  }, []);

  const getMoreFound = () => {
    getFoundPets().then((list) => {
      console.log(list);
      setFoundList([...foundList, ...list]);
      console.log(list);
    });
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
        hasMore={true}
        loader={
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                height={350}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                height={350}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                height={350}
                sx={{ borderRadius: 2 }}
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
