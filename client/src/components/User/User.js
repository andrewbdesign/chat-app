import React, { useState } from 'react'

import './User.scss'

const User = ({ onSubmit }) => {

  const [username, setUsername] = useState('')

  const onChange = e => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(username)
  }

  return (
    <div className="user">
      <div className="logo-container">
        <img 
          className="logo" 
          src={require('assets/msn-logo.png')} 
          alt="msn-logo"/>
      </div>
      <form onSubmit={handleSubmit}>
        <h1>
          {
            username ? 'Hello, ' + username : 'Please enter a username' 
          }
          </h1>
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          id="username"
          value={username}
          onChange={onChange}
          placeholder="Please enter username"/>
        <button
          disabled={username.length === 0}
          >Login</button>
      </form>
    </div>
  )
}

export default User