import React, { useState } from "react"
import AudioSetup, { RecordState } from "./AudioSetup"

import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"

const AudioRecorder = (props) => {
  const [recordState, setRecordState] = useState("")
  const [recording, setRecording] = useState(false)
  const [firstClick, setFirstClick] = useState(false)

  const start = () => {
    setRecordState(RecordState.START)
    setRecording(true)
    setFirstClick(true)
  }

  const stop = () => {
    setRecordState(RecordState.STOP)
    setRecording(false)
  }

  //audioData contains blob and blobUrl
  const onStop = (audioData) => {
    console.log("audioData", audioData)
  }

  return (
    <div className="recordingStuff">
      <button onClick={start} className={recording ? "hidden" : "microphone"}>
        <FaMicrophone size={40} />
      </button>
      <button onClick={stop} className={!recording ? "hidden" : "microphone"}>
        <FaMicrophoneSlash size={40} />
      </button>
      <AudioSetup state={recordState} onStop={onStop} firstClick={firstClick} />
    </div>
  )
}

export default AudioRecorder