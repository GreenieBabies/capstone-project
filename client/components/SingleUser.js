import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchSingleUser } from "../store/singleUser"

const SingleUser = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  const { isAdmin } = auth
  console.log(user)

  // const projects = {}
  // user.lists &&
  //   user.lists.map((x) => {
  //     !Object.keys(projects).includes(x.project.boardName)
  //       ? (projects[x.project.boardName] = [x])
  //       : projects[x.project.boardName].push(x)
  //   })

  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchSingleUser(id))
  }, [])

  return (
    <div className="container">
      {isAdmin || user.id === auth.id ? (
        <div>
          <p>Welcome {user.username}!</p>
          <h1>Projects</h1>
          <ul className="container">
            {user.projects &&
              user.projects.map((x, i) => {
                return (
                  <div key={i} className="allProjectsBox">
                    <h2>{x.boardName}</h2>
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
