import React from "react";
import { connect } from "react-redux";
import { fetchSingleUser } from "../store";

class SingleUser extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUser(id);
  }

  render() {
    return <div>hello {this.props.user.username}</div>;
  }
}

function mapState(state) {}

function mapDispatch(dispatch) {
  return {
    getUser: (id) => dispatch(fetchSingleUser(id)),
  };
}

export default connect(mapState, mapDispatch)(SingleUser);
