const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "country",
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
        set(value) {
          this.setDataValue("name", value.toUpperCase());
        },
      },
      capital: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      area: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // subregion: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      // },
      // area: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
      // population: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
    },
    { timestamps: false }
  );
};
