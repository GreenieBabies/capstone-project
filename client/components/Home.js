import React from "react"
import { connect, useSelector } from "react-redux"
import {
  Link,
  Heading,
  Circle,
  Center,
  Image,
  Box,
  Text,
  HStack,
  SimpleGrid
} from "@chakra-ui/react"
import { Link as RouteLink } from "react-router-dom"
import AuthForm from "./AuthForm"
import { Button } from "@chakra-ui/button"

export const Home = props => {
  let auth = useSelector(store => store.auth)
  const { username, id } = auth

  return (
    <div id="homePage">
      <div id="header">
        {/* <h3>Welcome, {username ? username : ""}</h3> */}
        <Heading>
          <h1>Welcome to Trello + Voice!</h1>
        </Heading>

        <Box>
          <Text fontSize="xl">
            The most interactive and effective project management app out there!
          </Text>
        </Box>
      </div>
      <br />
      <div id="loginUserButtons">
        {username ? (
          <RouteLink to={`/users/${id}`}>
            <Button>Let's Go To Your Projects!</Button>
          </RouteLink>
        ) : (
          <RouteLink to="/signup">
            <Button size="lg" colorScheme="green" mt="24px">
              Sign up for Trello+Voice for free!
            </Button>
          </RouteLink>
        )}
      </div>
      <br />

      <div id="projectDescription">
        <h3>
          It's more than just a drag-and-drop to-do list. Trello+Voice will read
          out your current projects, lists, and tasks so you can manage your
          projects, hands-free!
        </h3>
        <br />
        <br />
        <Heading>
          <h4>Voice Commands Include:</h4>
        </Heading>
        <br />
        <Center>
          <SimpleGrid columns={[2, null, 3]} spacing="80px" justify="center">
            <Circle bg="lightblue" width="150px" height="150px" padding="20px">
              List Projects
            </Circle>
            <Circle bg="lightblue" width="150px" padding="20px">
              List Columns
            </Circle>
            <Circle bg="lightblue" width="150px" height="150px" padding="20px">
              List Tasks
            </Circle>
            <Circle bg="lightblue" width="150px" height="150px" padding="20px">
              How Many Active Tasks Remaining?
            </Circle>
            <Circle bg="lightblue" width="150px" height="150px" padding="20px">
              Speech-To-Text Note Taking
            </Circle>
          </SimpleGrid>
        </Center>
        <br />
        <br />
        <Heading>
          <h4>Sample Images</h4>
        </Heading>
      </div>
      <Center>
        <div className="exampleImages">
          <Image
            src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png"
            alt="Project with list and task example"
            width="400"
            height="300"
          />
          <Image
            src="https://resources.dfuob.com/wp-content/uploads/2019/06/trello-boards-1280x960.jpg"
            alt="Project with list and task example 2"
            width="400"
            height="300"
          />
          <br />
          <br />
        </div>
      </Center>
      <div className="aboutTeam">
        <Link to="/about">
          <Button>Click Here to Learn More About Our Awesome Team!</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
