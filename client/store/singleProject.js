import axios from "axios"

const GET_SINGLE_PROJECT = "GET_SINGLE_PROJECT"
const DELETE_SINGLE_TASK = "DELETE_SINGLE_TASK"
const EDIT_SINGLE_TASK = "EDIT_SINGLE_TASK"
const ADD_SINGLE_TASK = "ADD_SINGLE_TASK"

function getProject(project) {
  return {
    type: GET_SINGLE_PROJECT,
    project
  }
}

function getTask(task) {
  return {
    type: ADD_SINGLE_TASK,
    task
  }
}

function deleteTask(task) {
  return {
    type: DELETE_SINGLE_TASK,
    task
  }
}

function editTask(task) {
  return {
    type: EDIT_SINGLE_TASK,
    task
  }
}

export function fetchSingleProject(userId, projectId) {
  return async dispatch => {
    try {
      const { data } = await axios.get(
        `/api/users/${userId}/projects/${projectId}`
      )
      dispatch(getProject(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function addSingleTask(userId, projectId) {
  return async dispatch => {
    try {
      const { data } = await axios.post(
        `/api/users/${userId}/projects/${projectId}`
      )
      dispatch(getTask(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteSingleTask(userId, projectId) {
  return async dispatch => {
    try {
      const { data } = await axios.delete(
        `/api/users/${userId}/projects/${projectId}`
      )
      dispatch(deleteTask(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function editSingleTask(userId, projectId) {
  return async dispatch => {
    try {
      const payload = { boardName: newName }
      const { data } = await axios.put(
        `/api/users/${userId}/projects/${projectId}`
      )
      dispatch(editTask(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const defaultState = {}

export default function singleProjectReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_SINGLE_PROJECT:
      //is auth necessary for projects?
      return { ...action.project, ...action.auth }
    default:
      return state
  }
}
