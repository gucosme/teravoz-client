const fs = require('fs')
const { promisify } = require('util')
const R = require('ramda')
const debug = require('debug')('service:components:store')

const mkdir = promisify(fs.mkdir)
const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const removeFile = promisify(fs.unlink)

module.exports = () => name => {
  const ROOT = process.env.NODE_PATH || '.'
  const filePath = `${ROOT}/store-data/${name}.json`

  const checkStore = async () => {
    const files = await readdir(`${ROOT}/store-data`)
    return R.find(R.equals(`${name}.json`), files)
  }

  const init = async () => {
    debug('initializing store')
    try {
      await mkdir(`${ROOT}/store-data`)
    } catch (error) {
      if (error.code === 'EEXIST') debug('dir already exists, skipping')
      else throw error
    }

    const hasStore = await checkStore()
    if (!hasStore) {
      const data = JSON.stringify([])
      await writeFile(filePath, data)
    }
  }

  const get = async () => {
    debug(`getting data from ${name} store`)
    const file = await readFile(filePath)
    const data = JSON.parse(file.toString())
    return data
  }

  const set = async entry => {
    debug(`setting data in ${name} store`)
    const file = await readFile(filePath)
    const data = JSON.parse(file.toString()).concat(entry)
    await writeFile(filePath, JSON.stringify(data, null, 3))
  }

  const update = async (query, entry) => {
    debug(`updating data in ${name} store`)
    const filterField = R.keys(query)[0]
    const notEqual = R.compose(R.not, R.equals)

    const file = await readFile(filePath)
    const data = JSON.parse(file.toString())
    const filtered = R.filter(
      doc => notEqual(R.prop(filterField, query), R.prop(filterField, doc)),
      data
    )
    const updated = filtered.concat(entry)
    await writeFile(filePath, JSON.stringify(updated, null, 3))
  }

  const clear = async () => {
    debug(`Removing ${name} store data`)
    await removeFile(filePath)
  }

  return {
    init,
    get,
    set,
    update,
    clear
  }
}
