import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { IconButton } from "@chakra-ui/button"
import { FaLinkedin, FaGithub } from "react-icons/fa"

const SingleFounder = () => {
  const location = useLocation()
  const state = location.state
  console.log(state)

  return (
    <div className="SingleFounder">
      <img src={state.imageUrl} />
      <p>{`Name: ${state.firstName} ${state.lastName}`}</p>
      <p>{`About Me: ${state.aboutMe}`}</p>
      <h2>Connect with me!</h2>
      <IconButton
        ml="8"
        icon={<FaLinkedin />}
        isRound={true}
        onClick={() => window.open(`${state.linkedin}`, "_blank")}
      ></IconButton>
      <IconButton
        ml="8"
        icon={<FaGithub />}
        isRound={true}
        onClick={() => window.open(`${state.gitHub}`, "_blank")}
      ></IconButton>
    </div>
  )
}

export default SingleFounder
