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
      <button
        onClick={start}
        className={recording ? "hidden" : "microphone microphone-off"}
      >
        <FaMicrophoneSlash size={40} />
      </button>

      <button
        onClick={stop}
        className={!recording ? "hidden" : "microphone microphone-on"}
      >
        <FaMicrophone size={40} />
      </button>

      <AudioSetup
        state={recordState}
        onStop={onStop}
        user={props.user}
        firstClick={firstClick}
      />
    </div>
  )
}

export default AudioRecorder
