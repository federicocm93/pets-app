import Button from '@mui/material/Button';
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Button variant="contained">
        <Link to="/list">Found list</Link>
      </Button>
      <Outlet />
    </div>
  );

}

export default App;
