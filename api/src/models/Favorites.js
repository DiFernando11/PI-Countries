const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "favorites",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficult: {
        type: DataTypes.INTEGER,
        validate: {
          len: [1, 5],
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      season: {
        type: DataTypes.ENUM(
          "Verano",
          "Otoño",
          "Invierno",
          "Primavera",
          "All year round"
        ),
        defaultValue: "All year round",
      },
      typeActivity: {
        type: DataTypes.ENUM(
          "Deportiva",
          "Cultural",
          "Gastronomica",
          "Sol y Playa",
          "Naturaleza",
          "Otros"
        ),
        defaultValue: "Otros",
      },
      isFavorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
