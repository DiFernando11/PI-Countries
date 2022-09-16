const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
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
    },
    {
      timestamps: false,
    }
  );
};
