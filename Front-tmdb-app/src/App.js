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
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/register" element={<Register />} />
          <Route path="/favoritos" element={<Favortios />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
