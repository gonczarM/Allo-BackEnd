const express = require('express')
const router = express.Router();
const Convo = require('../models/conversation')
const User = require('../models/user')
const Message = require('../models/message')
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const languageTranslator = new LanguageTranslatorV3({
  version: '2019-06-05',
  iam_apikey: process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY,
	url: process.env.LANGUAGE_TRANSLATOR_URL,
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
			for(let i = 0; i < foundUsers.length; i++){
				if(foundUsers[i]._id.toString() === req.session.userId){
					foundUsers.splice([i], 1)
					foundUser = foundUsers
				}
			}
			console.log(foundUser[0].language);
			console.log(loggedUser.language);
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
		  		model_id: `${loggedUser.language}-${foundUser[0].language}`
				};
				const translationResult = await languageTranslator.translate(translateParams);
				messageDbEntry = {}
				messageDbEntry.text = req.body.text
				messageDbEntry.translatedText = translationResult.translations[0].translation
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