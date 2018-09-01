const yup = require('yup')

const call = yup.object().shape({
  type: yup.string().required(),
  call_id: yup.string().required(),
  direction: yup.string().required(),
  our_number: yup.string().required(),
  their_number: yup.string().required(),
  timestamp: yup.date().required(),
  code: yup.string(),
  their_number_type: yup.string()
})

const actor = yup.object().shape({
  type: yup.string().required(),
  actor: yup.string().email().required(),
  number: yup.string().required(),
  timestamp: yup.string().required(),
  queue: yup.string(),
  code: yup.string(),
  call_id: yup.string()
})

module.exports = {
  call,
  actor
}
