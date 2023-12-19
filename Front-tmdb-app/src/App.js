//App js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./componentes/Register";
import Login from "./componentes/Login";
import Home from "./componentes/Home";
import Favortios from "./componentes/Favortios";
import { useDispatch } from "react-redux";
import { setUser } from "./store/user";
import axios from "axios";
import CardHome from "./componentes/CardHome";
function App() {
  const dispatch = useDispatch();
  //useEffect para que se ejecute al cargar la página.persistencia de usuario
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/me", { withCredentials: true })
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/movie/:id" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/register" element={<Register />} />
          <Route path="/favoritos" element={<Favortios />} />
          <Route path="/" element={<CardHome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
