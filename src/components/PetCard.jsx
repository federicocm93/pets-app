import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function PetCard ({name, breed, image, when}) {
  return (
    <Card sx={{ margin: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {breed}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Perdido el: {when}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
