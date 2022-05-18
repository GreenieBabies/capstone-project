import React, { useState, useEffect, useRef, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateListThunk, updateProject } from "../store/singleProject"
import DOMPurify from "dompurify"
import useKeypress from "./hooks/useKeypress"
import useOnClickOutside from "./hooks/useOnClickOutside"

function InlineInput(props) {
  const dispatch = useDispatch()
  const [isInputActive, setIsInputActive] = useState(false)
  const [inputValue, setInputValue] = useState(props.text)
  const auth = useSelector((state) => state.auth)

  const wrapperRef = useRef(null)
  const textRef = useRef(null)
  const inputRef = useRef(null)

  const enter = useKeypress("Enter")
  const esc = useKeypress("Escape")

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    console.log(props)
    if (isInputActive) {
      if (inputValue.length) {
        if (props.isProject) {
          props.onSetText(inputValue)
          dispatch(updateProject(props.projectId, inputValue))
        } else {
          props.onSetText(inputValue)
          dispatch(
            updateListThunk(auth.id, props.projectId, {
              columnName: inputValue,
            })
          )
        }
      }
      setIsInputActive(false)
    }
  })

  const onEnter = useCallback(() => {
    if (enter) {
      if (inputValue.length) {
        //for projects
        if (props.isProject) {
          props.onSetText(inputValue)
          dispatch(updateProject(props.projectId, inputValue))
        } else {
          props.onSetText(inputValue)
          dispatch(
            updateListThunk(auth.id, props.projectId, {
              columnName: inputValue,
            })
          )
        }
      }
      setIsInputActive(false)
    }
    //   if (inputValue.length) {
    //     props.onSetText(inputValue)
    //     dispatch(updateProject(props.projectId, inputValue))
    //   }
    //   setIsInputActive(false)
    // }
  }, [enter, inputValue, props.onSetText])

  const onEsc = useCallback(() => {
    if (esc) {
      setInputValue(props.text)
      setIsInputActive(false)
    }
  }, [esc, props.text])

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus()
    }
  }, [isInputActive])

  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and close the editor
      onEnter()
      // if Escape is pressed, revert the text and close the editor
      onEsc()
    }
  }, [onEnter, onEsc, isInputActive]) // watch the Enter and Escape key presses

  const handleInputChange = useCallback(
    (event) => {
      // sanitize the input a little
      setInputValue(DOMPurify.sanitize(event.target.value))
    },
    [setInputValue]
  )

  const handleSpanClick = useCallback(() => {
    setIsInputActive(true), [setIsInputActive]
    setInputValue("") // clear project name
  })

  return (
    <span className="inline-text" ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={handleSpanClick}
        className={`inline-text_copy inline-text_copy--${
          !isInputActive ? "active" : "hidden"
        }`}
      >
        <h1>{props.text}</h1>
      </span>
      <input
        ref={inputRef}
        // set the width to the input length multiplied by the x height
        // it's not quite right but gets it close
        style={{ minWidth: Math.ceil(inputValue.length) + "ch" }}
        value={inputValue}
        onChange={handleInputChange}
        className={`inline-text_input inline-text_input--${
          isInputActive ? "active" : "hidden"
        }`}
      />
    </span>
  )
}

export default InlineInput
