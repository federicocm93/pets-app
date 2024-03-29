import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { getPetsById } from "../api/pets.service";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { DateTime } from "luxon";

export default function PetInfo() {
  let params = useParams();
  const [found, setFound] = useState(null);

  useEffect(() => {
    getPetsById(params.foundId).then((data) => {
      setFound(data);
    });
  }, []);

  return (
    <Container style={{ paddingTop: 100 }}>
      {found ? (
        <Card sx={{ margin: 2 }}>
          <CardActionArea>
            <CardMedia component="img" height="500" image={found.image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {found.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {found.breed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Perdido el: {DateTime.fromISO(found.when).toLocaleString()}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ borderRadius: 2, height: 600, margin: 2 }}
        />
      )}
    </Container>
  );
}
