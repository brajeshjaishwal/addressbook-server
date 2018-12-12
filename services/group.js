const { AddGroup, GetGroups, GetContacts, EditGroup, ActivateGroup, DeleteGroup } = require('../db/index')

const getGroupList = async (req, res) => {
    try {
        const { groupid } = req.params
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let groups = await GetGroups({user: user._id})
        let groupsWithContacts = []
        
        //groups.forEach(g => {
        for(let g of groups) {
            let tempGroup = {
                                id: g._id,
                                name: g.name,
                                active: g.active,
                                contacts: []
                            }
            let tempContacts = await GetContacts({user: user._id, group: g._id})
            tempGroup.contacts = tempContacts
            tempGroup.total = tempContacts.length
            groupsWithContacts.push(tempGroup)
        }
    //)
        return res.send({ groups : groupsWithContacts })
    } catch (Error) {
        return res.send({ groups : null, message: Error.message})
    }
}

const createGroup = async (req, res) => {
    try {
        const { name } = req.body
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let temp = await AddGroup({user: user._id, name})

        let group = { id: temp._id, name: temp.name, contacts: [], active: temp.active }
        return res.send({ group })
    } catch (Error) {
        return res.send({ group: null, message: Error.message})
    }
}

const editGroup = async (req, res) => {
    try {
        const { groupid } = req.params
        const { name, active } = req.body
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let temp = name ?
                    await EditGroup({id: groupid, name}) :
                    await ActivateGroup({id: groupid, active})

        let group = { id: temp._id, name: temp.name, active: temp.active, contacts: [] }

        //fetch updated contact items
        let tempContacts = await GetContacts({user: user._id, group: group.id})
        group.contacts.push(tempContacts)
        return res.send({ group })
    } catch (Error) {
        return res.send({ group: null, message: Error.message})
    }
}

const deleteGroup = async (req, res) => {
    try{
        //don't delete associate contacts, think of initial situation when groups were not there but contacts
        const { groupid } = req.params
        const user = req.user
        if(!user) throw Error("You are not logged in.")
        let temp = await DeleteGroup({id: groupid})
        let group = { id: temp._id }
        return res.send({ group })
    } catch(Error) {
        return res.send({ group: null, message: Error.message})
    }
}

module.exports = { getGroupList, createGroup, deleteGroup, editGroup }