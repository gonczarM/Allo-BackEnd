const mongoose = require('mongoose');
const Conversation = require('./conversation');

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
	active: {
		type: Boolean,
		default: false
	},
	conversations:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Conversation'
	}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;