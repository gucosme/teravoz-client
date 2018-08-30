const { expect } = require('chai')
const request = require('supertest')

const app = require('../src/server.js')

describe('GET /health', async () => {
  it('should respond with 200', async () => {
    const { body, status } = await request(app).get('/health')
    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal({ alive: true })
  })
})
