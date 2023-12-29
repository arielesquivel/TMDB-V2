import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites, delFavorites } from "../store/favoritos";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const URL_IMAGE = "https://image.tmdb.org/t/p/w500";

function Favoritos() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favoritos);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios
          .get("http://localhost:5000/api/me/favorito", {
            withCredentials: true,
          })
          .then((response) => {
            dispatch(setFavorites(response.data));
            console.log(
              "dispach axios-------",
              dispatch(setFavorites(response.data))
            );
          });
      } catch (error) {
        console.log("Detalles del error:", error);
      }
      fetchFavorites();
    };
  }, [dispatch]);

  const clearFavorites = () => {
    dispatch(delFavorites());
  };

  return (
    <>
      <Navbar />
      <div className="mt-4">
        <h2>Películas Favoritas</h2>
        <div className="row">
          {/*mapea el obj los favoritos y muestra las que estan en favoritos */}
          {Object.values(favorites).map((favMovie) => (
            <div key={favMovie.id} className="col-md-4">
              <img
                className="img_col"
                src={`${URL_IMAGE}${favMovie.poster_path}`}
                alt={favMovie.title}
                height={600}
                width="100%"
              />
              <h4 className="text-center">{favMovie.title}</h4>
            </div>
          ))}
          {/*borra todo el listado de favortitos */}
          <button
            onClick={clearFavorites}
            type="button"
            className="btn btn-light"
          >
            Limpiar Favoritos
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Favoritos;
