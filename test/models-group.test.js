const Group = require('../db/models/group')
const expect = require('chai').expect 

describe('test group model', () => {
    it('should create a group', done => {
        var temp = new Group({name: 'friends'})
        temp.validate(err => {
                                expect(err).to.be.null
                                done()
                            })
    }),
    it('should throw group name empty error', done => {
        var temp = new Group()
        temp.validate(err => {
                                expect(err.errors.name).to.not.be.null
                                done()
                            })
    })
})