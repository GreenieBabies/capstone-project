import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchSingleUser } from "../store/singleUser"

const SingleUser = props => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const { id } = props.match.params
    dispatch(fetchSingleUser(id))
  }, [])

  return <div>hello {user.username}</div>
}

export default SingleUser
