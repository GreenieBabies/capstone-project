import React from "react"
import { connect } from "react-redux"
import { authenticate } from "../store"
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form"

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { register } = useForm()
  const { name, displayName, handleSubmit, error } = props

  return (
    <div>
      <Flex width="full" align="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit} name={name}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="username"
                  placeholder="username"
                  {...register("username")}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="*******"
                  {...register("password")}
                />
              </FormControl>
              <Button
                type="submit"
                variantcolor="teal"
                variant="outline"
                width="full"
                mt={4}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  }
}

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      console.log(evt)
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

{
  /* <Flex width="full" align="center" justifyContent="center">
<Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
  <Box textAlign="center">
    <Heading>Login</Heading>
  </Box>
  <Box my={4} textAlign="left">
    <form onSubmit={handleSubmit} name={name}>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input type="username" placeholder="username" />
      </FormControl>
      <FormControl mt={6}>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="*******" />
      </FormControl>
      <Button type="submit" variantColor="teal" variant="outline" width="full" mt={4}>
  Sign In
</Button>
    </form>
  </Box>
</Box>
</Flex> */
}
