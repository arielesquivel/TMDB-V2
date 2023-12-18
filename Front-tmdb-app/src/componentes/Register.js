import React, { useState } from "react";
import "../App.css";
import NavBar from "./Navbar";

import axios from "axios";
import { Link } from "react-router-dom";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData,
        { withCredentials: true }
      );
      console.log("Registro exitoso", response.data);
    } catch (error) {
      setError("Error al registrarse. Inténtalo de nuevo.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="Register">
        <h2>Regístrate</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label htmlFor="name">apellido: </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="password">Contraseña: </label>{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <br />
          <button type="submit">Enviar</button>
        </form>
        {error && <p>{error}</p>}
        <Link to="/login">
          <p>El Usuario Ya Está Registrado</p>
        </Link>
      </div>
    </>
  );
}

export default Register;
