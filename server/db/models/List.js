const Sequelize = require("sequelize")
const db = require("../db")

const List = db.define("list", {
  columnName: {
    type: Sequelize.STRING,
  },
})

module.exports = List
