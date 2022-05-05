import React from "react"
import { connect } from "react-redux"
import { fetchSingleUser } from "../store/singleUser"

class SingleUser extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.getUser(Number(id))
  }

  render() {
    return <div>hello {this.props.user.name}</div>
  }
}

function mapState(state) {}

function mapDispatch(dispatch) {
  return {
    getUser: (id) => dispatch(fetchSingleUser(id)),
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
