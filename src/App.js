import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import PersistentSidebar from "./components/persistent-sidebar/PersistentSidebar";
import Pets from '@mui/icons-material/Pets';
import EmojiPeople from '@mui/icons-material/EmojiPeople';

function App() {

  const sidebarMainOptions =  [
    {
      text: "Perdidos",
      Icon: Pets,
      path: "/list"
    },
  ];

  const sidebarSecondaryOptions = [
    {
      text: "Nosotros",
      Icon: EmojiPeople,
      path: "/about"
    },
  ];

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <PersistentSidebar
            title={"Pets App"}
            mainOptions={sidebarMainOptions}
            secondaryOptions={sidebarSecondaryOptions}/>
        </Grid>
        <Grid item md={8}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );

}

export default App;
