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

// could be /projects/:id
// now we have req.user! don't need userId
// KEEP ABOVE COMMENT FOR NOW

// GET all users. Useful later for admin accounts
// NEED AUTH CHECK FOR SECURITY
// is this implemented with auth middleware?
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

router.put("/edit/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.update(req.body)
    res.json(user)
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

router.post("/:userId/projects/:projectId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    const newProject = await Project.create(req.body)
    await newProject.addUser(user)
    res.send(newProject)
  } catch (error) {
    next(error)
  }
})
