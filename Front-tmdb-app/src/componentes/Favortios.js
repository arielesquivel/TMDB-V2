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
    const favorites = async () => {
      try {
        // Realiza la solicitud para obtener las películas favoritas
        const response = await axios.get(
          "http://localhost:5000/api/favoritos",
          {
            withCredentials: true,
          }
        );
        dispatch(setFavorites(response.data));
      } catch (error) {
        console.error("Error al obtener películas favoritas:", error.message);
      }
    };

    favorites();
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
