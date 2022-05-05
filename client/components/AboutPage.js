import React, { useEffect, useState } from "react";

const team = [
  {
    firstName: "Jeff",
    lastName: "Lupton",
    imageUrl: "",
    id: 1,
  },
  { firstName: "Ethan", lastName: "S", imageUrl: "", id: 2 },
  { firstName: "Michael", lastName: "Mnatsakanian", imageUrl: "", id: 3 },
  { firstName: "Tony", lastName: "Li", imageUrl: "", id: 4 },
];

const AboutPage = () => {
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
            <Link className="listingInfo" to={`/team/${member.id}/`}>
              {member.firstName} {member.lastName}
            </Link>
          </h2>
        </div>
      ))}
    </div>
  );
};
