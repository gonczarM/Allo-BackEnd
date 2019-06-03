const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');

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

app.listen(PORT, () => {
	console.log('listening on port:', PORT);
});