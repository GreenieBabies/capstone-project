import { connect } from "react-redux"
import React, { useState } from "react"
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
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { fetchSingleUser, updateSingleUser, getUser } from "../store/singleUser"

const EditUserInfo = (props) => {
  const { register } = useForm()
  //how do we change this to the actual user info - might be the issue
  //Also, after changing info, doesn't seem to be making desired change
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
  })

  const dispatch = useDispatch()
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      // console.log(props)
      dispatch(updateSingleUser(form, props.match.params.id))
    } catch (err) {}
    props.history.push("/users")
  }
  // class EditUserInfo extends React.Component {
  //   constructor(props) {
  //     super(props)

  //     this.state = {
  //       username: "",
  //       email: "",
  //       address: "",
  //     }

  //     this.handleChange = this.handleChange.bind(this)
  //     this.handleSubmit = this.handleSubmit.bind(this)
  // }
  // componentDidMount() {
  //   this.props.loadUser(this.props.match.params.userId)
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.user.id !== this.props.user.id) {
  //     this.setState({
  //       username: this.props.user.username,
  //       email: this.props.user.email,
  //       address: this.props.user.address,
  //     })
  //   }
  // }
  // componentWillUnmount() {
  //   this.props.clearUser()
  // }
  // handleChange(evt) {
  //   this.setState({
  //     [evt.target.name]: evt.target.value,
  //   })
  // }
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
            <Heading>Edit User Info</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit} name="editUserForm">
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="username"
                  placeholder={"username"}
                  value={form.username}
                  {...register("username")}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="*******"
                  {...register("password")}
                  value={form.password}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="email"
                  value={form.email}
                  {...register("email")}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  type="address"
                  placeholder="address"
                  value={form.address}
                  {...register("address")}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                variantcolor="teal"
                variant="outline"
                width="full"
                mt={4}
              >
                Save Changes
              </Button>
              <Button>
                <Link to="/home">Cancel</Link>
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

// const mapState = (state) => {
//   return {
//     user: state.user,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     loadUser: (id) => dispatch(fetchSingleUser(id)),
//     updateUser: (user) => dispatch(updateSingleUser(user)),
//     clearUser: () => dispatch(getUser({})),
//   }
// }

export default EditUserInfo
