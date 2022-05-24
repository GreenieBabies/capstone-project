import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateTaskThunk } from "../store/singleProject"

const EditTask = (props) => {
  const dispatch = useDispatch()
  const project = useSelector((state) => state.project)
  const [titleInput, setTitleInput] = useState("")
  const [notesInput, setNotesInput] = useState("")
  const [clicked, setClicked] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setClicked(true)
  }

  const handleTitleInputChange = (e) => {
    const titleInput = e.currentTarget.value
    setTitleInput(titleInput)
  }

  const handleNotesInputChange = (e) => {
    const newNotes = e.currentTarget.value
    setNotesInput(newNotes)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setClicked(false)
    const payload = {}
    titleInput && (payload.taskName = titleInput)
    notesInput && (payload.notes = notesInput)
    ;(titleInput || notesInput) &&
      dispatch(updateTaskThunk(project.id, props.id, payload))
  }

  return (
    <div>
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
        <label>Edit Title</label>
        <input
          type="text"
          className="taskTitle"
          onChange={handleTitleInputChange}
          value={titleInput}
        />
        <label>Edit Notes</label>
        <textarea
          type="text"
          className="taskNotes"
          rows="4"
          cols="24"
          onChange={handleNotesInputChange}
          value={notesInput}
        />
        <button className="submitTaskChanges" type="submit">
          Submit Changes
        </button>
      </form>
    </div>
  )
}

export default EditTask
