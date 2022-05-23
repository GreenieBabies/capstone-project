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
  Circle,
  Center
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
        TrelloPlus is an interactive project management platform that allows for
        a visually pleasant experience for planning and smooth collaboration
        between users. This app includes a drag and drop functionality and
        speech-to-text feature to add projects. Happy planning!
      </Container>
      <br />
      <Heading>
        <p>Meet the Team!</p>
      </Heading>
      <br />
      <SimpleGrid columns={2} spacing={30}>
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
          <Container>
            <Heading as="h5" size="lg">
              Jeff Lupton
            </Heading>
          </Container>
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
          <Container>
            <Heading as="h5" size="lg">
              Michael Mnatsakanian
            </Heading>
          </Container>
        </LinkBox>
        <LinkBox>
          <LinkOverlay
            href="https://www.linkedin.com/in/ethanschindel/"
            target="_blank"
          >
            <Circle width="200px" height="200px">
              <Image
                src="https://ca.slack-edge.com/T024FPYBQ-U035FK30A72-2e5eaa9ef118-512"
                className="photo"
                borderRadius="full"
              />
            </Circle>
          </LinkOverlay>
          <Container>
            <Heading as="h5" size="lg">
              Ethan Schindel
            </Heading>
          </Container>
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
          <Container>
            <Heading as="h5" size="lg">
              Tony Li
            </Heading>
          </Container>
        </LinkBox>
      </SimpleGrid>
      <br />
      <br />
      <br />
      <Heading>
        <p>Tools</p>
      </Heading>
      <br />
      <SimpleGrid columns={3} spacing={10} justify="center">
        {/* <ul> */}

        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>React</div>
          </Center>
        </Box>
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>Node.js</div>
          </Center>
        </Box>
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>React Hooks</div>
          </Center>
        </Box>
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>Express</div>
          </Center>
        </Box>

        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>PostgreSQL</div>
          </Center>
        </Box>
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>Sequelize</div>
          </Center>
        </Box>
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>Redux</div>
          </Center>
        </Box>
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>Chakra UI</div>
          </Center>
        </Box>
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>Google Speech-to-Text</div>
          </Center>
        </Box>
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>Toastify</div>
          </Center>
        </Box>
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>Buffer</div>
          </Center>
        </Box>
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>DOMPurify</div>
          </Center>
        </Box>

        {/* </ul> */}
      </SimpleGrid>
      <br />
      <br />
      <Heading>
        <p>APIs</p>
      </Heading>
      <br />
      <SimpleGrid columns={3} spacing={10} justify="center">
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>Twitter API</div>
          </Center>
        </Box>
        <Box
          bg="lightblue"
          height="150px"
          width="150px"
          padding="20px"
          fontWeight="semibold"
          borderRadius="20"
        >
          <Center>
            <div>HTML Drag and Drop API</div>
          </Center>
        </Box>
      </SimpleGrid>
    </div>
  )
}

export default AboutPage
