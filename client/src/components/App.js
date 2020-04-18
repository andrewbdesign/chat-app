import React, { Component, Fragment } from 'react';
import io from 'socket.io-client'

import Form from 'components/Form/Form';
import Messages from 'components/Messages/Messages'
import User from 'components/User/User'

import { 
  SEND_MESSAGE, 
  REGISTER_USER 
} from 'actions/events'



class App extends Component {
  state = {
    socket: null,
    endpoint: '',
    messages: [],
    username: '',
    users: [],
    error: ''
  }

  componentDidMount() {
    this.initSocket()
  }

  initSocket = () => {
    const { endpoint } = this.state
    const socket = io(endpoint)
    socket.on(SEND_MESSAGE, msg => {
      this.appendMessage(msg)
    })
    
    socket.on(REGISTER_USER, user => {
      this.addUser(user)
    })

    this.setState({ socket })
  }

  handleMessage = message => {
    const { socket } = this.state
    socket.emit(SEND_MESSAGE, message)
  }

  handleUser = (username) => {
    const { socket, users } = this.state
    if (users[username]) {
      this.setState({ error: 'This user exists' })
    } else {
      socket.emit(REGISTER_USER, username)
      this.setState({ 
        username, 
        error: '' 
      })
    }
  }

  appendMessage = (msg) => {
    const { messages } = this.state
    this.setState({ messages: [...messages, msg]})
  }

  addUser = user => {
    const { users } = this.state
    this.setState({users: [...users, user]})
  }

  render() {
    const { messages, username, error, users } = this.state

    return (
      <div className="App">
        <div className="window container">
          {
            username ? (
            <Fragment>
              <Messages username={users[0]} messages={messages}/>
              <Form onSubmit={this.handleMessage} username={username}/>
            </Fragment>
              ) : (
              <User 
                onSubmit={this.handleUser} 
                error={error}
              />
            )
          }
        </div>
      </div>
    )
  }
}

export default App;