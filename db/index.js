const Mongoose = require('mongoose')
const User = require('./models/user')
const Contact = require('./models/contact')
const Group = require('./models/group')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { SECRET, DBURL } = require('../config/config').config

const Connect = function() {
    Mongoose.Promise = global.Promise
    try {
        Mongoose.connect(DBURL, { useNewUrlParser: true }).then(() => {
            console.log('database is running ...')
        }).catch((err) => {
            console.log(`error: ${err} occurred while connecting to database.`)
        });
    }catch(Error) {
        throw Error
    }
}

const createToken = async (user) => {
    //const { name, _id } = user
    let token = await jwt.sign({ user }, SECRET, {expiresIn: '10hr'})
    return token
};

const GetCurrentUser = async (token) => {
    let user = null
    try{
        if(token === null || token === 'null' || token === undefined || token === '') {
            console.log('we dont have any token yet. lets wait.')
        }
        else{
            const result = await jwt.verify(token, SECRET)
            if(result)
                user = result.user
        }
    }catch(err) {
        console.log(err)
    }
    return user
}

const Register = async function({name, email, phone, password}) {

    try {
        const user = await User.findOne({email});
        if (user) {
            throw new Error('User already exists');
        }
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password, salt)
        const newUser = await new User({name, email, phone, password: hash}).save();
        let token = await createToken(newUser);
        return {user: newUser, token}
    }catch(Error) {
        throw Error
    }
}
const Login = async function({email, password}) {
    try {
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('User not found');
        };
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid password')
        }
        const token = await createToken(user)
        return { user, token }
    }catch(Error) {
        throw Error
    }
}
const GetContacts = async function({user, group}) {
    try{
        const contacts = (group === null || group === 'undefined' || group === 'all') ? 
                            //find all contacts from the user
                            await Contact.find({user}) : 
                            //find all contacts from the user and from particular group
                            await Contact.find({user, group})
        return contacts
    }catch(Error) {
        throw Error
    }
}

const GetContact = async function({id}) {
    try{
        const contact = await Contact.findById(id)
        return contact
    }catch(Error) {
        throw Error
    }
}
const AddContact = async function({user, name, email, phone, job, group, active, starred }) {
    try{
        const temp = await new Contact({ user, name, email, phone, group, active, starred }).save();
        return temp
    }catch(Error) {
        throw Error
    }
}

const EditContact = async function({id, user, name, email, phone, job, group, active, starred }) {
    try {
        const temp = await Contact.findOneAndUpdate(id, {user, name, email , phone,group, active, starred})
        return temp
    }catch(Error) {
        throw Error
    }
}

const DeleteContact = async function({id}) {
    try {
        const temp = await Contact.findOneAndDelete({id})
        return temp
    }catch(Error) {
        throw Error
    }
}

const AddGroup = async function({user, name }) {
    try{
        let temp = await new Group({ user, name }).save();
        return temp
    }catch(Error) {
        throw Error
    }
}

//to change the active field of a group
const ActivateGroup = async function({id, active}) {
    try {
        let temp = await Group.findOneAndUpdate(id, { active })
        //todo change active fields of all the associated contacts
        await Contact.updateMany({group: id}, {active})
        return temp
    }catch(Error) {
        throw Error
    }
}

//just to change the name of a group
const EditGroup = async function({id, name}) {
    try {
        const temp = await Group.findOneAndUpdate(id, { name })
        return temp
    }catch(Error) {
        throw Error
    }
}

const DeleteGroup = async function({id}) {
    try {
        const temp = await Group.findByIdAndRemove(id)
        return temp
    }catch(Error) {
        throw Error
    }
}

const GetGroups = async function({user, groupid}) {
    try {
        const temp = await Group.find({user})
        return temp
    }catch(Error) {
        throw Error
    }
}

module.exports = {  Connect, Login, Register, 
                    GetContact, GetContacts,
                    AddContact, EditContact, DeleteContact,
                    GetGroups, AddGroup, EditGroup, DeleteGroup, ActivateGroup,
                    GetCurrentUser }
