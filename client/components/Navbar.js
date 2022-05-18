import React from "react"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { logout } from "../store"
import { Tabs, Tab, TabList } from "@chakra-ui/react"

const Navbar = ({ handleClick, isLoggedIn, id }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Link to="/home">
                <Tab>Home</Tab>
              </Link>

              <Link to="/about">
                <Tab>About</Tab>
              </Link>

              <Link to={`/users/${id}`}>
                <Tab>Project Boards</Tab>
              </Link>

              <Link to={`/users/edit/${id}`}>
                <Tab>Settings</Tab>
              </Link>

              <a href="#" onClick={handleClick}>
                <Tab>Logout</Tab>
              </a>
            </TabList>
          </Tabs>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Link to="/home">
                <Tab>Home</Tab>
              </Link>

              <NavLink
                to="/login"
                style={isActive => ({
                  color: isActive ? "green" : "blue"
                })}
              >
                <Tab>Login</Tab>
              </NavLink>

              <Link to="/signup">
                <Tab>Sign Up</Tab>
              </Link>

              <Link to="/about">
                <Tab>About</Tab>
              </Link>
            </TabList>
          </Tabs>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    id: state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
