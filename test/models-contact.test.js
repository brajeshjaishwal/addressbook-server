const Contact = require('../db/models/contact')
const assert = require('chai').assert 

describe('test contact model', () => {
    it('should create a contact', done => {
        var temp = new Contact({name: 'brajesh',
                                email: 'brajesh.jaishwal@inmar.com',
                                phone: 9413844898 })
        temp.validate(err => {
                                assert(err === null)
                                done()
                            })
    }),
    it('should throw out of domain error', done => {
        var temp = new Contact({name: 'brajesh',
                                email: 'brajesh.jaishwal@gmail.com',
                                phone: 9413844898 })
        temp.validate(err => {
                                assert(err.errors.email !== null)
                                done()
                            })
    }),
    it('should throw invalid email', done => {
        var temp = new Contact({name: 'brajesh',
                                email: 'brajesh.jaishwal@gmail',
                                phone: 9413844898 })
        temp.validate(err => {
                                assert(err.errors.email !== null)
                                done()
                            })
    }),
    it('should throw phone format error', done => {
        var temp = new Contact({name: 'brajesh',
                                email: 'brajesh.jaishwal@gmail.com',
                                phone: 384-489-8 })
        temp.validate(err => {
                                assert(err.errors.phone !== null)
                                done()
                            })
    })
})