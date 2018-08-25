import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const Schema = mongoose.Schema

const Local = new Schema({
  name: [String],
  addres: String,
  number: String,
  lat: Number,
  long: Number,
  description: [String],
  category: {
    type: Schema.Types.ObjectId,
    autopopulate: true,
    ref: 'LocalCategory'
  }
})

Local.methods.validateBody = function (body) {
  return (body.name && body.lat && body.long)
}

Local.methods.newBody = function (body) {
  let newBody = {
    name: body.name || undefined,
    addres: body.addres || undefined,
    number: body.number || undefined,
    lat: body.lat || undefined,
    long: body.long || undefined,
    description: body.description || undefined,
    category: body.category || undefined
  }
  return newBody
}

Local.methods.getSortingAttr = function () {
  return 'name.0'
}

Local.methods.getRefs = function () {
  return ['LocalCategory']
}

Local.plugin(autopopulate)

mongoose.model('Local', Local)
