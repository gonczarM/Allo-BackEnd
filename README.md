#Routes

##User:
GET (/user/logout) -- logs user out, kills session
GET (/user/:id/) -- user information
GET (/user/:id/edit) -- user info to edit
GET (/user/:id/convos) -- list of users conversations
GET(/user/:id/convos/:search) -- search for specific conversation
GET(/search/:username) -- search through users to chat with
GET(/user/:id/lang) -- user language prefrences
PUT (/user/:id) -- update user
PUT (/user/:id/lang) -- update user language prefrences
POST (/user/register) -- creates user, starts session
POST (/user/login) -- login user, start sesssion
DELETE (/user/:id) -- delete specific user and associated posts

##Conversation:
GET (/convo/:id) -- show specific conversation
POST (/convo) -- start a conversation
DELETE (/convo/:id) -- Delete Conversation

#Models

##User:
username, password, language, received_lang, sent_lang, location, about, first_name, last_name, active, conversations

##Conversation:
updated, messages(text, status)

#Third party API

##IBM Watson LT:
https://www.ibm.com/watson/services/language-translator/?lnk=hm
