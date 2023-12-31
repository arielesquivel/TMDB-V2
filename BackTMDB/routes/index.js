const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Favorito = require("../models/favoritos");
const { validateUser } = require("../middleware/auth");
const { generateToken } = require("../config/envs");
const API_URL = "http://api.themoviedb.org/3/";
const API_KEY = "7ac73a60aa590575fb0efba44f9fe9a0";
//ruta filtrado de peliculas
router.get("/filter", async (req, res) => {
  try {
    const { query, year, with_genres } = req.query;
    const response = await axios.get(`${API_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        year,
      },
    });

    res.json(response.data.results);
  } catch (error) {
    console.error("error buscando las pelis:", error);
    res.status(500).json({ error: "servidor error" });
  }
});
//registar un usuario
router.post("/register", (req, res) => {
  console.log("body", req.body);
  User.create(req.body).then((user) => {
    console.log("users", user);
    return res.status(201).send(user);
  });
});
// iniciar sesion
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    where: { email },
  }).then((user) => {
    if (!user) return res.send(401);
    user.validatePassword(password).then((isValidate) => {
      if (!isValidate) return res.send(401);
      else {
        const payload = {
          email: user.email,
          name: user.name,
          id: user.id,
        };
        const token = generateToken(payload);
        res.status(201).cookie("token", token).send(payload);
      }
    });
  });
});
//persistencia
router.get("/me", validateUser, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});
//cerrar sesion
router.post("/logout", (req, res) => {
  res.clearCookie("token").sendStatus(204);
});

// favoritos
router.post("/me/favorito", validateUser, async (req, res) => {
  try {
    const email = req.user.email;
    const { tmdb_id } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "No se encontró el perfil del usuario" });
    }

    const userId = user.id;

    // Crear en la base de datos
    const createdFavorito = await Favorito.create({ user_id: userId, tmdb_id });

    return res.status(201).json(createdFavorito);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.get("/me/favorito", validateUser, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "No se encontró el perfil del usuario" });
    }

    const userId = user.id;

    const favoritos = await Favorito.findAll({
      where: { user_id: userId },
    });

    const tmdbIds = favoritos.map((favorito) => favorito.tmdb_id);

    // tmdbIds esta definido
    if (!tmdbIds) {
      return res
        .status(500)
        .json({ message: "Error: tmdbIds no está definido" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.delete("/me/favorito", validateUser, async (req, res) => {
  try {
    const email = req.user.email;
    const { tmdb_id } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "No se encontró el perfil del usuario" });
    }

    const userId = user.id;

    // Eliminar de la base de datos
    const deletedFavorito = await Favorito.destroy({
      where: { user_id: userId, tmdb_id },
    });

    return res.status(201).json(deletedFavorito);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});
module.exports = router;
