//Navbar js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineTeam } from "react-icons/ai";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { delUser } from "../store/user";

function Navbar(user) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.user);
  const handleLogout = async () => {
    try {
      // Realiza la solicitud de cierre de sesión al servidor
      await axios.post("http://localhost:5000/api/logout", null, {
        withCredentials: true,
      });

      // Después de cerrar sesión, redirige a la página de inicio de sesión
      dispatch(delUser(""));
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              TMDB-Plataforma
            </Link>
            {/*si el usuruario esta logeado muestra favoritos y cerrar sesion*/}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {users ? (
                <li className="nav-item">
                  <Link to="/favoritos" className="nav-link">
                    Favoritos
                  </Link>
                  <Link
                    className="nav-link"
                    to="/login/register"
                    onClick={handleLogout}
                  >
                    <AiOutlineTeam /> Cerrar sesión
                  </Link>
                </li>
              ) : (
                <>
                  {/*si el usuario no esta registrado muestra registrate y login*/}
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/login/Register"
                    >
                      <AiOutlineTeam /> Regístrate
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <AiOutlineTeam /> Iniciar Sesión
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
