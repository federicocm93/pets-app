import { Link, Outlet } from "react-router-dom";
import { getFoundList } from '../data';

export default function FoundList() {
  let foundList = getFoundList();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        {foundList.map((pet) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/list/${pet.id}`}
            key={pet.id}
          >
            {pet.name}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
