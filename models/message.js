const mongoose = require('mongoose');
const Conversation = require('./conversation');
const User = require('./user');

const messageSchema = new mongoose.Schema({
	text: String,
	translatedText: String,
	status: {
		type: Boolean,
		default: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	conversation: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Conversation'
	}],
	user: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;