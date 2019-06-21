# Allo API

This API can create users that can connect to other users with a conversation. Each user chooses an availble language and then can recieve all messages from conversations in their chosen language.

## Getting Started

This is a pretty straight forward and simple installation. This back end app uses node.js and npm so those are the only prerequisites.

### Installing

After forking the api just run npm install to download all the dependencies

### Dependencies 

This app uses 

```
bcryptjs
body-parser
cors
dotenv
express
express-session
ibm-watson
method-override
mongoose
socket.io
 ```

## Routes

These are all the endpoints that you can access for this API

### User:

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

### Conversation:

| Method | Path | Action|
|--------|------|-------|
| GET | /convo/:id | show conversation |
| GET | /current | list of users conversations |
| GET | /search/:username | search for a conversation by username |
| POST | /:user | start a conversation |
| DELETE | /convo/:id | delete a conversation |

### Message:

| Method | Path | Action|
|--------|------|-------|
| POST | /:convo | create a message in a conversation with translated message |
| DELETE | /message/:id | delete a message |


## Models

### User:

```
username, 
password, 
language, 
location, 
active, 
conversations(ref)
```

### Conversation:

```
updated, 
users(ref), 
messages(ref)
```

### Message:

```
text, 
translatedText, 
status, 
created, 
conversation(ref), 
user(ref)
```


## Third party API

### IBM Watson LT:
https://www.ibm.com/watson/services/language-translator/?lnk=hm
