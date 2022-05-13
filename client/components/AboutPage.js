import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Heading, Box, Image } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"
import { Button } from "@chakra-ui/button"
// import { Text } from "@chakra-ui/react"

const AboutPage = () => {
  const team = [
    {
      firstName: "Jeff",
      lastName: "Lupton",
      imageUrl: "https://images.app.goo.gl/CrvpSDFHgj92V8Xf9",
      id: 1,
      aboutMe: "",
      linkedin: "https://www.linkedin.com/in/jeffrey-lupton/",
      gitHub: "https://github.com/Jlups76"
    },
    {
      firstName: "Ethan",
      lastName: "S",
      imageUrl: "https://images.app.goo.gl/CrvpSDFHgj92V8Xf9",
      id: 2,
      aboutMe: "",
      linkedin: "https://www.linkedin.com/in/ethanschindel/",
      gitHub: "https://github.com/Erschindel"
    },
    {
      firstName: "Michael",
      lastName: "Mnatsakanian",
      imageUrl: "https://images.app.goo.gl/CrvpSDFHgj92V8Xf9",
      id: 3,
      aboutMe: "",
      linkedin: "https://www.linkedin.com/in/michaelmnat/",
      gitHub: "https://github.com/MichaelMnatsakanian"
    },
    {
      firstName: "Tony",
      lastName: "Li",
      imageUrl: "https://images.app.goo.gl/CrvpSDFHgj92V8Xf9",
      id: 4,
      aboutMe: "",
      linkedin: "https://www.linkedin.com/in/tony-x-li/",
      gitHub: "https://github.com/tonyxli21"
    }
  ]

  return (
    <div>
      <Heading>
        <h2>Overview</h2>
      </Heading>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco l aboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <Heading>
        <h2>Meet the Team!</h2>
      </Heading>
      <SimpleGrid columns={2} spacing={10}>
        {team.map(member => (
          <Box bg="lightblue" boxSize="100px" borderRadius="md">
            <div className="member" key={member.id}>
              <Image src={member.imageUrl} className="photo" />
              <h2>
                <Link
                  className="listingInfo"
                  to={{
                    pathname: `/team/${member.id}/`,
                    state: member
                  }}
                >
                  <Button>
                    {member.firstName} {member.lastName}
                  </Button>
                </Link>
              </h2>
            </div>
          </Box>
        ))}
      </SimpleGrid>
      <Heading>
        <h3>Tools</h3>
      </Heading>
      <SimpleGrid columns={2} spacing={10}>
        {/* <ul> */}

        <Box
          bg="lightblue"
          height="30px"
          width="50px"
          fontWeight="semibold"
          borderRadius="md"
        >
          <div>React</div>
        </Box>
        <Box
          bg="lightblue"
          height="30px"
          width="100px"
          fontWeight="semibold"
          borderRadius="md"
        >
          <div>React Hooks</div>
        </Box>
        <Box
          bg="lightblue"
          height="30px"
          width="50px"
          fontWeight="semibold"
          borderRadius="md"
        >
          <div>d3</div>
        </Box>
        <Box
          bg="lightblue"
          height="30px"
          width="70px"
          fontWeight="semibold"
          borderRadius="md"
        >
          <div>NextJS</div>
        </Box>
        <Box
          bg="lightblue"
          height="30px"
          width="100px"
          fontWeight="semibold"
          borderRadius="md"
        >
          <div>TensorFlow</div>
        </Box>
        <Box
          bg="lightblue"
          height="30px"
          width="70px"
          fontWeight="semibold"
          borderRadius="md"
        >
          <div>GraphQL</div>
        </Box>
        <Box
          bg="lightblue"
          height="30px"
          width="70px"
          fontWeight="semibold"
          borderRadius="md"
        >
          <div>socket.io</div>
        </Box>

        {/* </ul> */}
      </SimpleGrid>
      <Heading>
        <h3>APIs</h3>
      </Heading>
      <ul>
        <li>Twitter API</li>
        <li>HTML Drag and Drop API</li>
      </ul>
    </div>
  )
}

export default AboutPage
