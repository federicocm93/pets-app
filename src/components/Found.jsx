import { useParams } from "react-router-dom";
import { getFound } from "../data";

export default function Found() {
  let params = useParams()
  let found = getFound(parseInt(params.foundId, 10))

  return (
    <div>
      <h2> Mascota perdida:</h2>
      <span> Nombre: {found.name}</span>
      <br />
      <span> Raza: {found.breed}</span>
      <br />
      <span> Perdido el dia: {found.when}</span>
    </div>
  );
};
