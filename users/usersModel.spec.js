const request = require('supertest');

const server =require('../api/server');

const Users = require('./usersModel');
const db = require('../database/dbConfig');

const user = {
    username: "username",
    password: "password"
}


describe('POST /', function(){
    it('should return 201 OK', function(){
        return request(server).post('/api/auth/register').send(user)
        .then(res => {
            console.log(res.status) 
            expect(res.status).toBe(201);
        })
    })
})


describe('POST /', function(){
    it('should return JSON', function(){
        return request(server).post('/api/auth/register').send(user)
        .then(res => {
            expect(res.type).toMatch(/json/i);
        })
    })
})


describe('POST /', function(){
    it('should return 200 OK', function(){
        return request(server).post('/api/auth/login').send(user)
        .then(res => {
            expect(res.status).toBe(200);
        })
    })
})

describe('POST /', function(){
    it('should return JSON', function(){
        return request(server).post('/api/auth/login').send(user)
        .then(res => {
            expect(res.type).toMatch(/json/i);
        })
    })
})