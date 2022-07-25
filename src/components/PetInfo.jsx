import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getFound } from '../data';

export default function PetInfo() {
  let params = useParams();
  let found = getFound(parseInt(params.foundId, 10));

  return (
    <Container>
      <Card
        sx={{ margin: 2 }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="500"
            image={found.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {found.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {found.breed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Perdido el: {found.when}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};
