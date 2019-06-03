#Routes

##User:
GET (/user/logout) -- logs user out, kills session<br/>
GET (/user/:id/) -- user information<br/>
GET (/user/:id/edit) -- user info to edit<br/>
GET (/user/:id/convos) -- list of users conversations<br/>
GET(/user/:id/convos/:search) -- search for specific conversation<br/>
GET(/search/:username) -- search through users to chat with<br/>
GET(/user/:id/lang) -- user language prefrences<br/>
PUT (/user/:id) -- update user<br/>
PUT (/user/:id/lang) -- update user language prefrences<br/>
POST (/user/register) -- creates user, starts session<br/>
POST (/user/login) -- login user, start sesssion<br/>
DELETE (/user/:id) -- delete specific user and associated posts<br/>

##Conversation:
GET (/convo/:id) -- show specific conversation<br/>
POST (/convo) -- start a conversation<br/>
DELETE (/convo/:id) -- Delete Conversation<br/>

#Models

##User:
username, password, language, received_lang, sent_lang, location, about, first_name, last_name, active, conversations

##Conversation:
updated, messages(text, status)

#Third party API

##IBM Watson LT:
https://www.ibm.com/watson/services/language-translator/?lnk=hm
