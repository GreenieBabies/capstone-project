const Sequelize = require("sequelize")
const db = require("../db")

const Task = db.define("task", {
  taskName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  notes: { type: Sequelize.TEXT },
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  requiresApproval: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  index: {
    type: Sequelize.INTEGER
  }
})

module.exports = Task
