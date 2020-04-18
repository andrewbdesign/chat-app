const express = require('express')
const app = express()
const path = require('path')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PORT = process.env.PORT || 5000

const SEND_MESSAGE = 'SEND_MESSAGE';
const REGISTER_USER = 'REGISTER_USER';

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on(SEND_MESSAGE, message => {
    io.emit(SEND_MESSAGE, message)
  })

  socket.on(REGISTER_USER, username => {
    console.log('new user', username)
    io.emit(REGISTER_USER, username)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

http.listen(PORT, () => console.log(`Listening on port: ${PORT}`))