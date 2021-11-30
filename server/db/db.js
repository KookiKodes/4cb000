const Sequelize = require("sequelize");
require("dotenv").config();

const dbURL = () => {
  const isDev = process.env.NODE_ENV === "dev";
  return isDev ? process.env.DATABASE_URL_DEV : process.env.DATABASE_URL;
};

const db = new Sequelize(dbURL() || "postgres://localhost:5432/messenger", {
  logging: false,
});

module.exports = db;
