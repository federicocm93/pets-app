import "./sidebar.css";
import SidebarLink from "./sidebar-link/SidebarLink";
import { Link } from "react-router-dom";
import Home from '@mui/icons-material/Home';
import Pets from '@mui/icons-material/Pets';
import EmojiPeople from '@mui/icons-material/EmojiPeople';

function Sidebar(){
  return(
    <div className="sidebar">
      <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
        <SidebarLink text="Inicio" Icon={Home} />
      </Link>
      <Link to='/list' style={{ textDecoration: 'none', color: 'black' }}>
        <SidebarLink text="Perdidos" Icon={Pets} />
      </Link>
      <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
        <SidebarLink text="Nosotros" Icon={EmojiPeople} />
      </Link>
    </div>
  );
}
export default Sidebar;
