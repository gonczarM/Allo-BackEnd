const express = require('express')
const router = express.Router();
const Conversation = require('../models/conversation')
const User = require('../models/user')
const superagent = require('superagent')
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const languageTranslator = new LanguageTranslatorV3({ version: '2019-06-03' });

router.get('/', async (req, res, next) => {
	try{
		const body = await languageTranslator.listIdentifiableLanguages();
		res.status(200).json({
			status: 200,
			body: body
		})
	}
	catch(error){
		res.status(400).json({
      		status: 400,
      		error: next(error)
    	})
	}		
})

module.exports = router;