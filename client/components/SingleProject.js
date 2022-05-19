import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import InlineInput from "./InlineInput"
import AddCollaborators from "./AddCollaborators"
import EditTask from "./EditTask"
import {
  fetchSingleProject,
  addSingleList,
  deleteSingleList,
  editSingleTask,
  addSingleTask,
  deleteSingleTask,
  updateTaskThunk
} from "../store/singleProject"
import { fetchAllUsers } from "../store/singleUser"
// import { useToast } from '@chakra-ui/react'

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const SingleProject = props => {
  const dispatch = useDispatch()
  const project = useSelector(state => state.project)
  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth)
  const { isAdmin } = auth
  const [tasks, setTasks] = useState([])
  const [storedHeading, setStoredHeading] = project.boardName
    ? useState(project.boardName)
    : useState("")
  const [state, setState] = useState(project.lists)
  const [listTitle, setListTitle] = useState("")

  const { id: projectId } = props.match.params
  //have it when someone clicks on a project on the single user page, the projectId is returned

  // useEffect(() => {
  //   console.log("a")
  //   const { id } = props.match.params
  //   dispatch(fetchSingleProject(id))
  // }, [])

  // FROM JEFF
  useEffect(() => {
    console.log("b")

    const { id } = props.match.params
    dispatch(fetchSingleProject(id))
  }, [tasks, storedHeading])

  useEffect(() => {
    console.log("c")
    setState(project.lists)
  }, [user, tasks])

  useEffect(() => {})

  const handleAddList = e => {
    e.preventDefault()
    dispatch(addSingleList(projectId))
    setTasks([...tasks, {}])
  }

  const handleDeleteList = (e, listId) => {
    e.preventDefault()
    dispatch(deleteSingleList(projectId, listId))
  }

  const handleAddTask = (e, listId) => {
    e.preventDefault()
    dispatch(addSingleTask(projectId, listId))
    setTasks([...tasks, {}])
  }

  const handleDeleteTask = (e, listId, taskId) => {
    e.preventDefault()
    dispatch(deleteSingleTask(projectId, listId, taskId))
  }

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source.tasks)
    console.log("here")
    console.log("source", source)
    console.log("destination", destination)
    // console.log("here")

    const destClone = Array.from(destination.tasks)
    const [removed] = sourceClone.splice(droppableSource.index, 1)
    destClone.splice(droppableDestination.index, 0, removed)
    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
  }
  const grid = 8

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  })
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
  })
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list.tasks)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  function onDragEnd(result) {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }
    const sInd = +source.droppableId
    const dInd = +destination.droppableId

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index)
      const newState = [...state]
      newState[sInd] = items
      let copy = JSON.parse(JSON.stringify(state))
      copy.forEach((list, index) => {
        if (Array.isArray(newState[index])) list.tasks = newState[index]
        list.tasks.forEach((updateTask, index) => {
          updateTask.index = index
          dispatch(updateTaskThunk(user.id, updateTask.id, updateTask))
        })
      })
      setState(copy)
    } else {
      const result = move(state[sInd], state[dInd], source, destination)
      const newState = [...state]

      newState[sInd] = result[sInd]
      newState[dInd] = result[dInd]

      let copy = JSON.parse(JSON.stringify(state))
      copy.forEach((list, index) => {
        if (Array.isArray(newState[index])) list.tasks = newState[index]
        list.tasks.forEach((updateTask, index) => {
          updateTask.listId = list.id
          updateTask.index = index
          dispatch(updateTaskThunk(user.id, updateTask.id, updateTask))
        })
      })
      setState(copy)
    }
  }
  // console.log(state, "State after update")
  return (
    <div style={{ display: "flex" }}>
      <div className="container">
        {/* {isAdmin || user.id === auth.id ? ( */}
        <div>
          <InlineInput
            text={
              storedHeading
                ? storedHeading
                : project.boardName
                ? project.boardName
                : ""
            }
            projectId={projectId}
            isProject={true}
            onSetText={text => setStoredHeading(text)}
          />
          <AddCollaborators />
          <div className="allLists">
            <div className="createTask" onClick={handleAddList}>
              +
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              {state &&
                state.map((x, index) => {
                  // console.log(x, "list")
                  return (
                    <Droppable key={index} droppableId={`${index}`}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                        >
                          <InlineInput
                            text={
                              x.columnName
                                ? x.columnName
                                : listTitle
                                ? listTitle
                                : ""
                            }
                            projectId={x.id}
                            isProject={false}
                            onSetText={text => setListTitle(text)}
                          />
                          <div
                            className="createTask"
                            onClick={e => handleAddTask(e, x.id)}
                          >
                            +
                          </div>
                          <ul>
                            {x.tasks &&
                              x.tasks.map((task, index) => {
                                return (
                                  <Draggable
                                    key={task.id}
                                    draggableId={`${task.id}`}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                        )}
                                      >
                                        <p className="taskTitle">
                                          {task.taskName}
                                        </p>
                                        <p className="taskNotes">
                                          {task.notes}
                                        </p>
                                        <EditTask id={task.id} />
                                        <div
                                          className="deleteTask"
                                          onClick={e =>
                                            handleDeleteTask(
                                              e,
                                              task.listId,
                                              task.id
                                            )
                                          }
                                        >
                                          X - Delete Task
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                )
                              })}
                          </ul>
                          <div
                            className="deleteList"
                            onClick={e => handleDeleteList(e, x.id)}
                          >
                            X - Delete List
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  )
                })}
            </DragDropContext>
          </div>
        </div>
      </div>
      {/* ) : (
          <p>Unauthorized</p>
        )} */}
    </div>
  )
}

export default SingleProject
