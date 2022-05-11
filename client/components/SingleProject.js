import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchSingleProject,
  addSingleTask,
  deleteSingleTask,
  editSingleTask,
} from "../store/singleProject"
// import { Grid, makeStyles, Button } from "@material-ui/core"

const SingleProject = (props) => {
  const dispatch = useDispatch()
  const project = useSelector((state) => state.project)
  const auth = useSelector((state) => state.auth)
  const { isAdmin } = auth
  console.log(project)

  //have it when someone clicks on a project on the single user page, the projectId is returned
  useEffect(() => {
    const { userId, projectId } = props.match.params
    console.log(props)
    dispatch(fetchSingleProject(userId, projectId))
  }, [])

  const handleAddTask = (e, itemId) => {
    e.preventDefault()
    dispatch(addSingleTask(itemId))
  }

  // const handleDeleteTask = (event, itemId) => {
  //   dispatch(deleteSingleTask(itemId))
  // }

  // const handleSubmit = (event, projectId, newName) => {
  //   event.preventDefault()
  //   const { userId } = props.match.params
  //   dispatch(editSingleTask(userId, projectId, newName))
  //   setProjects([...projects, {}])
  // }

  return (
    // <Grid>
    //   <Button>
    //     onClick={() => dispatch(remove)}
    //   </Button>
    // </Grid>
    <div className="container">
      {isAdmin || user.id === auth.id ? (
        <div>
          <p>Welcome jbjlk!</p>
          <h1>Lists</h1>
          <ul className="container">
            <div className="createSingleTask" onClick={handleAddTask}>
              +
            </div>
            {project &&
              // Stopped
              //
              user.projects.map((x, i) => {
                return (
                  <div key={i} className="allTasksBox">
                    <h2>{x.boardName}</h2>
                  </div>
                )
              })}
          </ul>
        </div>
      ) : (
        <p>Unauthorized</p>
      )}
    </div>
  )
}

export default SingleProject
