import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Role = new Schema({
  name: [String]
})

Role.methods.validateBody = function (body) {
  return (body.name)
}

Role.methods.newBody = function (body) {
  let newBody = {
    name: body.name || undefined
  }
  return newBody
}

Role.methods.getSortingAttr = function () {
  return 'name.0'
}

Role.methods.getRefs = function () {
  return []
}

mongoose.model('Role', Role)
