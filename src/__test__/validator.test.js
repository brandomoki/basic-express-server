'use strict';


const supertest = require('supertest');
const { app } = require('../server');
const request = supertest(app);

describe('VALIDATOR', () => {
  test('this is a bad route 404', async () => {
    const response = await request.get('/thisIsNotTheWay');
    expect(response.status).toEqual(404);
  });

  test('No name querry', async () => {
    const response = await request.get('/person?name=');
    expect(response.status).toEqual(500);
  });

  test('send 200 if name is received', async () => {
    const response = await request.get('/person?name=Mando');
    expect(response.status).toEqual(200);
  });

  test('given a name in query string the output is correct', async () => {
    const response = await request.get('/person?name=ObiWan');
    expect(response.body).toHaveProperty('name');
  });
});
