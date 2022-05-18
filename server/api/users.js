const router = require("express").Router()
const {
  models: { User, Project, List, Task },
} = require("../db")
module.exports = router

// GET single user and all associated boards
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ["id", "username", "email", "address", "isAdmin"],
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

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields
      attributes: ["id", "username"],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// CREATE a project and associate it to a user
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

// UPDATE a user
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.update(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// DELETE a project
router.delete("/:userId/projects/:projectId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId)
    await project.destroy()
    res.send(project)
  } catch (error) {
    next(error)
  }
})

// UPDATE a project
router.put("/:userId/projects/:projectId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId)
    await project.update(req.body)
    res.send(project)
  } catch (error) {
    next(error)
  }
})

// CREATE a new row in the through table (add another user to a project)
router.post("/:userId/projects/:projectId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const newProject = await Project.findByPk(req.params.projectId)
    await newProject.addUser(user)
    res.send(newProject)
  } catch (error) {
    next(error)
  }
})
