const router = require("express").Router()
const {
  models: { User, Project },
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

router.post("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const newProject = await Project.create(req.body)
    await newProject.addUser(user)
    res.send(newProject)
  } catch (error) {
    next(error)
  }
})

router.delete("/:userId/projects/:projectId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId)
    await project.destroy()
    res.send(project)
  } catch (error) {
    next(error)
  }
})

router.put("/:userId/projects/:projectId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId)
    await project.update(req.body)
    res.send(project)
  } catch (error) {
    next(error)
  }
})
