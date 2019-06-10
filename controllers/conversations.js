const express = require('express')
const router = express.Router();
const Convo = require('../models/conversation')
const User = require('../models/user')
const Message = require('../models/message')

// show conversation
router.get('/convo/:id', async (req, res, next) => {
	try{
		const foundConversation = await Convo.findById(req.params.id)
		.populate({
			path: 'messages',
			populate: {path: 'user'}
		})
		res.json({
			status: 200,
			convo: foundConversation
		})
	}
	catch(error){
		console.log(error);
		res.json({
			status: 400,
			error: error
		})
	}
})

// list of logged in users conversations
router.get('/current', async (req, res, next) => {
	try{
		if(req.session.userId == undefined){
			res.json({
				status: 401,
				message: 'you must be logged in'
			})
		}
		else{
			const foundUser = await User.findById(req.session.userId)
			.populate({
				path: 'conversations',
				populate: {path: 'users'}
			})
			res.json({
				status: 200,
				convos: foundUser.conversations
			})
		}
	}
	catch(error){
		console.log(next(error));
		res.json({
			status: 400,
			error: error
		})
	}		
})

// search for a conversation by username
router.get('/search/:username', async (req, res, next) => {
	try{
		const foundUser = await User.findOne({'username': req.params.username})
		const loggedUser = await User.findById(req.session.userId)
		let foundConversation;
		loop1:
		for(let i = 0; i < foundUser.conversations.length; i++){
			for(let j = 0; j < loggedUser.conversations.length; j++){
				if(foundUser.conversations[i].toString() === loggedUser.conversations[j].toString()){
					foundConversation = foundUser.conversations[i].toString()
					break loop1;
				}
			}
		}
		const foundConvo = await Convo.findById(foundConversation)
		.populate('users')
		res.json({
			status: 200,
			convo: foundConvo
		})
	}
	catch(error){
		console.log(next(error));
		res.json({
			status: 400,
			error: error
		})
	}		
})

// create a conversation
router.post('/:user', async (req, res, next) => {
	try{
		const loggedUser = await User.findById(req.session.userId)
		const foundUser = await User.findOne({'username': req.params.user})
		// write an if statement to check if users already have a chat
		// console.log(loggedUser);
		// console.log(foundUser);
		const createdConvo = await Convo.create(req.body)
		// console.log(createdConvo);
		createdConvo.users.push(foundUser, loggedUser)
		createdConvo.save()
		loggedUser.conversations.push(createdConvo)
		loggedUser.save()
		foundUser.conversations.push(createdConvo)
		foundUser.save()
		res.json({
			status: 200,
			convo: createdConvo
		})
	}
	catch(error){
		res.json({
			status: 400,
			error: error
		})
		console.log(next(error))
	}		
})

// deleting a conversation
router.delete('/convo/:id', async (req, res, next) => {
	try{
		const deletedConvo = await Convo.findByIdAndDelete(req.params.id)
		const deletedConvosMessages = await Message.deleteMany({
			_id: { $in: deletedConvo.messages}
		})
		//delete the conversation from the user
		res.json({
			status: 200,
			message: "Conversation has been deleted"
		})
	}
	catch(error){
		res.json({
			status: 400,
			error: error
		})
		console.log(next(error))
	}		
})

module.exports = router;