const express = require('express')
const router = express.Router();
const superagent = require('superagent')
const User = require('../models/user')
const Conversation = require('../models/conversation')
const bcrypt = require('bcryptjs')

// register an account
router.post('/register', async (req, res, next) => {
	const password = req.body.password
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	const userDbEntry = {}
	userDbEntry.username = req.body.username
	userDbEntry.password = passwordHash
	userDbEntry.language = req.body.language
	userDbEntry.location = req.body.location
	userDbEntry.about = req.body.about
	userDbEntry.first_name = req.body.first_name
	userDbEntry.last_name = req.body.last_name
	try{
		const foundUsername = await User.findOne({'username': req.body.username})
		if(foundUsername){
			res.json({
				status: 401,
				message: "username already exists"
			})
		}
		else{
			const createdUser = await User.create(userDbEntry)
			req.session.loggedIn = true
			req.session.UserId = createdUser._id
			res.json({
				status: 200,
				session: req.session,
				user: createdUser
			})
		}
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