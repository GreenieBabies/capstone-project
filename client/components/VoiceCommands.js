import { useRadio } from "@chakra-ui/react"

const transcription = "view Capstone"
//pass props: TRANSCRIPTION, User (from redux state)
function recognizeCommand(transcription, user) {
  const transcription = transcription.toLowerCase()
  //Create Project (in singleProject, invoke addProject() method)
  if (transcription === "create new project") {
    return "Create"
    //Delete Project (in singleProject, invoke deleteProject() method)
  } else if (transcription.split(" ")[0] === "delete") {
    // return delete command and the project to be deleted
    const deleteProject = ["Delete", transcription.split(" ")[1]]
    return deleteProject
    //View project
  } else if (transciption.split(" ")[0] === "view") {
    user.projects.map((project) => {
      if (project.name === transcription.split(" ")[1]) {
        const viewProject = ["View", project.name]
        return viewProject
        //dispatch API find by pk (project.name) redirect to url for project
      }
    })
  } else if (transcription.split(" ")[0] === "rename") {
    user.projects.map((project) => {
      if (project.name === transcription.split(" ")[1]) {
        const updatedName = { boardName: transcription.split(" ")[2] }
        return ["rename", project.name, updatedName]
        //return updateName then =>
        //dispatch PUT project.update(updatedName)
        // or dispatch directly
      }
    })
  }
}

recognizeCommand(transcription)
