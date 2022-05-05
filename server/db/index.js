//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const List = require("./models/List");
const Project = require("./models/Project");
const Task = require("./models/Task");

User.belongsToMany(List, { through: Project });
List.belongsToMany(User, { through: Project });
List.hasMany(Task);
Task.belongsTo(List);

module.exports = {
  db,
  models: {
    User,
    List,
    Project,
    Task,
  },
};
