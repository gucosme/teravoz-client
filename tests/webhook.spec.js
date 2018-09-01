const { expect } = require('chai')
const supertest = require('supertest')

const app = require('../src/server.js')
const request = supertest(app)

describe('POST /webhook', () => {
  const badRequestError = {
    error: {
      title: 'Bad Request',
      name: 'BadRequestError',
      message: 'Missing body'
    }
  }

  it('should respond with error, missing body', async () => {
    const { status, body } = await request.post('/webhook')
    expect(status).to.be.equal(400)
    expect(body).to.be.deep.equal(badRequestError)
  })
})
