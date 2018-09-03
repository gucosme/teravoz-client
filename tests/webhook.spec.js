const { expect } = require('chai')
const supertest = require('supertest')

const app = require('../src/server.js')
const request = supertest(app)
const callStore = app.components.store('call-test')

describe('POST /webhook', () => {
  const badRequestError = {
    error: {
      title: 'Bad Request',
      name: 'BadRequestError',
      message: 'Body is not a valid object'
    }
  }

  const call = {
    type: 'call.new',
    call_id: '1463669263.30033',
    code: '123456',
    direction: 'inbound',
    our_number: '0800000000',
    their_number: '11999990000',
    their_number_type: 'mobile',
    timestamp: '2018-09-01T00:00:00Z'
  }

  before(async () => {
    await callStore.init()
  })

  after(async () => {
    await callStore.clear()
  })

  it('should respond with error, missing body', async () => {
    const { status, body } = await request.post('/webhook')
    expect(status).to.be.equal(400)
    expect(body).to.be.deep.equal(badRequestError)
  })

  it('should save a new call and register the number from the new user', async () => {
    const { status, body } =
      await request.post('/webhook')
        .send(call)
    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal({ status: 'ok' })
    expect(callStore.get('calls').lenght).to.be.equal(1)
  })
})
