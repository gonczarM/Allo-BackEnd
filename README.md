#Routes

##User:

GET (/user/:id) -- users info<br/>
GET (/current) -- logged in users info<br/>
GET(/search/:username) -- search through users to chat with<br/>
PUT (/current) -- update users info or users settings<br/>
POST (/register) -- creates user, starts session<br/>
POST (/login) -- logs in user, starts sesssion<br/>
POST (/logout) -- logs user out, kills session<br/>
DELETE (/current) -- delete specific user and associated convos<br/>

##Conversation:

GET (/convo/:id) -- show conversation<br/>
GET (/) -- list of users conversations<br/>
GET(/search/:username) -- search for a conversation by username<br/>
POST (/:user) -- start a conversation<br/>
DELETE (/convo/:id) -- delete a conversation<br/>

##Message:

POST (/:convo) -- create a message in a conversation<br/>
DELETE (/message/:id) -- delete a message<br/>


#Models

##User:

username, password, language, received_lang, sent_lang, location, about, first_name, last_name, active, conversations

##Conversation:

updated, users(ref), messages(ref)

##Message:

text, status, created, conversation(ref), user(ref)


#Third party API

##IBM Watson LT:
https://www.ibm.com/watson/services/language-translator/?lnk=hm
