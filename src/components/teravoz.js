const axios = require('axios')
const debug = require('debug', 'service:components:teravoz')

module.exports = app => {
  const BASE_URL = 'https://gusta.free.beeceptor.com/api'

  const delegate = async call => {
    debug('delegate')

    try {
      const { data } = await axios.post(`${BASE_URL}/actions`, call)
      return data
    } catch (error) {
      return error
    }
  }

  return {
    delegate
  }
}
