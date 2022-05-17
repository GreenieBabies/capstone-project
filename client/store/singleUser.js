import axios from "axios"

const GET_SINGLE_USER = "GET_SINGLE_USER"
// const CREATE_NEW_USER = "CREATE_NEW_USER"
const CREATE_NEW_PROJECT = "CREATE_NEW_PROJECT"
const DELETE_PROJECT = "DELETE_PROJECT"
const UPDATE_PROJECT = "UPDATE_PROJECT"

function getUser(user) {
  return {
    type: GET_SINGLE_USER,
    user
  }
}

// function createNewUser(project) {
//   return {
//     type: CREATE_NEW_PROJECT,
//     project,
//   }
// }

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

// Obsolete?
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
  return async dispatch => {
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

export function createProject(id) {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem("token")
      const { data } = await axios.post(
        `/api/users/${id}`,
        {}, // post body; empty to initialize
        {
          headers: { authorization: token },
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
          headers: { authorization: token },
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
        { headers: { authorization: token } }
      )
      dispatch(updateProj(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const defaultState = {}

export default function singleUserReducer(state = defaultState, action) {
  let copiedProjects = []
  state.projects &&
    (copiedProjects = JSON.parse(JSON.stringify(state.projects)))
  let projects_

  switch (action.type) {
    case GET_SINGLE_USER: // projects are inside of action.user
      return { ...action.user, ...action.auth }

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

    case UPDATE_PROJECT:
      return { ...state, ...action.project }
    default:
      return state
  }
}
