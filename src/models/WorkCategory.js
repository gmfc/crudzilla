import mongoose from 'mongoose'
const Schema = mongoose.Schema

const WorkCategory = new Schema({
  name: [String]
})

WorkCategory.methods.validateBody = function (body) {
  return (body.name)
}

WorkCategory.methods.newBody = function (body) {
  let newBody = {
    name: body.name || undefined
  }
  return newBody
}

WorkCategory.methods.getSortingAttr = function () {
  return 'name.0'
}

WorkCategory.methods.getRefs = function () {
  return []
}

mongoose.model('WorkCategory', WorkCategory)
