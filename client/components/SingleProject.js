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
  // const [lists, updateLists] = useState(project.lists)
  const [state, setState] = useState(project.lists)
  // const [storedText, setStoredText] = useState("Here's some more, edit away!")
  // console.log(project)

  //have it when someone clicks on a project on the single user page, the projectId is returned
  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchSingleProject(id))
  }, [tasks, storedHeading])

  useEffect(() => {})

  const handleAddList = (e) => {
    e.preventDefault()
    const { id } = props.match.params
    dispatch(addSingleList(id))
    setTasks([...tasks, {}])
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

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source.tasks)
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
    ...draggableStyle,
  })
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
  })
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
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
      setState(newState)
    } else {
      const result = move(state[sInd], state[dInd], source, destination)
      const newState = [...state]

      newState[sInd] = result[sInd]
      newState[dInd] = result[dInd]
      console.log(newState, "new State")
      let copy = JSON.parse(JSON.stringify(state))
      copy.forEach((list, index) => {
        if (Array.isArray(newState[index])) list.tasks = newState[index]
      })
      setState(copy)
    }
  }
  console.log(state, "State after update")
  return (
    <div style={{ display: "flex" }}>
      <div className="container">
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
            <div className="allLists">
              <div className="createTask" onClick={handleAddList}>
                +
              </div>
              <DragDropContext onDragEnd={onDragEnd}>
                {state &&
                  state.map((x, index) => {
                    console.log(x, "list")
                    return (
                      <Droppable key={index} droppableId={`${index}`}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
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
                                      )}
                                    </Draggable>
                                  )
                                })}
                            </ul>
                            <div
                              className="deleteList"
                              onClick={(e) => handleDeleteList(e, x.id)}
                            >
                              X
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
        ) : (
          <p>Unauthorized</p>
        )}
      </div>
    </div>
  )
}

export default SingleProject
