import { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import placeholder from "/src/assets/img/placeholder-starwars.png";


export const Card = ({ item, type }) => {
  const { dispatch, store } = useGlobalReducer();
  const { uid, name } = item;

  const imgLocal = new URL(`../assets/img/${type}/${uid}.jpg`, import.meta.url).href;
  const imgExternal = `https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`;
  const imgFallback = placeholder;

  const [imgSrc, setImgSrc] = useState(imgLocal);

  const handleImgError = () => {
    if (imgSrc === imgLocal) setImgSrc(imgExternal);
    else setImgSrc(imgFallback);
  };

  const isFav = store.favorites.some((f) => f.uid === uid && f.type === type);

  return (
    <div className="sw-card">
      <div className="ratio ratio-1x1 img-box">
        <img
          src={imgSrc}
          onError={handleImgError}
          alt={name}
          className="img-fluid"
        />
      </div>

      <div className="card-body-fixed">
        <h5>{name}</h5>

        <div className="card-actions-fixed">
          <Link to={`/${type}/${uid}`} className="btn-blue">Ver más</Link>

          <button
            className={`btn-star ${isFav ? "active" : ""}`}
            onClick={() =>
              dispatch({
                type: "toggle_favorite",
                payload: { type, uid, name },
              })
            }
          >
            ★
          </button>
        </div>
      </div>
    </div>
  );
};
