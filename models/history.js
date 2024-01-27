"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const History = sequelize.define("History", {
    query: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return History;
};
