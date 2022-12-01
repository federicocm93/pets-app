import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import PersistentSidebar from "./components/PersistentSidebar";
import Pets from "@mui/icons-material/Pets";
import AddIcon from "@mui/icons-material/Add";
import EmojiPeople from "@mui/icons-material/EmojiPeople";

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
    <Container>
      <PersistentSidebar
        title={"Pets App"}
        mainOptions={sidebarMainOptions}
        secondaryOptions={sidebarSecondaryOptions}
      />
      <Outlet />
    </Container>
  );
}

export default App;
