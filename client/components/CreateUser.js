import { createUserThunk } from "../store/singleUser"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const CreateUser = (props) => {
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
      dispatch(createUserThunk(form))
    } catch (err) {}
    props.history.push("/login")
  }
  return (
    <div>
      <form id="user-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
        />
        <button type="submit" onSubmit={handleSubmit}>
          Submit
        </button>
        <Link to="/">Cancel</Link>
      </form>
    </div>
  )
}

export default CreateUser
