/**
 * This module is just for demonstration and test purposes
 * It will not interact with teravoz API and will always
 * return { status: 'ok' }
 */
const axios = require('axios')
const debug = require('debug', 'service:components:teravoz')

module.exports = app => {
  const BASE_URL = 'https://api.teravoz.com'

  const delegate = async call => {
    debug('delegate')
    const opts = {
      method: 'POST',
      url: `${BASE_URL}/actions`,
      data: call,
      json: true,
      headers: {
        'Authorization': 'Basic dXNlcjpwYXNzdw=='
      }
    }

    // Forcing return to avoid unwanted fetchs
    if (opts) return { status: 'ok' }

    try {
      const { data } = await axios(opts)
      return data
    } catch (error) {
      return error
    }
  }

  return {
    delegate
  }
}
