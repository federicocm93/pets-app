import PetCard from "./PetCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";
import { getPets } from "../api/pets.service";

export default function FoundList() {
  const [foundList, setFoundList] = useState([]);

  useEffect(() => {
    getPets().then((data) => {
      setFoundList(data);
    });
  }, []);

  // TODO: Replace with api call
  const getMoreFound = () => {
    setTimeout(() => {
      setFoundList(
        foundList.concat([
          {
            id: foundList.length + 1,
            name: "Negro",
            breed: "Golden retriever",
            image:
              "https://t1.ea.ltmcdn.com/es/posts/1/6/2/10_curiosidades_del_golden_retriever_21261_600.jpg",
            when: "12/05/2022",
          },
          {
            id: foundList.length + 2,
            name: "Mora",
            breed: "Beagle",
            image: "https://okdiario.com/img/2022/05/10/beagle.jpg",
            when: "22/06/2022",
          },
          {
            id: foundList.length + 3,
            name: "Tito",
            breed: "Pitbull",
            image:
              "https://mascotafiel.com/wp-content/uploads/2014/03/pitbull-portada.jpg",
            when: "06/07/2022",
          },
          {
            id: foundList.length + 4,
            name: "Lala",
            breed: "Dogo argentino",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2gez11MzStYNVGInwB3gI1-Q7rOH6hkV2rA&usqp=CAU",
            when: "27/04/2022",
          },
        ])
      );
    }, 1500);
  };

  return (
    // TODO: Replace inline style with better implementation
    <Container
      id="scrollableContainer"
      maxWidth="sm"
      style={{ marginTop: "100px", height: "100%", overflow: "hidden" }}
    >
      <InfiniteScroll
        dataLength={foundList.length}
        next={getMoreFound}
        hasMore={true}
        // TODO: Fix scrollbar bug when loading more
        loader={
          <div>
            <LinearProgress
              color="success"
              style={{ width: "90%", margin: "0 auto" }}
            />
          </div>
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
