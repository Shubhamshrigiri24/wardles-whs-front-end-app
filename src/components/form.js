import React, { useRef, useState } from 'react'

const Form = () => {
  const [text, setText] = useState("")
  const [toggle, setToggle] = useState("hidden")
  const [label, setLabel] = useState("label")
  const labelEl = useRef()
  const styles={visibility : toggle}

function change(e){  
 if(e.target.value === ""){
 setToggle("hidden") 
 }else {
   setToggle("visible")
 }
}
  return (
    <div>
        <input onChange={(e) => change(e)}  /> 
        <p> {text}</p>
        <label style = {styles} ref={labelEl}> {label} </label>   
    </div>
  )
}
export default Form
