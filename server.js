// module requirments
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');
const http = require('http').Server(app)
const io = require('socket.io')(http)

require('dotenv').config();
require('./db/db');
const PORT = process.env.PORT;

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
const whitelist = [process.env.REACT_CLIENT_URL]
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
  	}
  },credentials: true
}
app.use(cors(corsOptions)) 

//controllers
const usersController = require('./controllers/users');
app.use('/users', usersController);
const conversationsController = require('./controllers/conversations');
app.use('/convos', conversationsController);
const messagesController = require('./controllers/messages');
app.use('/messages', messagesController);

io.on('connection', (socket) => {
	console.log('user conncected');

	socket.on("messages", (message) => {
		console.log('messages reiceved from client');
		io.sockets.emit('messages', message)
		console.log('messages sent to clients');
	})

	socket.on('conversations', (conversation) => {
		console.log('conversation sent');
		io.sockets.emit('conversations', conversation)
	})

	socket.on('disconnect', () => {
		console.log('user disconnected');
	})
})

http.listen(PORT, () => {
	console.log('listening on port:', PORT);
});

module.exports = app