import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import InlineInput from "./InlineInput"
import {
  fetchSingleProject,
  editSingleTask,
  addSingleTask,
  deleteSingleTask,
} from "../store/singleProject"
// import { useToast } from '@chakra-ui/react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const TasksSingleProject = (props) => {
  const dispatch = useDispatch()
  const taskItem = props.state
  const id = props.id
  const handleAddTask = (e, listId) => {
    e.preventDefault()
    const { id: projectId } = id
    dispatch(addSingleTask(projectId, listId))
    setTasks([...tasks, {}])
  }

  const handleDeleteTask = (e, listId, taskId) => {
    e.preventDefault()
    const { id: projectId } = id
    dispatch(deleteSingleTask(projectId, listId, taskId))
  }

  return (
    <div className="taskBox" key={taskItem.id}>
      <h3>{taskItem.taskName}</h3>
      <p>{taskItem.notes}</p>
      <div
        className="deleteTask"
        onClick={(e) => handleDeleteTask(e, taskItem.listId, taskItem.id)}
      >
        X
      </div>
    </div>
  )
}

export default TasksSingleProject
