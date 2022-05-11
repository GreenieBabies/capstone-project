const Sequelize = require("sequelize")
const db = require("../db")

const List = db.define("list", {
  columnName: {
    defaultValue: "-- Add List Name --",
    type: Sequelize.STRING,
  },
})

module.exports = List
