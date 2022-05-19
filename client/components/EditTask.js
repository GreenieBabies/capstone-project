import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllUsers, addUserToProject } from "../store/singleUser"
import { fetchSingleProject, updateTaskThunk } from "../store/singleProject"

const EditTask = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const project = useSelector((state) => state.project)
  const newLists = useSelector((state) => state.project.lists)
  const state = useSelector((state) => state)

  const [lists, setLists] = useState({})
  const [tasks, setTasks] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [userInput, setUserInput] = useState("")
  const [clicked, setClicked] = useState(false)
  const [enterPress, setEnterPress] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setClicked(true)
  }

  const handleInputChange = (e) => {
    const userInput = e.currentTarget.value
    setUserInput(userInput)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setClicked(false)
    // console.log(userInput)
    userInput &&
      dispatch(updateTaskThunk(project.id, props.id, { taskName: userInput }))
    console.log(project)
    // setTasks()
  }

  useEffect(() => {
    setAllUsers(user.users)
    // dispatch(fetchSingleProject(project.id))
    setLists(project.lists)
    console.log(project.lists)
  }, [])

  return (
    <div>
      {/* {console.log(newLists)} */}

      <p className="taskTitle">{props.taskName}</p>
      <p className="taskNotes">{props.notes}</p>
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
