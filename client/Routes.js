import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { withRouter, Route, Switch, Redirect } from "react-router-dom"
import { Login } from "./components/AuthForm"
import Home from "./components/Home"
import SingleUser from "./components/SingleUser"
import AboutPage from "./components/AboutPage"
import SingleFounder from "./components/SingleFounder"
import SingleProject from "./components/SingleProject"
import Signup from "./components/SignupPage"
import { fetchSingleUser } from "./store/singleUser"
import EditUserInfo from "./components/EditUserInfo"
import { me } from "./store"

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            {/* {this.props.getUser(this.props.id)} */}
            <Route path="/home" component={Home} />
            <Route exact path="/users/:id" component={SingleUser} />
            <Route path="/users/edit/:id" component={EditUserInfo} />
            <Route path="/projects/:id" component={SingleProject} />
            <Route path="/about" component={AboutPage} />
            <Route path="/team/:memberId/" component={SingleFounder} />
            <Redirect to={`/users/${this.props.id}`} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/about" component={AboutPage} />
            <Route path="/team/:memberId/" component={SingleFounder} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    id: state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    getUser(id) {
      dispatch(fetchSingleUser(id))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
