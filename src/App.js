import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import PersistentSidebar from "./components/PersistentSidebar";
import Pets from "@mui/icons-material/Pets";
import AddIcon from "@mui/icons-material/Add";
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#17b978",
      contrastText: "#ffff",
    },
    secondary: {
      main: "#086972",
    },
    text: {
      primary: "#212427",
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  const sidebarMainOptions = [
    {
      text: "Perdidos",
      Icon: Pets,
      path: "/list",
    },
    {
      text: "Nuevo",
      Icon: AddIcon,
      path: "/found",
    },
  ];

  const sidebarSecondaryOptions = [
    {
      text: "Nosotros",
      Icon: EmojiPeople,
      path: "/about",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PersistentSidebar
          mainOptions={sidebarMainOptions}
          secondaryOptions={sidebarSecondaryOptions}
        />
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
