import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllUsers, addUserToProject } from "../store/singleUser"
import { fetchSingleProject, updateTaskThunk } from "../store/singleProject"

const EditTask = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const project = useSelector(state => state.project)
  const [allUsers, setAllUsers] = useState([])
  const [userInput, setUserInput] = useState("")
  const [clicked, setClicked] = useState(false)
  const [enterPress, setEnterPress] = useState(false)

  const handleClick = e => {
    e.preventDefault()
    setClicked(true)
  }

  const handleInputChange = e => {
    const userInput = e.currentTarget.value

    setUserInput(userInput)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const changedTask = e.target.value
    // console.log(props.id)
    // console.log()

    setEnterPress(false)

    changedTask &&
      dispatch(updateTaskThunk(project.id, props.id, { taskName: changedTask }))
  }

  useEffect(() => {
    setAllUsers(user.users)
    dispatch(fetchSingleProject(project.id))
  }, [user])

  return (
    <div>
      <button
        className={`editTaskButton${clicked ? " hidden" : ""}`}
        onClick={handleClick}
      >
        Edit Task
      </button>
      <form
        className={`collabForm${clicked ? " activeForm" : " hidden"}`}
        onSubmit={handleSubmit}
      >
        <label>Edit Task Title</label>
        <input
          type="text"
          className="taskTitle"
          onChange={handleInputChange}
          value={userInput}
        />
        <button className="submitTaskChanges" type="submit">
          Submit Changes
        </button>
      </form>
    </div>
  )
}

export default EditTask
