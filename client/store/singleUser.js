import axios from "axios"

const GET_ALL_USERS = "GET_ALL_USERS"
const GET_SINGLE_USER = "GET_SINGLE_USER"
// const CREATE_NEW_USER = "CREATE_NEW_USER"
const CREATE_NEW_USER = "CREATE_NEW_USER"
const EDIT_SINGLE_USER = "EDIT_SINGLE_USER"
const CREATE_NEW_PROJECT = "CREATE_NEW_PROJECT"
const DELETE_PROJECT = "DELETE_PROJECT"
const UPDATE_PROJECT = "UPDATE_PROJECT"
const ADD_USER_TO_PROJECT = "ADD_USER_TO_PROJECT"

function getAllUsers(users) {
  return {
    type: GET_ALL_USERS,
    users
  }
}

function getUser(user) {
  return {
    type: GET_SINGLE_USER,
    user
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
    user
  }
}

function newProject(project) {
  return {
    type: CREATE_NEW_PROJECT,
    project
  }
}

function deleteProj(project) {
  return {
    type: DELETE_PROJECT,
    project
  }
}

function updateProj(project) {
  return {
    type: UPDATE_PROJECT,
    project
  }
}

function addCollaborator(project) {
  return {
    type: ADD_USER_TO_PROJECT,
    project
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

export function fetchAllUsers() {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem("token")
      const { data } = await axios.get(`/api/users/`, {
        headers: { authorization: token }
      })
      dispatch(getAllUsers(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function fetchSingleUser(id) {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem("token")
      const { data } = await axios.get(`/api/users/${id}`, {
        headers: { authorization: token }
      })
      dispatch(getUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateSingleUser(user, id) {
  return async function(dispatch) {
    try {
      const token = window.localStorage.getItem("token")
      let response = await axios.put(`/api/users/${id}`, user, {
        headers: { authorization: token }
      })
      let newUser = response.data
      dispatch(editSingleUser(newUser))
    } catch (err) {
      console.log(err)
    }
  }
}
// This is a POST route bc we're creating a new row in the through table
export function addUserToProject(userId, projectId) {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem("token")
      let { data } = await axios.post(
        `/api/users/${userId}/projects/${projectId}`,
        {},
        {
          headers: { authorization: token }
        }
      )
      dispatch(addCollaborator(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function createProject(id) {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem("token")
      const { data } = await axios.post(
        `/api/users/${id}`,
        {},
        {
          headers: { authorization: token }
        }
      )
      dispatch(newProject(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteProject(userId, projectId) {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem("token")
      const { data } = await axios.delete(
        `/api/users/${userId}/projects/${projectId}`,
        {
          headers: { authorization: token }
        }
      )
      dispatch(deleteProj(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateProject(userId, projectId, newName) {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem("token")
      const payload = { boardName: newName }
      const { data } = await axios.put(
        `/api/users/${userId}/projects/${projectId}`,
        payload,
        {
          headers: { authorization: token }
        }
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
  let copiedProjects, projects_
  state.projects &&
    (copiedProjects = JSON.parse(JSON.stringify(state.projects)))
  let stateClone = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case GET_SINGLE_USER:
      console.log(state)
      stateClone.project = {}
      stateClone.user = { ...action.user }
      stateClone.auth = { ...action.auth }
      return {
        ...stateClone.user,
        ...stateClone.auth,
        project: { ...stateClone.project }
      }

    case EDIT_SINGLE_USER:
      return action.user

    case GET_ALL_USERS:
      const users = [...action.users]
      return { ...state, users }

    // Obsolete?
    // case CREATE_NEW_USER:
    //   copiedUser.push(action.user)
    //   console.log(state)
    //   return { ...state, users: copiedUser }

    case CREATE_NEW_PROJECT:
      copiedProjects.push(action.project)
      return { ...state, projects: copiedProjects }

    case DELETE_PROJECT:
      projects_ = copiedProjects.filter(x => x.id !== action.project.id)
      return { ...state, projects: projects_ }

    // obsolete?
    case UPDATE_PROJECT:
      return { ...state, ...action.project }

    case ADD_USER_TO_PROJECT:
      console.log(action)
      return { ...state, ...action.project }
    default:
      return state
  }
}
