import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchSingleUser,
  createProject,
  deleteProject,
  updateProject,
} from "../store/singleUser"

const SingleUser = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  const [projects, setProjects] = useState([])
  const [projectName, setProjectName] = useState("")
  const { isAdmin } = auth
  console.log(user)

  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchSingleUser(id))
  }, [projects, projectName])

  const handleAddProject = (e) => {
    e.preventDefault()
    const { id } = props.match.params
    dispatch(createProject(id))
    setProjects([...projects, {}])
  }

  const handleDeleteProject = (e, itemId) => {
    e.preventDefault()
    const { userId } = props.match.params
    dispatch(deleteProject(userId, itemId))
    setProjects([...projects, {}])
  }

  const handleSubmit = (e, projectId, newName) => {
    e.preventDefault()
    const { userId } = props.match.params
    dispatch(updateProject(userId, projectId, newName))
    setProjects([...projects, {}])
  }

  return (
    <div className="container">
      {isAdmin || user.id === auth.id ? (
        <div>
          <p>Welcome {user.username}!</p>
          <h1>Projects</h1>
          <ul className="container">
            <div className="createNewProject" onClick={handleAddProject}>
              +
            </div>
            {user.projects &&
              user.projects.map((x, i) => {
                return (
                  <div key={i} className="allProjectsBox">
                    <form
                      action=""
                      onSubmit={(e) => handleSubmit(e, x.id, projectName)}
                    >
                      <input
                        type="text"
                        placeholder={x.boardName}
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                      <button type="submit">Change</button>
                    </form>
                    <button
                      className="deleteProject"
                      onClick={(e) => handleDeleteProject(e, x.id)}
                    >
                      x
                    </button>
                  </div>
                )
              })}
          </ul>
          {/* {Object.keys(projects).map((x, i) => {
            return (
              <div key={i} className="allProjectsBox">
                <h2>{x}</h2>
                <hr className="container" />
                <ul className="container">
                  {projects[x].map((y) => {
                    return (
                      <li key={y.id}>
                        <hr />
                        <h3>{y.columnName}</h3>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })} */}
        </div>
      ) : (
        <p>Unauthorized</p>
      )}
    </div>
  )
}

export default SingleUser
