#Routes

##User:

| Method | Path | Action|
|--------|------|-------|
| GET | /user/:id | users info |
| GET | /current | logged in users info |
| GET | /search/:username | search through users to chat with |
| PUT | /current | update users info or users settings |
| POST | /register | creates user, starts session |
| POST | /login | logs in user, starts sesssion |
| POST | /logout | logs user out, kills session |
| DELETE | /current | delete specific user and associated convos |

##Conversation:

| Method | Path | Action|
|--------|------|-------|
| GET | /convo/:id | show conversation |
| GET | /current | list of users conversations |
| GET | /search/:username | search for a conversation by username |
| POST | /:user | start a conversation |
| DELETE | /convo/:id | delete a conversation |

##Message:

| Method | Path | Action|
|--------|------|-------|
| POST | /:convo | create a message in a conversation with translated message |
| DELETE | /message/:id | delete a message |


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
