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
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    altura: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    peso: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    anios: {
        type: DataTypes.INTEGER
    },
  });
};
