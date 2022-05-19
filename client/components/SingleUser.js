import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {
  fetchSingleUser,
  createProject,
  deleteProject
} from "../store/singleUser"
import { useToast, CloseButton } from "@chakra-ui/react"
import { Button } from "@chakra-ui/button"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const SingleUser = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth)
  // let project = useSelector((state) => state.project)
  // const proj = useSelector((state) => state.proj)
  const [projects, setProjects] = useState([])
  const [Projects, updateProjects] = useState([])

  const { isAdmin } = auth

  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchSingleUser(id))
    // project = {}
  }, [])

  useEffect(() => {
    updateProjects(user.projects)
  }, [user])

  const handleAddProject = e => {
    e.preventDefault()
    const { id } = props.match.params
    // try {
    dispatch(createProject(id))
    addToast()
    // } catch (error) {
    //   console.log(error)
    // }
    setProjects([...projects, {}])
  }

  const handleDeleteProject = (e, itemId) => {
    e.preventDefault()
    const { userId } = props.match.params
    dispatch(deleteProject(userId, itemId))
    setProjects([...projects, {}])
  }
  const handleOnDragEnd = result => {
    if (!result.destination) return
    let items = Array.from(Projects)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    updateProjects(items)
    // send items to PUT route
    // update index value
    // sort below
  }

  const toast = useToast()
  const toastIdRef = React.useRef()

  function addToast() {
    toastIdRef.current = toast({
      description: "Project successfully added!",
      status: "success"
    })
  }

  return (
    <div className="container">
      {/* {console.log("1", project)} */}

      {/* {isAdmin || user.id === auth.id ? ( */}
      <div>
        {user.username ? (
          <div>
            <p>Home page of {user.username}</p>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="projects">
                {provided => (
                  <ul
                    className="container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2>Projects</h2>
                    <Button onClick={handleAddProject} type="button">
                      <div className="createNewProject">+</div>
                    </Button>
                    {Projects &&
                      //need to sort by number other than id
                      //.sort((a, b) => a.index - b.index)
                      Projects.map((x, index) => {
                        return (
                          <Draggable
                            key={x.id}
                            draggableId={x.id.toString()}
                            index={index}
                          >
                            {provided => (
                              <Link
                                className="allProjectsBox"
                                to={`/projects/${x.id}`}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <h3>{x.boardName}</h3>
                                <CloseButton
                                  className="deleteProject"
                                  onClick={e => handleDeleteProject(e, x.id)}
                                />
                              </Link>
                            )}
                          </Draggable>
                        )
                      })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        ) : (
          <p>No user.</p>
        )}
      </div>
      {/* ) : (
        <p>Unauthorized</p>
      )} */}
    </div>
  )
}

export default SingleUser
