import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Register from "./componentes/Register";
import Login from "./componentes/Login";
import Card from "./componentes/Card";
import Home from "./componentes/Home";
import Favortios from "./componentes/Favortios";
import { useDispatch } from "react-redux";
import { setUser } from "./store/user";
import axios from "axios";
function App() {
  const dispatch = useDispatch();
  //useEffect para que se ejecute al cargar la página.
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/me", { withCredentials: true })
      .then((response) => {
        dispatch(setUser(response.data));
        console.log(response);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/register" element={<Register />} />
        <Route path="/movie/:id" element={<Home />} />
        <Route path="/favoritos" element={<Favortios />} />
      </Routes>
    </Router>
  );
}

export default App;
