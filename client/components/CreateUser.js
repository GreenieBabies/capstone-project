import { createUserThunk } from "../store/singleUser"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Flex, Box, Input, Button } from "@chakra-ui/react"

const CreateUser = props => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    address: ""
  })
  const dispatch = useDispatch()
  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    try {
      dispatch(createUserThunk(form))
    } catch (err) {}
    props.history.push("/login")
  }
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
          <form id="user-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <Input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              isRequired="true"
            />
            <label htmlFor="password">Password:</label>
            <Input
              type="text"
              name="password"
              value={form.password}
              onChange={handleChange}
              isRequired="true"
            />
            <label htmlFor="email">Email:</label>
            <Input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              isRequired="true"
            />
            <label htmlFor="address">Address:</label>
            <Input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              isRequired="true"
            />

            <Button type="submit" onSubmit={handleSubmit}>
              Submit
            </Button>

            <Link to="/">Cancel</Link>
          </form>
        </Box>
      </Flex>
    </div>
  )
}

export default CreateUser
