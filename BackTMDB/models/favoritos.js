const { Model, DataTypes } = require("sequelize");
const db = require("../db/db");

class Favorito extends Model {}
Favorito.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tmdb_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "favorito",
  }
);

module.exports = Favorito;
