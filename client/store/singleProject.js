import axios from "axios"

const GET_SINGLE_PROJECT = "GET_SINGLE_PROJECT"

function getProject(project) {
  return {
    type: GET_SINGLE_PROJECT,
    project,
  }
}

export function fetchSingleProject(userId, projectId) {
  return async (dispatch) => {
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
