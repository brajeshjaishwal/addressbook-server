const { GetContact, AddContact, EditContact, DeleteContact } = require('../db/index')
const domain = require('../config/config').config.DOMAIN

const createContact = async (req, res) => {
    try{
        let { name, email, phone, group, job } = req.body
        email += domain
        let user = req.user
        if(!user) throw Error("You are not logged in.")
        let contact = await AddContact({ user: user._id, name, email, phone, job, group, active: true, starred: false })
        return res.send({ contact })
    }catch(Error){
        return res.send({ contact: null, message: Error.message})
    }
}

const updateContact = async (req, res) => {
    try{
        let user = req.user
        if(!user) throw Error("You are not logged in.")
        let { name, email, phone, group, job, active, starred } = req.body
        email += domain
        let contact = await EditContact({id: req.params.contactid, user: user._id, name, email, phone, job, group, active, starred})
        return res.send({ contact })
    }catch(Error) {
        return res.send({ contact: null, message: Error.message})
    }
}

const removeContact = async (req, res) => {
    try{
        let user = req.user
        if(!user) throw Error("You are not logged in.")
        let contact = await DeleteContact({ id: req.params.contactid })
        return res.send({ contact })
    }catch(Error) {
        return res.send({ contact: null, message: Error.message})
    }
}

const getContact = async (req, res) => {
    try{
        let user = req.user
        if(!user) throw Error("You are not logged in.")
        let contact = await GetContact({ id: req.params.contactid})
        return res.send({ contact })
    }catch(Error) {
        return res.send({ contact: null, message: Error.message})
    }
}

module.exports = { createContact, updateContact, removeContact, getContact }