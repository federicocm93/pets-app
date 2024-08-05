import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import Divider from "@mui/material/Divider";
import { DateTime } from "luxon";

export default function PetCard({ name, breed, image, when }) {
  return (
    <Card
      elevation={6}
      sx={{
        margin: 2,
        borderRadius: 2,
      }}
    >
      <CardActionArea>
        <CardMedia component="img" image={image} sx={{ width: "100%", maxHeight: "200px" }} />
        <CardContent>
          <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Divider light={true} />
          <Box paddingTop={2}>
            <Typography variant="body2" color="text.secondary">
              {breed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Perdido el: {DateTime.fromISO(when).toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
