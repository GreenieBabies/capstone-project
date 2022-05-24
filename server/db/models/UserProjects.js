const Sequelize = require("sequelize")
const db = require("../db")

const UserProjects = db.define("userProjects", {})

module.exports = UserProjects
