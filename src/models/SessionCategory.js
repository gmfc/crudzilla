import mongoose from 'mongoose'
const Schema = mongoose.Schema

const SessionCategory = new Schema({
  name: [String]
})

SessionCategory.methods.validateBody = function (body) {
  return (body.name)
}

SessionCategory.methods.newBody = function (body) {
  let newBody = {
    name: body.name || undefined
  }
  return newBody
}

SessionCategory.methods.getSortingAttr = function () {
  return 'name.0'
}

SessionCategory.methods.getRefs = function () {
  return []
}

mongoose.model('SessionCategory', SessionCategory)
