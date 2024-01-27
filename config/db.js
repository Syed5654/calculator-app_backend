const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USENAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const User = require("../models/User")(sequelize);
const History = require("../models/History")(sequelize);

User.hasMany(History, { foreignKey: "userId" });
History.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  sequelize,
  User,
  History,
};
