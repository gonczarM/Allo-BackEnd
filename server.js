// module requirments
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');
// const http = require('http').Server(app)
// const io = require('socket.io')(http)

require("greenlock-express")
	.init({
		packageRoot: __dirname,
		configDir: "./greenlock.d",
		maintainerEmail: "mattisagumball@gmail.com",
		cluster: false
	})
	// .serve(app)
	.ready(httpsWorker)
require('dotenv').config();
require('./db/db');
const PORT = process.env.PORT;

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {httpOnly: false}
}));
app.use(cors({
	origin: process.env.REACT_CLIENT_URL,
	credentials: true,
	optionsSuccessStatus: 200
}));

//controllers
const usersController = require('./controllers/users');
app.use('/users', usersController);
const conversationsController = require('./controllers/conversations');
app.use('/convos', conversationsController);
const messagesController = require('./controllers/messages');
app.use('/messages', messagesController);

// socket.io
function httpsWorker(glx){
	const socketio =  require("socket.io");
	let io;
	const server = glx.httpsServer();

	io =socketio(server);

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
	glx.serveApp(function(rq, res){
		res.setHeader("Content-Type", "text/html; charset=utf-8");
		res.end("Hello, World!\n\n:green_heart: :lock:.js")
	})
}
// http.listen(PORT, () => {
// 	console.log('listening on port:', PORT);
// });

module.exports = app