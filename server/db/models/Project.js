const Sequelize = require("sequelize");
const db = require("../db");

const Project = db.define("project", {
  boardName: {
    defaultValue: "-- Add Project Name --",
    type: Sequelize.STRING,
    unique: true,
  },
});

module.exports = Project;
