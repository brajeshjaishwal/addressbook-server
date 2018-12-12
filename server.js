const express = require('express')
const cors = require('cors')
//const favicon = require('serve-favicon')
const path = require('path')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgon = require('morgan')
const auth = require('./services/auth')
const contact = require('./services/contact')
const groupManager = require('./services/group')

const { PORT, NODE_ENV, DOMAIN } = require('./config/config').Initialize()

let app = express()

require('./db/index').Connect()

app.use(cors())

app.use(helmet())

//app.use(favicon('favicon.ico'));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

app.use(morgon("combined"))

app.use((req, res, next) => auth.authenticate(req, res, next))

//welcome route
app.get('/welcome', (req, res) => auth.welcome(req, res))

//welcome route
app.get('/domain', (req, res) => {
  res.send({domain: DOMAIN})
})

//register route
app.post('/users/register', (req, res) => {
  auth.register(req, res)
})

//login route
app.post('/users/login', (req, res) => { 
  auth.login(req, res)
})

//update
app.put('/contacts/:contactid', async(req, res) => contact.updateContact(req, res))

//create
app.post('/contacts/add', async(req, res) => contact.createContact(req, res))

//delete
app.delete('/contacts/:contactid', async(req, res) => contact.removeContact(req, res))

//fetch by id
app.get('/contacts/:contactid', async(req, res) => contact.getContact(req, res))

//fetch group list and all contacts
app.get('/contacts/group/list', async(req, res) => groupManager.getGroupList(req, res))

//create group
app.post('/contacts/group/add', async(req, res) => groupManager.createGroup(req, res))

//create group
app.delete('/contacts/group/:groupid', async(req, res) => groupManager.deleteGroup(req, res))

//fetch all contacts in a group
app.get('/contacts/group/:groupid', async(req, res) => groupManager.getGroup(req, res))

//edit contact group
app.put('/contacts/group/:groupid', async(req, res) => groupManager.editGroup(req, res))

if(NODE_ENV === 'production') {
  app.use('/', express.static('client/build'))

  app.get('*', (req, res, next) => {
    const tempPath = path.resolve(__dirname, 'client','build', 'index.html')
    res.sendFile(tempPath);
  })
}

//start listening server
app.listen(PORT, () => console.log(`server is running on ${PORT}`))

module.exports = app