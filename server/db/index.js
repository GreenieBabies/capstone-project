//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Column = require("./models/Column");
const Project = require("./models/Project");
const Task = require("./models/Task");

User.belongsToMany(Column, { through: Project });
Column.belongsToMany(User, { through: Project });
Column.hasMany(Task);
Task.belongsTo(Column);

module.exports = {
  db,
  models: {
    User,
    Column,
    Project,
    Task,
  },
};
