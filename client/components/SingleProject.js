import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchSingleProject,
  addSingleList,
  deleteSingleList,
  editSingleTask
} from "../store/singleProject"
// import { useToast } from '@chakra-ui/react'

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
    console.log(props)
    const { id } = props.match.params
    dispatch(fetchSingleProject(id))
  }, [tasks])

  const handleAddList = e => {
    e.preventDefault()
    const { id } = props.match.params
    dispatch(addSingleList(id))
    setTasks([...tasks, {}])
  }

  const handleDeleteList = (e, listId) => {
    e.preventDefault()
    const { projectId } = props.match.params
    dispatch(deleteSingleList(projectId, listId))
  }
  // Add buttons for adding/deleting columns and task
  //
  return (
    <div className="container">
      {isAdmin || user.id === auth.id ? (
        <div>
          <h1>{project.boardName}</h1>
          <div className="allLists">
            <div className="createTask" onClick={handleAddList}>
              +
            </div>
            {project.lists &&
              project.lists.map(x => {
                return (
                  <div key={x.id} className="listBox">
                    <h2>{x.columnName}</h2>
                    <ul>
                      {x.tasks &&
                        x.tasks.map(task => {
                          return (
                            <div key={task.id}>
                              <h3>{task.taskName}</h3>
                              <p>{task.notes}</p>
                            </div>
                          )
                        })}
                    </ul>
                    <div
                      className="deleteList"
                      onClick={e => handleDeleteList(e, x.id)}
                    >
                      X
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      ) : (
        <p>Unauthorized</p>
      )}
    </div>
  )
}

export default SingleProject
