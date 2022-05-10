import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchSingleProject } from "../store/singleProject"

const SingleProject = (props) => {
  const dispatch = useDispatch()
  const project = useSelector((state) => state.project)
  const auth = useSelector((state) => state.auth)
  const { isAdmin } = auth
  console.log(project)

  //have it when someone clicks on a project on the single user page, the projectId is returned
  useEffect(() => {
    const { userId } = props.match.params
    dispatch(fetchSingleProject(userId, projectId))
  }, [])

  return (
    <div className="container">
      {isAdmin || user.id === auth.id ? (
        <div>
          <p>Welcome {project.boardName}!</p>
          <h1>Lists</h1>
          <ul className="container">
            {project.columnName &&
              //Stopped
              user.projects.map((x, i) => {
                return (
                  <div key={i} className="allProjectsBox">
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
