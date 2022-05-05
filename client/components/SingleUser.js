import React from "react"
import { connect } from "react-redux"
import { fetchSingleUser } from "../store/singleUser"

class SingleUser extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getUser(id)
    // console.log(this.props)
  }

  render() {
    const { user } = this.props
    return <div>hello {user.username}</div>
  }
}

function mapState(state) {
  return {
    user: state.user,
    auth: state.auth,
  }
}

function mapDispatch(dispatch) {
  return {
    getUser: (id) => dispatch(fetchSingleUser(id)),
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
