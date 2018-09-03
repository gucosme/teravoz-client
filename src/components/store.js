const fs = require('fs')
const { promisify } = require('util')
const debug = require('debug')('service:components:store')

const mkdir = promisify(fs.mkdir)
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const removeFile = promisify(fs.unlink)

module.exports = app => name => {
  const ROOT = process.env.NODE_PATH || './'

  const getFiles = async () => {
    const files = await readdir(`${ROOT}/store-data`)
    return files.length > 0
  }

  const init = async () => {
    debug('initializing store')
    try {
      await mkdir(`${ROOT}/store-data`)
    } catch (error) {
      if (error.code === 'EEXIST') debug('dir already exists, skipping')
    }

    const files = await getFiles()
    if (!files.lenght > 0) {
      const data = JSON.stringify([])
      await writeFile(`${ROOT}/store-data/${name}.json`, data)
    }
  }

  const get = async () => {
    debug(`getting data from ${name} store`)
    const file = await readFile(`${ROOT}/store-data/${name}.json`)
    const data = JSON.parse(file.toString())
    return data
  }

  const set = async () => {
    debug(`setting data in ${name} store`)
  }

  const clear = async () => {
    debug(`Removing ${name} store data`)
    await removeFile(`${ROOT}/store-data/${name}.json`)
  }

  return {
    init,
    get,
    set,
    clear
  }
}
