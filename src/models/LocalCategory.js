import mongoose from 'mongoose'
const Schema = mongoose.Schema

const LocalCategory = new Schema({
  name: [String]
})

LocalCategory.methods.validateBody = function (body) {
  return (body.name)
}

LocalCategory.methods.newBody = function (body) {
  let newBody = {
    name: body.name || undefined
  }
  return newBody
}

LocalCategory.methods.getSortingAttr = function () {
  return 'name.0'
}

LocalCategory.methods.getRefs = function () {
  return []
}

mongoose.model('LocalCategory', LocalCategory)
