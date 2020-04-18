import React from 'react'

import './Messages.scss'

const Messages = ({ messages, username }) => {

  const date = new Date(Date.now())
  const time = `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`

  return (
    <section className="messages">
      <div className="container">
        <ul>
          {
            messages.reverse().map((message, i) => {
              return (
                <li key={i}>
                  <div>
                    <span className="username">{message.username}:{' '}</span>
                    {message.message}
                  </div>
                  <span className="time">{time}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}

export default Messages