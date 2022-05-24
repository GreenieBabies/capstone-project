import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchAllUsers, addUserToProject } from "../store/singleUser"
import { CloseButton } from "@chakra-ui/react"
import { removeUserFromProject } from "../store/singleUser"

const AddCollaborators = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const project = useSelector((state) => state.project)
  const [allUsers, setAllUsers] = useState([])
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [collaborators, setCollaborators] = useState([])
  const [clicked, setClicked] = useState(false)
  const [enterPress, setEnterPress] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(fetchAllUsers())
    setClicked(true)
  }

  const handleRemoveCollaborator = (e, userName) => {
    e.preventDefault()
    console.log(project)
    const { id: projectId } = project
    dispatch(removeUserFromProject(userName, projectId))
    // setCollaborators([...projects, {}])
  }

  const handleInputChange = (e) => {
    const userInput = e.currentTarget.value
    const filteredSuggestions = allUsers
      .filter(
        (x) => x.username.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      )
      .reduce((acc, x) => {
        return acc.concat(x.username)
      }, [])
      .filter((x) => !collaborators.includes(x)) // remove already added collaborators
      .filter((x) => x !== user.username) // remove user
    setActiveSuggestion(0)
    setFilteredSuggestions(filteredSuggestions)
    setShowSuggestions(true)
    setUserInput(userInput)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setClicked(false)
    setActiveSuggestion(0)
    setFilteredSuggestions([])
    setShowSuggestions(false)
    // If the user clicks a name in the dropdown, userInput is just a few letters;
    // we clean up and then save the innerText from the input to get the relevant name.
    // If the user hits enter, userInput is already the full name we need.
    const innerTextVal =
      userInput.length > 0
        ? enterPress
          ? userInput
          : e.currentTarget.innerText
        : ""
    setUserInput("")
    setEnterPress(false)
    let newCollab = []
    collaborators.length === 0 && innerTextVal !== ""
      ? (newCollab = [innerTextVal])
      : innerTextVal !== ""
      ? (newCollab = [...collaborators, innerTextVal])
      : (newCollab = [...collaborators])
    // add new user to project
    const newUser = allUsers.filter((x) => x.username === innerTextVal)[0]
    newUser && dispatch(addUserToProject(newUser.id, project.id))
    setCollaborators(newCollab)
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      // on Enter
      setEnterPress(true)
      setUserInput(filteredSuggestions[activeSuggestion])
      setShowSuggestions(false)
      setActiveSuggestion(0)
    } else if (e.keyCode === 38) {
      // on Up arrow
      if (activeSuggestion === 0) {
        return
      }
      setActiveSuggestion(activeSuggestion - 1)
    } else if (e.keyCode === 40) {
      // on Down arrow
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return
      }
      setActiveSuggestion(activeSuggestion + 1)
    }
  }

  // update list when project changes
  useEffect(() => {
    let updatedCollaborators = []
    project.users &&
      (updatedCollaborators = project.users.reduce((acc, x) => {
        return acc.concat(x.username)
      }, []))
    setCollaborators(updatedCollaborators)
  }, [project])

  // set list of users
  useEffect(() => {
    setAllUsers(user.users)
    // dispatch(fetchSingleProject(project.id))
    const usernames = project.users && project.users.map((x) => x.username)
    setCollaborators(usernames)
  }, [user])

  // building up the autocomplete list
  let suggestionsListComponent
  showSuggestions && userInput
    ? filteredSuggestions.length &&
      (suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((x, index) => {
            return (
              <li
                className={
                  index === activeSuggestion ? "suggestion-active" : ""
                }
                key={index}
                onClick={handleSubmit}
              >
                {x}
              </li>
            )
          })}
        </ul>
      ))
    : (suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions available.</em>
        </div>
      ))

  return (
    <div>
      <br />
      <p>Current collaborators</p>
      {collaborators && collaborators.length !== 0 && (
        <ul>
          {collaborators.map((x, i) => (
            <li key={i} className="flexed">
              {x}
              <CloseButton
                className="removeCollab"
                onClick={(e) => handleRemoveCollaborator(e, x)}
              />
            </li>
          ))}
        </ul>
      )}
      <br />
      <button
        className={`addCollabButton${clicked ? " hidden" : ""}`}
        onClick={handleClick}
      >
        Add Collaborator
      </button>
      <form
        className={`collabForm${clicked ? " activeForm" : " hidden"}`}
        onSubmit={handleSubmit}
      >
        <label>Add collaborators</label>
        <input
          type="text"
          className="collabInput"
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        {suggestionsListComponent}
        <button className="submitCollabButton" type="submit">
          Add person
        </button>
      </form>
    </div>
  )
}

export default AddCollaborators
