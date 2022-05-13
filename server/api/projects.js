const router = require("express").Router()
const {
  models: { User, Project, List, Task },
} = require("../db")
module.exports = router

router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findOne({
      attributes: ["id", "boardName"],
      where: {
        id: req.params.id,
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
  } catch (error) {
    next(error)
  }
})

router.post("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id)
    const newList = await List.create(req.body)
    await newList.setProject(project)
    res.send(newList)
  } catch (error) {
    next(error)
  }
})

router.post("/:projectId/lists/:listId", async (req, res, next) => {
  try {
    const list = await List.findByPk(req.params.listId)
    const newTask = await Task.create(req.body)
    await newTask.setList(list)
    res.send(newTask)
  } catch (error) {
    next(error)
  }
})

router.delete("/:projectId/lists/:listId", async (req, res, next) => {
  try {
    const list = await List.findByPk(req.params.listId)
    await list.destroy()
    res.send(list)
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    // console.log(req.params)
    // console.log("hello")
    const project = await Project.findByPk(req.params.id)
    await project.update(req.body)
    res.send(project)
  } catch (error) {
    next(error)
  }
})

router.delete(
  "/:projectId/lists/:listId/tasks/:taskId",
  async (req, res, next) => {
    try {
      const task = await Task.findByPk(req.params.taskId)
      await task.destroy()
      res.send(task)
    } catch (error) {
      next(error)
    }
  }
)

//add post, delete, and put for tasks, get tasks is already complete

router.put("/:userId/projects/:projectId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.projectId)
    await project.update(req.body)
    res.send(project)
  } catch (error) {
    next(error)
  }
})

router.put("/:userId/lists/:listId", async (req, res, next) => {
  try {
    const list = await List.findByPk(req.params.listId)
    await list.update(req.body)
    res.send(list)
  } catch (error) {
    next(error)
  }
})

router.put("/:userId/tasks/:taskId", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.taskId)
    await task.update(req.body)
    res.send(task)
  } catch (error) {
    next(error)
  }
})
