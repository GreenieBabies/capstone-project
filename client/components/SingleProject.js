import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import InlineInput from "./InlineInput"
import {
  fetchSingleProject,
  addSingleList,
  deleteSingleList,
  editSingleTask,
  addSingleTask,
  deleteSingleTask
} from "../store/singleProject"
// import { useToast } from '@chakra-ui/react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import TasksSingleProject from "./TasksSingleProject"

const SingleProject = props => {
  const dispatch = useDispatch()
  const project = useSelector(state => state.project)
  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth)
  const [tasks, setTasks] = useState([])
  // const [tasks, setTasks] = useState([])
  const { isAdmin } = auth
  const [storedHeading, setStoredHeading] = project.boardName
    ? useState(project.boardName)
    : useState("")
  const [lists, updateLists] = useState(project.lists)
  // const [storedText, setStoredText] = useState("Here's some more, edit away!")
  // console.log(project)

  //have it when someone clicks on a project on the single user page, the projectId is returned
  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchSingleProject(id))
  }, [])

  useEffect(() => {
    updateLists(project.lists)
  }, [project])

  const handleAddList = e => {
    e.preventDefault()
    const { id } = props.match.params
    dispatch(addSingleList(id))
    setTasks([...tasks, {}])
  }
  const handleOnDragEnd = result => {
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

  return (
    <div className="container">
      {isAdmin || user.id === auth.id ? (
        <div>
          {project.boardName &&
            storedHeading !== project.boardName &&
            setStoredHeading(project.boardName)}
          <InlineInput
            text={
              project.boardName
                ? project.boardName
                : storedHeading
                ? storedHeading
                : ""
              // storedHeading
              //   ? storedHeading === project.boardName
              //     ? storedHeading
              //     : project.boardName
              //   : project.boardName
              //   ? project.boardName
              //   : ""
            }
            projectId={id}
            onSetText={text => setStoredHeading(text)}
          />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="lists" direction="horizontal">
              {provided => (
                <div
                  className="allLists"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div className="createTask" onClick={handleAddList}>
                    +
                  </div>
                  {lists &&
                    lists.map((x, index) => {
                      return (
                        <Draggable
                          key={x.id}
                          draggableId={x.id.toString()}
                          index={index}
                        >
                          {provided => (
                            <div
                              className="listBox"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <h3>{x.columnName}</h3>
                              <div
                                className="createTask"
                                onClick={e => handleAddTask(e, x.id)}
                              >
                                +
                              </div>
                              <TasksSingleProject
                                state={x.tasks}
                                id={props.match.params}
                              />
                              <div
                                className="deleteList"
                                onClick={e => handleDeleteList(e, x.id)}
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
