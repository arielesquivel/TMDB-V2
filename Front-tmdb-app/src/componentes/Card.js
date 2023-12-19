// Card.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../store/favoritos";

const API_URL = "http://api.themoviedb.org/3/";
const API_KEY = "7ac73a60aa590575fb0efba44f9fe9a0";
const URL_IMAGE = "https://image.tmdb.org/t/p/original";

function Card() {
  const users = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favoritos);
  const [movies, setMovies] = useState([]);
  const [movieSearch, setMovieSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState();
  const [filterYear, setFilterYear] = useState();

  const apiMovies = async () => {
    try {
      let type = "search";
      if (!movieSearch) {
        type = "discover";
      }
      const peliculas = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
          query: movieSearch,
          year: filterYear,
        },
      });

      return peliculas.data.results;
    } catch (error) {
      console.log("Error al obtener la información", error);
    }
  };

  // Previsualizador de películas
  const selectMovie = async (movie) => {
    setSelectedMovie(movie);
    console.log(movie);
  };

  const handleFilters = async (e) => {
    e.preventDefault();
    const results = await apiMovies();
    if (results.length) {
      setMovies(results);
    }
  };

  // Añadir a favoritos
  const addToFavorites = (movie) => {
    dispatch(setFavorites({ ...favorites, [movie.id]: movie }));
    console.log("Se añadió a favoritos", movie);
  };

  // Eliminar de favoritos
  const removeFromFavorites = (movie) => {
    const updatedFavorites = { ...favorites };
    delete updatedFavorites[movie.id];
    dispatch(setFavorites(updatedFavorites));
    console.log("Ya no está en favoritos", movie);
  };

  // Traer las películas
  useEffect(() => {
    const fetchMovies = async () => {
      const moviesData = await apiMovies();
      setMovies(moviesData);
    };
    fetchMovies();
  }, [movieSearch]);

  return (
    <>
      <Navbar />

      {/* Buscador de películas  y por año*/}
      <div>
        <form className="form-inline" onSubmit={handleFilters}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setMovieSearch(e.target.value)}
          />
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Year"
            aria-label="Year"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          />

          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>

        {/* Vista individual de las películas */}
        <div className="container mt-2">
          {selectedMovie ? (
            <div>
              <h1 className="display-4">{selectedMovie.title}</h1>
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

                  {/*solo si es usuario deja el boton  de favotitos y cerrar sesion*/}
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
                      <Link to={`/movie/${movie.id}`}>
                        <button
                          onClick={() => selectMovie(movie)}
                          type="button"
                          className="btn btn-light"
                        >
                          Más info
                        </button>
                      </Link>
                    </>
                  ) : (
                    <Link to={`/movie/${movie.id}`}>
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
    </>
  );
}

export default Card;
