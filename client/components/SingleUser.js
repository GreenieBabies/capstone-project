import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {
  fetchSingleUser,
  createProject,
  deleteProject,
} from "../store/singleUser"

const SingleUser = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  const [projects, setProjects] = useState([])
  const { isAdmin } = auth

  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchSingleUser(id))
  }, [projects])

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

  return (
    <div className="container">
      {isAdmin || user.id === auth.id ? (
        <div>
          {user.username ? (
            <div>
              <p>Home page of {user.username}</p>
              <ul className="container">
                <h2>Projects</h2>
                <div className="createNewProject" onClick={handleAddProject}>
                  +
                </div>
                {user.projects &&
                  user.projects
                    .sort((a, b) => a.id - b.id)
                    .map((x) => {
                      return (
                        <Link
                          className="allProjectsBox"
                          key={x.id}
                          to={`/projects/${x.id}`}
                        >
                          <h2>{x.boardName}</h2>
                          <button
                            className="deleteProject"
                            onClick={(e) => handleDeleteProject(e, x.id)}
                          >
                            x
                          </button>
                        </Link>
                      )
                    })}
              </ul>
            </div>
          ) : (
            <p>No user.</p>
          )}
        </div>
      ) : (
        <p>Unauthorized</p>
      )}
    </div>
  )
}

export default SingleUser
