const express = require('express')
const router = express.Router();
const Convo = require('../models/conversation')
const User = require('../models/user')
const Message = require('../models/message')
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const languageTranslator = new LanguageTranslatorV3({
	url: process.env.LANGUAGE_TRANSLATOR_URL,
  version: '2019-06-03',
  iam_apikey: process.env.LANGUAGE_TRANSLATOR_IAM_APIKEY 
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
			foundConvo.save()
			createdMessage.conversation.push(foundConvo)
			createdMessage.user.push(loggedUser)
			createdMessage.save()
			res.json({
				status: 200,
				message: createdMessage
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