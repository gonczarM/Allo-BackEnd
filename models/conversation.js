const mongoose = require('mongoose');
const Message = require('./message');

const messageSchema = new mongoose.Schema({
	text: String,
	status: {
		type: Boolean,
		default: false
	}
})

const conversationSchema = new mongoose.Schema({
	updated: {
		type: Date,
		default: Date.now
	},
	messages: [messageSchema]
})

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
