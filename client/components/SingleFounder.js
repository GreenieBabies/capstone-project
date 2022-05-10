import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const SingleFounder = () => {
  const location = useLocation()

  return (
    <div className="SingleFounder">
      <img src={location.state.imageUrl} />
      <p>{`Name: ${location.state.firstName} ${location.state.lastName}`}</p>
      <p>{`About Me: ${location.state.aboutMe}`}</p>
    </div>
  )
}

export default SingleFounder
