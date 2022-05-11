const router = require("express").Router()
const User = require("../db/models/User")
module.exports = router

// router.use(async (req, res, next) => {
//   try {
//     // extract token, get user
//     // can attach user to request
//     console.log(req.headers)
//     // req.headers.authorization is currently undefined
//     const token = req.headers.authorization
//     const user = await User.findByToken(token)
//     req.user = user
//     next()
//   } catch (error) {
//     next(error)
//   }
// })
router.use("/users", require("./users"))
router.use("/projects", require("./projects"))

router.use((req, res, next) => {
  const error = new Error("Not Found")
  error.status = 404
  next(error)
})
