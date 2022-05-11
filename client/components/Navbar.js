import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../store"

const Navbar = ({ handleClick, isLoggedIn, id }) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to={`/users/${id}`}>Project Boards</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/about">About</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    id: state.auth.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)
