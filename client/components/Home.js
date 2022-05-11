import React from "react"
import { connect, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import AuthForm from "./AuthForm"

export const Home = (props) => {
  let auth = useSelector((store) => store.auth)
  const { username } = auth

  return (
    <div id="homePage">
      <div id="header">
        {/* <h3>Welcome, {username ? username : ""}</h3> */}
        <h1>Welcome to Trello + Voice!</h1>
        <p>
          The most interactive and effective project management app out there!
        </p>
      </div>

      <div id="signUp">
        {/* <h4>
          Your favorite project management app just got better - Welcome to Trello
          + Voice!... Add more info and key features about product{" "}
        </h4> */}
        <Link to="/signup">
          <button type="button">Sign up for Trello+Voice for free!</button>
        </Link>
      </div>
      <div id="projectDescription">
        <h3>
          It's more than just a drag-and-drop to-do list. Trello+Voice will read
          out your current projects, lists, and tasks so you can manage your
          projects, hands-free!
        </h3>

        <ul>
          <lh>Voice Commands Include:</lh>
          <li>List Projects</li>
          <li>List Columns</li>
          <li>List Tasks</li>
          <li>How Many Active Tasks Remaining?</li>
          <li>Speech-To-Text Note Taking</li>
        </ul>
        {/*this is where we include sample pics of our app*/}
        {/* Link to sign in? <AuthForm /> */}
        <br />
        <br />
        <h4>Sample Images</h4>
      </div>
      <div class="exampleImages">
        <img
          src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png"
          alt="Project with list and task example"
          width="400"
          height="300"
        />
        <img
          src="https://resources.dfuob.com/wp-content/uploads/2019/06/trello-boards-1280x960.jpg"
          alt="Project with list and task example 2"
          width="400"
          height="300"
        />
        <br />
        <br />
      </div>
      <div class="aboutTeam">
        <Link to="/about">
          <button type="button">
            Click Here to Learn More About Our Awesome Team!
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
