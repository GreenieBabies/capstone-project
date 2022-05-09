const router = require("express").Router()
const {
  models: { User, Project, List, Task },
} = require("../db")
module.exports = router

// GET single user and all associated boards
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      // attributes?
      include: {
        model: Project,
      },
    })

    res.send(user)
  } catch (error) {
    next(error)
  }
})

router.get("/:userId/projects/:projectId", async (req, res, next) => {
  try {
    const project = await Project.findOne({
      attributes: ["id", "boardName"],
      where: {
        id: req.params.projectId,
      },
      include: {
        model: List,
        // through: {
        //   attributes: ["id", "columnName", "projectId"],
        // },
        include: {
          model: Task,
        },
      },
    })
    res.send(project)
  } catch (error) {}
})

// GET all users. Useful later for admin accounts
// NEED AUTH CHECK FOR SECURITY
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
