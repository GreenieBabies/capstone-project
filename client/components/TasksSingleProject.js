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
  const tasks = props.state
  console.log(tasks)
  const id = props.id

  const handleDeleteTask = (e, listId, taskId) => {
    e.preventDefault()
    const { id: projectId } = id
    dispatch(deleteSingleTask(projectId, listId, taskId))
  }

  return (
    <ul>
      {tasks &&
        tasks.map((task) => (
          <div className="taskBox" key={task.id}>
            <h3>{task.taskName}</h3>
            <p>{task.notes}</p>
            <div
              className="deleteTask"
              onClick={(e) => handleDeleteTask(e, task.listId, task.id)}
            >
              X
            </div>
          </div>
        ))}
    </ul>
  )
}

export default TasksSingleProject
