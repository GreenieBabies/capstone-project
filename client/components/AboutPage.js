import React, { useEffect, useState } from "react"
import { Link as RouteLink } from "react-router-dom"
import {
  Heading,
  Box,
  Image,
  Container,
  SimpleGrid,
  LinkBox,
  LinkOverlay,
  Circle
} from "@chakra-ui/react"
import { Button } from "@chakra-ui/button"
// import { Text } from "@chakra-ui/react"

const AboutPage = () => {
  const team = [
    {
      firstName: "Jeff",
      lastName: "Lupton",
      imageUrl:
        "https://media-exp1.licdn.com/dms/image/C4E03AQHmFNXfqEBsYw/profile-displayphoto-shrink_800_800/0/1651769568993?e=1658361600&v=beta&t=_liN2Ttu4Fm7xiUAmh7r4Ju5rvb400MSfFA4DhfKAcA",
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
        <p>Overview</p>
      </Heading>
      <Container>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco l aboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Container>
      <br />
      <Heading>
        <p>Meet the Team!</p>
      </Heading>
      <br />
      <SimpleGrid columns={2} spacing={10}>
        {/* {team.map(member => ( */}
        {/* <Circle key={member.id} bg="lightblue" width="150px" height="150px"> */}

        {/* <div className="member" key={member.id}> */}
        {/* <div className="member"> */}
        <LinkBox>
          <LinkOverlay
            href="https://www.linkedin.com/in/jeffrey-lupton/"
            target="_blank"
          >
            <Circle width="200px" height="200px">
              <Image
                src="https://media-exp1.licdn.com/dms/image/C4E03AQHmFNXfqEBsYw/profile-displayphoto-shrink_800_800/0/1651769568993?e=1658361600&v=beta&t=_liN2Ttu4Fm7xiUAmh7r4Ju5rvb400MSfFA4DhfKAcA"
                className="photo"
                borderRadius="full"
              />
            </Circle>
          </LinkOverlay>
        </LinkBox>
        {/* <Wrap>
                <WrapItem>
                  <Avatar
                    name="member"
                    src="https://media-exp1.licdn.com/dms/image/C4E03AQHmFNXfqEBsYw/profile-displayphoto-shrink_800_800/0/1651769568993?e=1658361600&v=beta&t=_liN2Ttu4Fm7xiUAmh7r4Ju5rvb400MSfFA4DhfKAcA"
                  />
                </WrapItem>
              </Wrap> */}
        {/* </div> */}
        {/* <Heading> */}
        {/* <RouteLink
              className="listingInfo"
              to={{
                pathname: `/team/${member.id}/`,
                state: member
              }}
            ></RouteLink>
          </Heading> */}

        {/* </Button>  */}

        {/* )} */}
        <LinkBox>
          <LinkOverlay
            href="https://www.linkedin.com/in/michaelmnat/"
            target="_blank"
          >
            <Circle width="200px" height="200px">
              <Image
                src="https://media-exp1.licdn.com/dms/image/C5603AQE8NmF-wTlEEA/profile-displayphoto-shrink_800_800/0/1652826749289?e=1658361600&v=beta&t=VvJcMSYGLixxmGjRUNiaw8XuESCVNHD9koWuJa4Tqb0"
                className="photo"
                borderRadius="full"
              />
            </Circle>
          </LinkOverlay>
        </LinkBox>
        <LinkBox>
          <LinkOverlay
            href="https://www.linkedin.com/in/ethanschindel/"
            target="_blank"
          >
            <Circle width="200px" height="200px">
              <Image
                src="https://media-exp1.licdn.com/dms/image/D4E35AQG0hj5PF9yXqA/profile-framedphoto-shrink_800_800/0/1647104780261?e=1653465600&v=beta&t=T2QbIlGNiK-GwsHUQ3uAdmh09O1Rxk1MIEO01Elj5bM"
                className="photo"
                borderRadius="full"
              />
            </Circle>
          </LinkOverlay>
        </LinkBox>
        <LinkBox>
          <LinkOverlay
            href="https://www.linkedin.com/in/tony-x-li/"
            target="_blank"
          >
            <Circle width="200px" height="200px">
              <Image
                src="https://media-exp1.licdn.com/dms/image/C4E03AQG2GI-_OqFYCw/profile-displayphoto-shrink_800_800/0/1636849048317?e=1658361600&v=beta&t=A8rPf5iMnOceh3yDJQUdD60N5Q39ckcWSdJ5-l7lny8"
                className="photo"
                borderRadius="full"
              />
            </Circle>
          </LinkOverlay>
        </LinkBox>
      </SimpleGrid>
      <br />
      <Heading>
        <p>Tools</p>
      </Heading>
      <SimpleGrid columns={2} spacing={2}>
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
      <br />
      <Heading>
        <p>APIs</p>
      </Heading>
      <ul>
        <li>Twitter API</li>
        <li>HTML Drag and Drop API</li>
      </ul>
    </div>
  )
}

export default AboutPage
