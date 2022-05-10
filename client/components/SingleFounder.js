import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const SingleFounder = () => {
  const location = useLocation()
  const { member } = location.state

  return (
    <div className="SingleFounder">
      <img src={member.imageUrl} />
      <p>{`Name: ${member.firstName} ${member.lastName}`}</p>
      <p>{`About Me: ${member.aboutMe}`}</p>
    </div>
  )
}

export default SingleFounder
