import { Container } from "@mui/system";
import { useNavigate, Outlet } from "react-router-dom";
import PersistentSidebar from "./components/PersistentSidebar/PersistentSidebar";
import Pets from "@mui/icons-material/Pets";
import AddIcon from "@mui/icons-material/Add";
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { esES } from "@mui/material/locale";
import { useEffect } from "react";

let theme = createTheme(
  {
    palette: {
      background: {
        default: "#f5f6fa",
      },
      primary: {
        main: "#17b978",
        contrastText: "#ffff",
      },
      secondary: {
        main: "#086972",
      },
      text: {
        primary: "#212427",
        error: "#d32f2f",
      },
    },
  },
  esES
);

theme = responsiveFontSizes(theme);

function App() {
  const navigate = useNavigate();
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
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="es-AR">
        <Container>
          <PersistentSidebar
            mainOptions={sidebarMainOptions}
            secondaryOptions={sidebarSecondaryOptions}
          />
          <Outlet />
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
