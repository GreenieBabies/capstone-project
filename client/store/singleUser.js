import axios from "axios"

const GET_SINGLE_USER = "GET_SINGLE_USER"
// const CREATE_NEW_USER = "CREATE_NEW_USER"
const CREATE_NEW_USER = "CREATE_NEW_USER"
const EDIT_SINGLE_USER = "EDIT_SINGLE_USER"
const CREATE_NEW_PROJECT = "CREATE_NEW_PROJECT"
const DELETE_PROJECT = "DELETE_PROJECT"
const UPDATE_PROJECT = "UPDATE_PROJECT"

export function getUser(user) {
  return {
    type: GET_SINGLE_USER,
    user,
  }
}

// function createNewUser(user) {
//   return {
//     type: CREATE_NEW_USER,
//     user,
//   }
// }

function editSingleUser(user) {
  return {
    type: EDIT_SINGLE_USER,
    user,
  }
}

function newProject(project) {
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
      const token = window.localStorage.getItem("token")
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: { authorization: token },
      })
      dispatch(getUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//this needs to be reworked so it takes in a form and edits the form
export function updateSingleUser(user, id) {
  return async function (dispatch) {
    try {
      const token = window.localStorage.getItem("token")
      let response = await axios.put(`/api/users/${id}`, user, {
        headers: { authorization: token },
      })
      let newUser = response.data
      dispatch(editSingleUser(newUser))
    } catch (err) {
      console.log(err)
    }
  }
}

export function createProject(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/users/${id}`)
      dispatch(newProject(data))
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
    case CREATE_NEW_USER:
      state.users.push(action.user)
      return { ...state }
    case EDIT_SINGLE_USER:
      return action.user
    case CREATE_NEW_PROJECT:
      state.projects.push(action.project)
      return { ...state }
    case DELETE_PROJECT:
      projects_ = copiedProjects.filter((x) => x.id !== action.project.id)
      return { ...state, projects: projects_ }
    case UPDATE_PROJECT:
      return { ...state, ...action.project }
    default:
      return state
  }
}
