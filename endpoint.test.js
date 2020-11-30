/* eslint-disable no-undef */
const supertest = require('supertest');

const app = require('./app.js');
const User = require('./models/user');

const request = supertest(app);

beforeAll((done) => {
  done();
});

describe('Signup tests', () => {
  test('signup successful',
    () => request.post('/signup').send({
      name: 'Kevin',
      email: 'onlyUseForTesting@mail.com',
      password: 'asdf',
    }).then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Kevin');
      expect(res.body.email).toBe('onlyUseForTesting@mail.com');
      expect(res.body.password).not.toBe('asdf');
    }));
  test('signup non-unique email',
    () => request.post('/signup').send({
      name: 'Kevin',
      email: 'onlyUseForTesting@mail.com',
      password: 'asdf',
    }).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('That email is already in use.');
    }));
  test('signup no name',
    () => request.post('/signup').send({
      name: '',
      email: 'onlyUseForTesting@mail.com',
      password: 'asdf',
    }).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('"name" is not allowed to be empty');
    }));
  test('signup bad email',
    () => request.post('/signup').send({
      name: 'Kevin',
      email: '@mail.com',
      password: 'asdf',
    }).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('"email" must be a valid email');
    }));
  test('signup no email',
    () => request.post('/signup').send({
      name: 'Kevin',
      email: '',
      password: 'asdf',
    }).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('"email" is not allowed to be empty');
    }));
});

describe('Signin tests', () => {
  beforeEach(() => {
    User.findOne({ email: 'onlyUseForTesting@mail.com' }).then((user) => {
      if (!user) {
        User.create({
          name: 'Kevin',
          email: 'onlyUseForTesting@mail.com',
          password: 'asdf',
        });
      }
    });
  });
  test('signin successful', () => request.post('/signin').send({
    email: 'onlyUseForTesting@mail.com',
    password: 'asdf',
  }).then((res) => {
    console.log(res.body.message)
    expect(res.status).toBe(200);
    expect(res.body.token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
  }));
  test('signin bad email',
    () => request.post('/signin').send({
      email: '@mail.com',
      password: 'asdf',
    }).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('"email" must be a valid email');
    }));
  test('signin no email',
    () => request.post('/signin').send({
      email: '',
      password: 'asdf',
    }).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('"email" is not allowed to be empty');
    }));
  test('signin not a user',
    () => request.post('/signin').send({
      email: 'WhatAreTheChancesThatISignedUp@mail.com',
      password: 'asdf',
    }).then((res) => {
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Incorrect password or email.');
    }));
  afterAll(() => {
    User.deleteOne({ email: 'onlyUseForTesting@mail.com' });
  });
  test('signin no password',
    () => request.post('/signin').send({
      email: 'onlyUseForTesting@mail.com',
      password: '',
    }).then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('"password" is not allowed to be empty');
    }));
  test('signin bad password',
    () => request.post('/signin').send({
      email: 'onlyUseForTesting@mail.com',
      password: 'xxxx',
    }).then((res) => {
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Incorrect password or email.');
    }));
  afterAll(() => {
    User.deleteOne({ email: 'onlyUseForTesting@mail.com' });
  });
});

afterAll(async () => {
  await User.deleteOne({ email: 'onlyUseForTesting@mail.com' });

  // avoid jest open handle error
  await new Promise((resolve) => setTimeout(() => resolve(), 500));
});
