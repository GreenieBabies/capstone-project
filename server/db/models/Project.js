const Sequelize = require("sequelize");
const db = require("../db");

const Project = db.define("project", {
  boardName: {
    type: Sequelize.STRING,
    unique: true,
  },
});
