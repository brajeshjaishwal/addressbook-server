const { Register, Login, GetCurrentUser } = require('../db/index')
const domain = require('../config/config').config.DOMAIN

const welcome =  (req, res) => {
    return res.send('welcome')
}

const register = async (req, res) => {
    try{
        let {name, email, phone, password} = req.body
        email += domain
        console.log('register', email)
        const { user, token } = await Register({name, email, phone, password})
        return res.send({ user, token })
    }catch(Error){
        return res.send({user: null, message: Error.message || 'some server error occurred'})
    }
}

const login = async (req, res) => {
    try{
        let { email, password } = req.body
        email += domain
        console.log('login', email)
        const { user, token } = await Login({email, password})
        req.user = user
        return res.send({ user, token })
    }catch(Error)
    {
        return res.send({user: null, message: Error.message || 'user does not exist.'})
    }
}

const authenticate = async (req, res, next) => {
        var token = req.headers['auth']
        console.log(`auth header: ${token}`)
        var user = await GetCurrentUser(token)
        if(user !== null && user !== undefined) {
            req.user = user
        }
        next()
}

module.exports = { welcome, register, login, authenticate } 
