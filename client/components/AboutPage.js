import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const AboutPage = () => {
  const team = [
    {
      firstName: "Jeff",
      lastName: "Lupton",
      imageUrl: "https://images.app.goo.gl/CrvpSDFHgj92V8Xf9",
      id: 1,
      aboutMe: "",
      linkedin: "https://www.linkedin.com/in/jeffrey-lupton/",
      gitHub: "https://github.com/Jlups76",
    },
    {
      firstName: "Ethan",
      lastName: "S",
      imageUrl: "https://images.app.goo.gl/CrvpSDFHgj92V8Xf9",
      id: 2,
      aboutMe: "",
      linkedin: "https://www.linkedin.com/in/ethanschindel/",
      gitHub: "https://github.com/Erschindel",
    },
    {
      firstName: "Michael",
      lastName: "Mnatsakanian",
      imageUrl: "https://images.app.goo.gl/CrvpSDFHgj92V8Xf9",
      id: 3,
      aboutMe: "",
      linkedin: "https://www.linkedin.com/in/michaelmnat/",
      gitHub: "https://github.com/MichaelMnatsakanian",
    },
    {
      firstName: "Tony",
      lastName: "Li",
      imageUrl: "https://images.app.goo.gl/CrvpSDFHgj92V8Xf9",
      id: 4,
      aboutMe: "",
      linkedin: "https://www.linkedin.com/in/tony-x-li/",
      gitHub: "https://github.com/tonyxli21",
    },
  ]

  return (
    <div>
      <h2>Overview</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco l aboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <h3>Tools</h3>
      <ul>
        <li>React</li>
        <li>React Hooks</li>
        <li>d3</li>
        <li>NextJS</li>
        <li>TensorFlow</li>
        <li>GraphQL</li>
        <li>socket.io</li>
      </ul>
      <h3>APIs</h3>
      <ul>
        <li>Twitter API</li>
        <li>HTML Drag and Drop API</li>
      </ul>
      <h2>Meet the Team!</h2>
      {team.map((member) => (
        <div className="member" key={member.id}>
          <img src={member.imageUrl} className="photo" />
          <h2>
            <Link
              className="listingInfo"
              to={{
                pathname: `/team/${member.id}/`,
                state: member,
              }}
            >
              {member.firstName} {member.lastName}
            </Link>
          </h2>
        </div>
      ))}
    </div>
  )
}

export default AboutPage
