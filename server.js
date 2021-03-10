// module requirments
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');
const http = require('http').Server(app)
const io = require('socket.io')(http)

require('dotenv').config();
require('./db/db');
const PORT = process.env.PORT;

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(cors({
	// origin: process.env.REACT_CLIENT_URL,
	// credentials: true,
	// optionsSuccessStatus: 200
}));

//controllers
const usersController = require('./controllers/users');
app.use('/users', usersController);
const conversationsController = require('./controllers/conversations');
app.use('/convos', conversationsController);
const messagesController = require('./controllers/messages');
app.use('/messages', messagesController);

//socket.io
io.on('connection', (socket) => {
	console.log('user conncected');

	socket.on("messages", (message) => {
		console.log('messages reiceved from client');
		io.sockets.emit('messages', message)
		console.log('messages sent to clients');
	})

	socket.on('conversations', (conversation) => {
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