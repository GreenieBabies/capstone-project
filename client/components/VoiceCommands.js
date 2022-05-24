import React from "react"
import { useRadio } from "@chakra-ui/react"
import { createProject } from "../store/singleUser"
import { useDispatch } from "react-redux"
import { updateProject } from "../store/singleProject"

//pass props: TRANSCRIPTION, User (from redux state)
function addToast() {
  toastIdRef.current = toast({
    description: "Project successfully added!",
    status: "success",
  })
}

const recognizeCommand = (transcription, user) => {
  const dispatch = useDispatch()
  let lowerTranscription = transcription.toLowerCase()
  const { id } = user
  //Create Project (in singleProject, invoke addProject() method)
  if (lowerTranscription === "create new project") {
    dispatch(createProject(id))
    addToast()
    //Delete Project (in singleProject, invoke deleteProject() method)
  } else if (lowerTranscription.split(" ")[0] === "delete") {
    // return delete command and the project to be deleted
    user.projects.map((project) => {
      if (project.name === lowerTranscription.split(" ")[1]) {
        dispatch(deleteProject(id, project.id))
      }
    })
    //View project
  } else if (lowerTranscription.split(" ")[0] === "view") {
    user.projects.map((project) => {
      if (project.name === lowerTranscription.split(" ")[1]) {
        location.replace(`http://localhost:8080/projects/${project.id}`)
      }
    })
  } else if (lowerTranscription.split(" ")[0] === "rename") {
    user.projects.map((project) => {
      if (project.name === lowerTranscription.split(" ")[1]) {
        const updatedName = lowerTranscription.split(" ")[2]
        dispatch(updateProject(project.id, updatedName))
      }
    })
  }
}
