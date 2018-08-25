import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Afiliation = new Schema({
  name: [String],
  initials: String
})

Afiliation.methods.validateBody = function (body) {
  return (body.name && body.initials)
}

Afiliation.methods.newBody = function (body) {
  let newBody = {
    name: body.name || undefined,
    initials: body.initials || undefined
  }
  return newBody
}

Afiliation.methods.getRefs = function () {
  return []
}

Afiliation.methods.getSortingAttr = function () {
  return 'initials'
}

mongoose.model('Afiliation', Afiliation)
