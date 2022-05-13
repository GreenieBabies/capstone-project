// OBSOLETE

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateProject } from "../store/singleUser"

const EditProjectName = (props) => {
  const dispatch = useDispatch()
  const [projectName, setProjectName] = useState("")

  useEffect(() => {}, [projectName])

  const handleSubmit = (e, projectId, newName) => {
    e.preventDefault()
    const { userId } = props.x.UserProjects
    dispatch(updateProject(userId, projectId, newName))
    setProjectName([projectName])
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, props.x.id, projectName)}>
        <input
          type="text"
          placeholder={props.x.boardName}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <button type="submit">Change</button>
      </form>
    </div>
  )
}

export default EditProjectName
