import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Detail = () => {
  const { type, uid } = useParams();
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
      const data = await res.json();
      setEntity(data.result.properties);
    };
    loadDetail();
  }, [type, uid]);

  const imgSrc = `/src/assets/img/${type}/${uid}.jpg`;

  if (!entity) return <p className="text-center mt-4">Cargando...</p>;

  return (
    <div className="row align-items-start g-4 detail-view">
      <div className="col-md-5 text-center">
        <img src={imgSrc} className="img-fluid rounded shadow" alt={entity.name} />
      </div>

      <div className="col-md-7">
        <h1 className="mb-3 text-warning fw-bold">{entity.name}</h1>

        <table className="table table-dark table-striped table-bordered align-middle">
          <tbody>
            {Object.entries(entity).map(([key, value]) => (
              <tr key={key}>
                <th className="text-capitalize w-25">
                  {key.replaceAll("_", " ")}
                </th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link to="/" className="btn btn-outline-warning mt-3">
          ← Volver
        </Link>
      </div>
    </div>
  );
};
