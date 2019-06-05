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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}));
app.use(cors({
	origin: process.env.REACT_CLIENT_URL,
	credentials: true,
	optionsSuccessStatus: 200
}));

const usersController = require('./controllers/users');
app.use('/users', usersController);
const conversationsController = require('./controllers/conversations');
app.use('/convos', conversationsController);
const messagesController = require('./controllers/messages');
app.use('/messages', messagesController);

io.on('connection', (client) => {
	console.log('user conncected');

	client.on('chat message', (msg) => {
		console.log('message: ' + msg);
	})

	client.on('disconnect', () => {
		console.log('a user logged off');
	})
})

http.listen(PORT, () => {
	console.log('listening on port:', PORT);
});