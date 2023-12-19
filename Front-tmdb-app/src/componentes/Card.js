// Card.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../store/favoritos";
import Footer from "./Footer";

// Link de TMDB Y CLAVE
const API_URL = "http://api.themoviedb.org/3/";
const API_KEY = "7ac73a60aa590575fb0efba44f9fe9a0";
const URL_IMAGE = "https://image.tmdb.org/t/p/original";
//Card que continene toda la libreria ademas de rendedizar individual

function Card() {
  const users = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favoritos);
  const [movies, setMovies] = useState([]);
  const [movieSearch, setMovieSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState();
  const [filterYear, setFilterYear] = useState();

  // Obtener la función de navegación
  const navigate = useNavigate();

  // Función para obtener información de películas desde TMDB
  const apiMovies = async () => {
    try {
      let type = "discover";
      if (movieSearch) {
        type = "search";
      }
      const peliculas = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          query: movieSearch,
          api_key: API_KEY,
          year: filterYear,
        },
      });

      return peliculas.data.results;
    } catch (error) {
      console.log("Error al obtener la información", error);
    }
  };

  // Función para seleccionar una película y mostrar detalles
  const selectMovie = async (movie) => {
    setSelectedMovie(movie);
    console.log("la pelicula se selcciono", movie.title);
  };

  // Manejar el envío del formulario de filtros
  const handleFilters = async (e) => {
    e.preventDefault();
    const results = await apiMovies();
    if (results.length) {
      setMovies(results);
    } else {
      alert("No se encontraron resultados");
    }
  };

  // Añadir a favoritos
  const addToFavorites = (movie) => {
    dispatch(setFavorites({ ...favorites, [movie.id]: movie }));
    console.log("Se añadió a favoritos");
  };

  // Eliminar de favoritos
  const removeFromFavorites = (movie) => {
    const updatedFavorites = { ...favorites };
    delete updatedFavorites[movie.id];
    dispatch(setFavorites(updatedFavorites));
    console.log("Ya no está en favoritos");
  };

  // Obtener las películas al cargar el componente o al cambiar la búsqueda
  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await apiMovies();
      setMovies(moviesData);

      console.log("useeffect---", moviesData);
    };
    fetchMovies(setMovies);
  }, []);

  return (
    <>
      {/* Barra de navegación */}
      <Navbar />

      {/* Contenedor principal */}
      <div>
        {/* Formulario de búsqueda */}
        <form className="form-inline" onSubmit={handleFilters}>
          {/* Filtro por nombre */}
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Buscar Película o Serie"
            aria-label="Search"
            onChange={(e) => setMovieSearch(e.target.value)}
          />
          {/* Filtro por año */}
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Películas o Serie por Año"
            aria-label="Year"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          />

          {/* Botón para buscar películas */}
          <button className="btn btn-light" type="submit">
            Buscar películas
          </button>
        </form>

        {/* Vista detallada de una película seleccionada */}
        <div className="container mt-2">
          {selectedMovie ? (
            <div>
              <h1 className="display-2">{selectedMovie.title}</h1>
              <img
                src={`${URL_IMAGE}${selectedMovie.poster_path}`}
                alt={selectedMovie.title}
                width="200"
              />
              <p className="card-text">{selectedMovie.overview}</p>
            </div>
          ) : (
            /* Vista general de todas las pelis */
            <div className="row">
              {movies.map((movie) => (
                <div key={movie.title} className="col-md-4">
                  <img
                    className="img_"
                    src={`${URL_IMAGE}${movie.poster_path}`}
                    alt={movie.title}
                    height={600}
                    width="100%"
                  />
                  <h4 className="text-center">{movie.title}</h4>

                  {/* Botones para agregar/quitar de favoritos y ver más detalles */}
                  {users ? (
                    <>
                      {favorites[movie.id] ? (
                        <button
                          onClick={() => removeFromFavorites(movie)}
                          type="button"
                          className="btn btn-light"
                        >
                          Quitar de favoritos
                        </button>
                      ) : (
                        <button
                          onClick={() => addToFavorites(movie)}
                          type="button"
                          className="btn btn-light"
                        >
                          Agregar a favoritos
                        </button>
                      )}

                      {/* Botón para ver más detalles */}
                      <button
                        onClick={() => {
                          selectMovie(movie);
                          navigate(`/movie/${movie.id}`);
                        }}
                        type="button"
                        className="btn btn-light"
                      >
                        Más info
                      </button>
                    </>
                  ) : (
                    <Link to={`/movie/${movie.id}`}>
                      {/* Botón para ver más detalles sin estar logueado */}
                      <button
                        onClick={() => selectMovie(movie)}
                        type="button"
                        className="btn btn-light"
                      >
                        Más info
                      </button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Card;
