import axios from "axios"

const GET_SINGLE_PROJECT = "GET_SINGLE_PROJECT"
const ADD_SINGLE_LIST = "ADD_SINGLE_LIST"
const DELETE_SINGLE_LIST = "DELETE_SINGLE_LIST"

const DELETE_SINGLE_TASK = "DELETE_SINGLE_TASK"
const EDIT_SINGLE_TASK = "EDIT_SINGLE_TASK"
const ADD_SINGLE_TASK = "ADD_SINGLE_TASK"

function getProject(project) {
  return {
    type: GET_SINGLE_PROJECT,
    project,
  }
}

function addList(list) {
  return {
    type: ADD_SINGLE_LIST,
    list,
  }
}

function deleteList(list) {
  return {
    type: DELETE_SINGLE_LIST,
    list,
  }
}

function editTask(task) {
  return {
    type: EDIT_SINGLE_TASK,
    task,
  }
}

export function fetchSingleProject(projectId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/projects/${projectId}`)
      // console.log(data)
      dispatch(getProject(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function addSingleList(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/projects/${id}`)
      dispatch(addList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteSingleList(projectId, listId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/projects/${projectId}/lists/${listId}`
      )
      dispatch(deleteList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function editSingleTask(userId, projectId) {
  return async (dispatch) => {
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
      //is auth necessary for projects? YES
      return { ...action.project, ...action.auth }
    case ADD_SINGLE_LIST:
      state.lists.push(action.list)
      return { ...state }
    case DELETE_SINGLE_LIST:
      state.lists = state.lists.filter((x) => {
        return x.id !== action.list.id && x
      })
      return { ...state }
    default:
      return state
  }
}
