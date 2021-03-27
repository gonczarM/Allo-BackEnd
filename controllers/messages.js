const express = require('express')
const router = express.Router();
const Convo = require('../models/conversation')
const User = require('../models/user')
const Message = require('../models/message')
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const {IamAuthenticator} = require('ibm-watson/auth');
const languageTranslator = new LanguageTranslatorV3({
  	version: '2021-03-27',
  	authenticator: new IamAuthenticator({
  		apikey: process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY,
  	}),
	serviceUrl: process.env.LANGUAGE_TRANSLATOR_URL,
});

// create a message
router.post('/:convo', async (req, res, next) => {
	try{
		if(req.session.userId == undefined){
			res.json({
				status: 401,
				message: 'you must be logged in'
			})
		}
		else{
			const foundConvo = await Convo.findById(req.params.convo)
			const loggedUser = await User.findById(req.session.userId)
			const foundUsers = await User.find({'conversations': req.params.convo})
			let foundUser;
// this loop finds the user thats part of the conversation that is not the logged in user
			for(let i = 0; i < foundUsers.length; i++){
				if(foundUsers[i]._id.toString() === req.session.userId){
					foundUsers.splice([i], 1)
					foundUser = foundUsers
				}
			}
// this stops the translating if the users use the same language
			if(foundUser[0].language == loggedUser.language){
				const createdMessage = await Message.create(req.body)
				foundConvo.messages.push(createdMessage)
			  await foundConvo.save()
				createdMessage.conversation.push(foundConvo)
				createdMessage.user.push(loggedUser)
				await createdMessage.save()
				res.json({
					status: 200,
					message: createdMessage
				})
			}
			else{
				const translateParams = {
		  		text: req.body.text,
		  		modelId: `${loggedUser.language}-${foundUser[0].language}`
				};
				const translationResult = await languageTranslator.translate(translateParams);
				messageDbEntry = {}
				messageDbEntry.text = req.body.text
				messageDbEntry.translatedText = translationResult.result.translations[0].translation
				const createdMessage = await Message.create(messageDbEntry)
				foundConvo.messages.push(createdMessage)
			  	await foundConvo.save()
				createdMessage.conversation.push(foundConvo)
				createdMessage.user.push(loggedUser)
				await createdMessage.save()
				res.json({
					status: 200,
					message: createdMessage
				})
			}
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

// delete a message
router.delete('/message/:id', async (req, res, next) => {
	try{
		const deletedMessage = await Message.findByIdAndDelete(req.params.id)
		res.json({
			status: 200,
			message: "message has been deleted"
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

module.exports = router;