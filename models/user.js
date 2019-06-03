const mongoose = require('mongoose');
const Conversation = require('./conversation');
const Message = require('./message');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	}, 
	password: String,
	language: String,
	recieved_lang: {
		type: Boolean,
		default: false
	},
	sent_lang: {
		type: Boolean,
		default: true
	},
	location: String,
	about: String,
	first_name: String,
	last_name: String,
	active: {
		type: Boolean,
		default: false
	},
	conversations:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Conversation'
	}],
	messages:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;