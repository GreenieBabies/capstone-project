const Sequelize = require("sequelize")
const db = require("../db")

const Project = db.define("project", {
  boardName: {
    defaultValue: "-- Add Project Name --",
    type: Sequelize.STRING,
  },
  index: {
    type: Sequelize.INTEGER,
  },
})

module.exports = Project
