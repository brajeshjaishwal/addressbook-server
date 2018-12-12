const User = require('../db/models/user')
const expect = require('chai').expect

describe('test user model', () => {
    it('should create a user', done => {
        var temp = new User({ name: 'brajesh',
                                    email: 'brajesh.jaishwal@inmar.com',
                                    phone: 9413844898,
                                    password: 'Brajesh@1234' })
        temp.validate(err => {
                                expect(err).to.be.null
                                done()
                            })
    }),
    it('should throw out of domain error', done => {
        var temp = new User({   name: 'brajesh',
                                email: 'brajesh.jaishwal@gmail.com',
                                phone: 9413844898,
                                password: 'Brajesh@1234' })
        temp.validate(err => {
                                //assert(err.errors.email.message === 'Email is not @inmar.com')
                                expect(err.errors.email).to.exist
                                done()
                            })
    }),
    it('should throw password length error', done => {
        var temp = new User({   name: 'brajesh',
                                email: 'brajesh.jaishwal@inmar.com',
                                phone: 9413844898,
                                password: 'Brajesh#' })
        temp.validate(err => {
                                //assert(err.errors.password !== null)
                                expect(err.errors.password).to.exist
                                done()
                            })
    }),
    it('should throw password strength error', done => {
        var temp = new User({   name: 'brajesh',
                                email: 'brajesh.jaishwal@inmar.com',
                                phone: 9413844898,
                                password: 'Brajesh1234' })
        temp.validate(err => {
                                //assert(err.errors.password !== null)
                                expect(err.errors.password).to.exist
                                done()
                            })
    }),
    it('should throw invalid email', done => {
        var temp = new User({   name: 'brajesh',
                                email: 'brajesh.jaishwal@gmail',
                                phone: 9413844898,
                                password: 'Brajesh@1234' })
        temp.validate(err => {
                                expect(err.errors.email).to.not.be.null
                                done()
                            })
    }),
    it('should throw phone format error', done => {
        var temp = new User({   name: 'brajesh',
                                email: 'brajesh.jaishwal@gmail.com',
                                phone: 384-489-8,
                                password: 'Brajesh@1234' })
        temp.validate(err => {
                                expect(err.errors.phone).to.not.be.null
                                done()
                            })
    })

})