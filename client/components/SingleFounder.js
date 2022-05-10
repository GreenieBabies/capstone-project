import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const SingleFounder = () => {
  const location = useLocation()
  const state = location.state

  return (
    <div className="SingleFounder">
      <img src={state.imageUrl} />
      <p>{`Name: ${state.firstName} ${state.lastName}`}</p>
      <p>{`About Me: ${state.aboutMe}`}</p>
    </div>
  )
}

export default SingleFounder
