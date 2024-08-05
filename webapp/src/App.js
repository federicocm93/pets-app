import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import PersistentSidebar from "./components/PersistentSidebar/PersistentSidebar";
import Pets from "@mui/icons-material/Pets";
import AddIcon from "@mui/icons-material/Add";
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { esES } from "@mui/material/locale";
import Login from "./components/Login/Login";
import FoundList from "./components/FoundList/FoundList";
import NotFound from "./components/NotFound";
import PetInfo from "./components/PetInfo";
import NewFound from "./components/NewFound/NewFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./publicRoutes";
import PrivateRoutes from "./privateRoutes";

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
        <BrowserRouter>
          <PersistentSidebar
            mainOptions={sidebarMainOptions}
            secondaryOptions={sidebarSecondaryOptions}
          />
          <Outlet />
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route path="list" element={<FoundList />} />
              <Route path="/list/:foundId" element={<PetInfo />} />
              <Route path="/found" element={<NewFound />} />
              <Route path="*" element={<FoundList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
