import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
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
              <Tab>
                <Link to="/home">Home</Link>
              </Tab>
              <Tab>
                <Link to="/about">About</Link>
              </Tab>
              <Tab>
                <Link to={`/users/${id}`}>Project Boards</Link>
              </Tab>
              <Tab>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </Tab>
            </TabList>
          </Tabs>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Tab>
                <Link to="/home">Home</Link>
              </Tab>
              <Tab>
                <Link to="/login">Login</Link>
              </Tab>
              <Tab>
                <Link to="/signup">Sign Up</Link>
              </Tab>
              <Tab>
                <Link to="/about">About</Link>
              </Tab>
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
