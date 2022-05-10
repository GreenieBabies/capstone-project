import axios from "axios"

const GET_SINGLE_USER = "GET_SINGLE_USER"
const CREATE_NEW_PROJECT = "CREATE_NEW_PROJECT"
const DELETE_PROJECT = "DELETE_PROJECT"
const UPDATE_PROJECT = "UPDATE_PROJECT"

function getUser(user) {
  return {
    type: GET_SINGLE_USER,
    user,
  }
}


function getProject(project) {
  return {
    type: CREATE_NEW_PROJECT,
    project,
  }
}

function deleteProj(project) {
  return {
    type: DELETE_PROJECT,
    project,
  }
}

function updateProj(project) {
  return {
    type: UPDATE_PROJECT,
    project,
  }
}

export function createUserThunk(form) {
  return async () => {
    try {
      await axios.post(`auth/signup`, form)
    } catch (error) {
      console.log(error)
    }
  }
}

export function fetchSingleUser(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}`)
      dispatch(getUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function createProject(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${id}`)
      dispatch(getProject(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteProject(userId, projectId) {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/users/${userId}/projects/${projectId}`
      )
      dispatch(deleteProj(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateProject(userId, projectId, newName) {
  return async (dispatch) => {
    try {
      const payload = { boardName: newName }
      const { data } = await axios.put(
        `/api/users/${userId}/projects/${projectId}`,
        payload
      )
      dispatch(updateProj(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const defaultState = {
  // user: "hihi",
}

export default function singleUserReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return { ...action.user, ...action.auth }
    case CREATE_NEW_PROJECT:
      return { ...state, ...action.project }
    case DELETE_PROJECT:
      return { ...state }
    case UPDATE_PROJECT:
      return { ...state, ...action.project }
    default:
      return state
  }
}
