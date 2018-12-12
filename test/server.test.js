const {expect} = require('chai')
const supertest = require('supertest')
require('../server')
const server = supertest.agent("http://localhost:3300")

describe("check server",function(){
    // #1 should return welcome message
    it("should return welcome message",function(done){
        // calling home page api
        server
        .get("/welcome")
        .expect("Content-type",/json/)
        .expect(200) // THis is HTTP response
        .end(function(err, res){
                // HTTP status should be 200
                expect(res.status).to.be.equal(200)
                done()
            });
    });
    // #1 should return welcome message
    it("should return error",function(done){
        // calling home page api
        server
        .get("/error")
        .expect("Content-type",/json/)
        .expect(404) // THis is HTTP response
        .end(function(err, res){
                // HTTP status should be 200
                expect(res.status).to.be.equal(404);
                done();
            });
    });
});