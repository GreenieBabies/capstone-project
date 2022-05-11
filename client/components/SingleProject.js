import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchSingleProject,
  addSingleTask,
  deleteSingleTask,
  editSingleTask
} from "../store/singleProject"
// import { Grid, makeStyles, Button } from "@material-ui/core"

const SingleProject = props => {
  const dispatch = useDispatch()
  const project = useSelector(state => state.project)
  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth)
  const [tasks, setTasks] = useState([])
  const { isAdmin } = auth
  // console.log(project)

  //have it when someone clicks on a project on the single user page, the projectId is returned
  useEffect(() => {
    const { userId, projectId } = props.match.params
    dispatch(fetchSingleProject(userId, projectId))
  }, [tasks])

  const handleAddTask = e => {
    e.preventDefault()
    dispatch(addSingleTask())
    setTasks([...tasks, {}])
  }

  const handleDeleteTask = (event, itemId) => {
    dispatch(deleteSingleTask(itemId))
  }
  // Add buttons for adding/deleting columns and task
  //
  return (
    <div className="container">
      {console.log(project)}
      {isAdmin || user.id === auth.id ? (
        <div>
          <h1>{project.boardName}</h1>
          <div className="createTask" onClick={handleAddTask}>
            +
          </div>
          {project.lists &&
            project.lists.map(x => {
              return (
                <div key={x.id} className="listBox">
                  <h2>{x.columnName}</h2>
                  <ul>
                    {x.tasks.map(task => {
                      return (
                        <div key={task.id}>
                          <h3>{task.taskName}</h3>
                          <p>{task.notes}</p>
                        </div>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
        </div>
      ) : (
        <p>Unauthorized</p>
      )}
    </div>
  )
}

export default SingleProject
