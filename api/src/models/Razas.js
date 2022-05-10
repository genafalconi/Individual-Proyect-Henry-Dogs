const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('raza', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    height_min: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    height_max: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight_min: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight_max: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING
    },
    lifeSpan: {
      type: DataTypes.STRING
    }
  });
};
