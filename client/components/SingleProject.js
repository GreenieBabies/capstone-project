import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import InlineInput from "./InlineInput"
import {
  fetchSingleProject,
  addSingleList,
  deleteSingleList,
  editSingleTask,
  addSingleTask,
  deleteSingleTask,
} from "../store/singleProject"
// import { useToast } from '@chakra-ui/react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const SingleProject = (props) => {
  const dispatch = useDispatch()
  const project = useSelector((state) => state.project)
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  const [tasks, setTasks] = useState([])
  const { isAdmin } = auth
  const [storedHeading, setStoredHeading] = project.boardName
    ? useState(project.boardName)
    : useState("")
  const [lists, updateLists] = useState(project.lists)

  //have it when someone clicks on a project on the single user page, the projectId is returned
  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchSingleProject(id))
  }, [tasks, storedHeading, lists])

  const handleAddList = (e) => {
    e.preventDefault()
    const { id } = props.match.params
    dispatch(addSingleList(id))
    setTasks([...tasks, {}])
  }
  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    let items = Array.from(lists)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    updateLists(items)
  }

  const handleDeleteList = (e, listId) => {
    e.preventDefault()
    const { id: projectId } = props.match.params
    dispatch(deleteSingleList(projectId, listId))
  }

  const { id } = props.match.params

  const handleAddTask = (e, listId) => {
    e.preventDefault()
    const { id: projectId } = props.match.params
    dispatch(addSingleTask(projectId, listId))
    setTasks([...tasks, {}])
  }

  const handleDeleteTask = (e, listId, taskId) => {
    e.preventDefault()
    const { id: projectId } = props.match.params
    dispatch(deleteSingleTask(projectId, listId, taskId))
  }

  return (
    <div className="container">
      {console.log(project)}
      {isAdmin || user.id === auth.id ? (
        <div>
          <InlineInput
            text={
              storedHeading
                ? storedHeading
                : project.boardName // here?
                ? project.boardName
                : ""
            }
            projectId={id}
            onSetText={(text) => setStoredHeading(text)}
          />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="lists" direction="horizontal">
              {(provided) => (
                <div
                  className="allLists"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="createTask" onClick={handleAddList}>
                    +
                  </div>
                  {/* {project.lists &&
                  project.lists.map((x) => {
                    return (
                      <div key={x.id} className="listBox">
                        <h2>{x.columnName}</h2>
                        <div
                          className="createTask"
                          onClick={(e) => handleAddTask(e, x.id)}
                        >
                          +
                        </div>
                        <ul>
                          {x.tasks &&
                            x.tasks.map((task) => {
                              return (
                                <div className="taskBox" key={task.id}>
                                  <h3>{task.taskName}</h3>
                                  <p>{task.notes}</p>
                                  <div
                                    className="deleteTask"
                                    onClick={(e) =>
                                      handleDeleteTask(e, task.listId, task.id)
                                    }
                                  >
                                    X
                                  </div>
                                </div>
                              )
                            })}
                        </ul>
                        <div
                          className="deleteList"
                          onClick={(e) => handleDeleteList(e, x.id)}
                        >
                          X
                        </div>
                      </div> */}
                  {lists &&
                    lists.map((x, index) => {
                      return (
                        <Draggable
                          key={x.id}
                          draggableId={x.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="listBox"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <h3>{x.columnName}</h3>
                              <div
                                className="createTask"
                                onClick={(e) => handleAddTask(e, x.id)}
                              >
                                +
                              </div>
                              <ul>
                                {x.tasks &&
                                  x.tasks.map((task) => {
                                    return (
                                      <div className="taskBox" key={task.id}>
                                        <h3>{task.taskName}</h3>
                                        <p>{task.notes}</p>
                                        <div
                                          className="deleteTask"
                                          onClick={(e) =>
                                            handleDeleteTask(
                                              e,
                                              task.listId,
                                              task.id
                                            )
                                          }
                                        >
                                          X
                                        </div>
                                      </div>
                                    )
                                  })}
                              </ul>
                              <div
                                className="deleteList"
                                onClick={(e) => handleDeleteList(e, x.id)}
                              >
                                X
                              </div>
                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      ) : (
        <p>Unauthorized</p>
      )}
    </div>
  )
}

export default SingleProject
