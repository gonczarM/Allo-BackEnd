const mongoose = require('mongoose');
const User = require('./user');
const Message = require('./message');

const conversationSchema = new mongoose.Schema({
	updated: {
		type: Date,
		default: Date.now
	},
	users:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	messages:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	}]
})

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
