import axios from "axios"

const GET_SINGLE_PROJECT = "GET_SINGLE_PROJECT"
const ADD_SINGLE_LIST = "ADD_SINGLE_LIST"
const DELETE_SINGLE_LIST = "DELETE_SINGLE_LIST"
const UPDATE_SINGLE_LIST = "UPDATE_SINGLE_LIST"
const UPDATE_PROJECT = "UPDATE_PROJECT"

const DELETE_SINGLE_TASK = "DELETE_SINGLE_TASK"
const ADD_SINGLE_TASK = "ADD_SINGLE_TASK"
const UPDATE_SINGLE_TASK = "UPDATE_SINGLE_TASK"

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

function updateProj(project) {
  return {
    type: UPDATE_PROJECT,
    project,
  }
}

function updateTask(task) {
  return {
    type: UPDATE_SINGLE_TASK,
    task,
  }
}

function deleteTask(task) {
  return {
    type: DELETE_SINGLE_TASK,
    task,
  }
}

function addTask(task) {
  return {
    type: ADD_SINGLE_TASK,
    task,
  }
}

function updateList(list) {
  return {
    type: UPDATE_SINGLE_LIST,
    list,
  }
}

export function fetchSingleProject(projectId) {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token")
      const { data } = await axios.get(`/api/projects/${projectId}`, {
        headers: { authorization: token },
      })
      dispatch(getProject(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function addSingleList(id) {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token")
      const { data } = await axios.post(
        `/api/projects/${id}`,
        {},
        {
          headers: { authorization: token },
        }
      )
      dispatch(addList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteSingleList(projectId, listId) {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token")
      const { data } = await axios.delete(
        `/api/projects/${projectId}/lists/${listId}`,
        {
          headers: { authorization: token },
        }
      )
      dispatch(deleteList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// export function editSingleTask(userId, projectId) {
//   return async (dispatch) => {
//     try {
//       const payload = { boardName: newName }
//       const { data } = await axios.put(
//         `/api/users/${userId}/projects/${projectId}`
//       )
//       dispatch(editTask(data))
//     } catch (error) {
//       next(error)
//     }
//   }
// }

export function updateProject(projectId, newName) {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token")
      const payload = { boardName: newName }
      const { data } = await axios.put(`/api/projects/${projectId}`, payload, {
        headers: { authorization: token },
      })
      dispatch(updateProj(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function addSingleTask(projectId, listId) {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token")
      const payload = {
        taskName: "--Add Task Name--",
        notes: "--Add Task Notes--",
        imageUrl: "",
      }
      const { data } = await axios.post(
        `/api/projects/${projectId}/lists/${listId}`,
        payload,
        { headers: { authorization: token } }
      )
      dispatch(addTask(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteSingleTask(projectId, listId, taskId) {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token")
      const { data } = await axios.delete(
        `/api/projects/${projectId}/lists/${listId}/tasks/${taskId}`,
        { headers: { authorization: token } }
      )
      dispatch(deleteTask(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateListThunk(userId, listId, list) {
  return async (dispatch) => {
    console.log(userId, "userID")
    console.log(listId, "listId")
    console.log(list, "list4API")
    try {
      const token = window.localStorage.getItem("token")
      const { data: newList } = await axios.put(
        `/api/projects/${userId}/lists/${listId}`,
        list,
        { headers: { authorization: token } }
      )
      dispatch(updateList(newList))
    } catch (error) {
      console.log(error)
    }
  }
}

export function updateTaskThunk(projectId, taskId, task) {
  return async (dispatch) => {
    console.log(task, "task for update")
    try {
      const token = window.localStorage.getItem("token")
      const { data: updatedtask } = await axios.put(
        `/api/projects/${projectId}/tasks/${taskId}`,
        task,
        { headers: { authorization: token } }
      )
      console.log(updatedtask, "new Task")
      dispatch(updateTask(updatedtask))
    } catch (error) {
      console.log(error)
    }
  }
}

const defaultState = {}

export default function singleProjectReducer(state = defaultState, action) {
  let copiedList = []
  state.lists && (copiedList = JSON.parse(JSON.stringify(state.lists)))
  let list_, allLists

  switch (action.type) {
    case GET_SINGLE_PROJECT:
      console.log(action)
      return { ...action.project, ...action.auth }

    case ADD_SINGLE_LIST:
      copiedList.push(action.list)
      return { ...state, lists: copiedList }

    case DELETE_SINGLE_LIST:
      allLists = copiedList.filter((x) => x.id !== action.list.id)
      return { ...state, lists: allLists }

    case ADD_SINGLE_TASK:
      list_ = copiedList.filter((x) => x.id === action.task.listId)[0]
      !list_.tasks && (list_.tasks = [])
      list_.tasks.push(action.task)
      allLists = copiedList.map((x) => (x.id === list_.id ? list_ : x))
      return { ...state, lists: allLists }

    case DELETE_SINGLE_TASK:
      list_ = copiedList
        .filter((x) => x.id === action.task.listId)[0]
        .tasks.filter((x) => x.id !== action.task.id)
      allLists = copiedList.map((x) => {
        if (x.id === action.task.listId) {
          x.tasks = list_
        }
        return x
      })
      return { ...state, lists: allLists }

    case UPDATE_PROJECT:
      return { ...state, ...action.project }

    case UPDATE_SINGLE_TASK:
      return { ...state, ...action.task }

    case UPDATE_SINGLE_LIST:
      return { ...state, ...action.list }

    default:
      return state
  }
}
