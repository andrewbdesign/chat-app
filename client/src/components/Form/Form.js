import React, { useState, useRef } from 'react'

import './Form.scss'


const Form = ({ onSubmit, username }) => {

  const [value, setValue] = useState({
    message: '',
    username: ''
  })
  const textareEl = useRef(null)

  const sound = require('../../assets/msn-sound.mp3')

  const audioEl = useRef(null)

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value)
    setValue({
      message: '',
      username: ''
    })
    playSound()
  }

  const onChange = e => {
    setValue({
      message: e.target.value,
      username: username
    })
  }

  const playSound = () => {
    audioEl.current.currentTime = ''
    audioEl.current.play()
  }

  return (
    <section className="input-form">
      <audio 
        controls 
        ref={audioEl} 
        style={{ display: 'none' }}>
        <source src={sound} type="audio/mpeg"/>
      </audio>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            ref={textareEl}
            value={value.message} 
            onChange={onChange}/>
          <button
            disabled={value.length === 0}>Send</button>
        </form>
      </div>
    </section>
  )
}

export default Form;