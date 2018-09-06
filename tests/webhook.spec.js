const R = require('ramda')
const { expect } = require('chai')
const supertest = require('supertest')
const sinon = require('sinon')

const call = require('./fixtures/call.json')
const error = require('./fixtures/error.json')

const app = require('../src/server.js')
const request = supertest(app)
const callStore = app.stores.callStore
const customerStore = app.stores.customerStore

const { teravoz } = app.components

describe('POST /webhook', () => {
  before(async () => {
    await callStore.init()
    await customerStore.init()

    sinon.replace(teravoz, 'delegate', sinon.fake())
  })

  after(async () => {
    await callStore.clear()
    await customerStore.clear()

    sinon.restore()
  })

  it('should respond with error, missing body', async () => {
    const { status, body } = await request.post('/webhook')
    expect(status).to.be.equal(400)
    expect(body).to.be.deep.equal(error.badRequestError)
  })

  it('should save a new call', async () => {
    const { status, body } =
      await request.post('/webhook')
        .send(call.new)
    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal({ status: 'ok' })

    const calls = await callStore.get()
    expect(calls.length).to.be.equal(1)
    expect(calls[0]).to.be.deep.equal(call.new)
  })

  it('should update call type, add a new customer and then delegate the call', async () => {
    const { status, body } =
      await request.post('/webhook')
        .send(call.standby)
    expect(status).to.be.equal(200)
    expect(body).to.be.deep.equal({ status: 'ok' })

    const calls = await callStore.get()
    const customers = await customerStore.get()
    const { delegate } = app.components.teravoz

    expect(calls.length).to.be.equal(1)
    expect(calls[0]).to.be.deep.equal(call.standby)
    expect(customers.length).to.be.equal(1)
    expect(customers[0]).to.be.deep.equal(R.pick(['their_number'], call.standby))

    expect(delegate.callCount).to.be.equal(1)
    expect(delegate.getCall(0).args).to.be.deep.equal([call.standby, 900])
  })
})
