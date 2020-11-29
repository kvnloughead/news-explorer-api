/* eslint-disable no-undef */
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('./app.js');

const request = supertest(app);

// beforeAll((done) => {
//   done();
// });

describe('Signup successful', () => {
  test('Returns data and status 201 on successful request to /signup',
    () => request.post('/signup').send({
      name: 'Kevin',
      email: 'testUser@mail.com',
      password: 'asdf',
    }).then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Kevin');
      expect(res.body.email).toBe('testUser@mail.com');
      expect(res.body.password).not.toBe('asdf');
    }));
});

describe('Signup non-unique email', () => {
  test('Returns data and status 201 on successful request to /signup',
    () => request.post('/signup').send({
      name: 'Kevin',
      email: 'testUser@mail.com',
      password: 'asdf',
    }).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('That email is already in use.');
    }));
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
