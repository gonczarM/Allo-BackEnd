const express = require('express')
const router = express.Router();
const Convo = require('../models/conversation')
const User = require('../models/user')
const Message = require('../models/message')
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const languageTranslator = new LanguageTranslatorV3({ version: '2019-06-03' });

// translate route to third party api
// router.get('/', async (req, res, next) => {
// 	try{
// 		const translateParams = {
//   		text: 'hi, how are you?',
//   		model_id: 'en-pt',
// 		};
// 		const translationResult = await languageTranslator.translate(translateParams);
// 		res.status(200).json({
// 			status: 200,
// 			text: translationResult.translations
// 		})
// 	}
// 	catch(error){
// 		res.status(400).json({
//       		status: 400,
//       		error: next(error)
//     	})
// 	}		
// })

router.post('/:convo', async (req, res, next) => {
	try{
		const foundConvo = await Convo.findById(req.params.convo)
		const foundUser = await User.findById(req.session.userId)
		const createdMessage = await Message.create(req.body)
		foundConvo.messages.push(createdMessage)
		foundConvo.save()
		createdMessage.conversation.push(foundConvo)
		createdMessage.save()
		createdMessage.user.push(foundUser)
		createdMessage.save()
		res.json({
			status: 200,
			message: createdMessage
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