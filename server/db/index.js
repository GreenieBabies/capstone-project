//this is the access point for all things database related!

const db = require("./db")

const User = require("./models/User")
const List = require("./models/List")
const Project = require("./models/Project")
const Task = require("./models/Task")

User.belongsToMany(Project, { through: "UserProjects" })
Project.belongsToMany(User, { through: "UserProjects" })

Project.hasMany(List)
List.belongsTo(Project)

List.hasMany(Task)
Task.belongsTo(List)

module.exports = {
  db,
  models: {
    User,
    List,
    Project,
    Task,
  },
}
