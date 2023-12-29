import React, { useState } from "react";
import axios from "axios";
import NavBar from "./Navbar";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, delUser } from "../store/user";
import GoogleAtuth from "./GoogleAtuth";
function Login() {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        { withCredentials: true }
      );
      console.log("Inicio de sesión exitoso");
      // Redirige después de un inicio de sesión exitoso
      dispatch(setUser(response.data));
      navigate("/movie/:id");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Credenciales incorrectas. Inténtalo de nuevo.");
      } else {
        setError("Error inesperado. Inténtalo de nuevo más tarde.");
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className=" login">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <GoogleAtuth />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </>
  );
}

export default Login;
