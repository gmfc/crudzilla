import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const Schema = mongoose.Schema

const Host = new Schema({
  name: String,
  title: String,
  bio: [String],
  email: String,
  afiliation: {
    type: Schema.Types.ObjectId,
    autopopulate: true,
    ref: 'Afiliation'
  }
})

Host.methods.validateBody = function (body) {
  return (body.name)
}

Host.methods.newBody = function (body) {
  let newBody = {
    name: body.name || undefined,
    title: body.title || undefined,
    bio: body.bio || undefined,
    email: body.email || undefined,
    afiliation: body.afiliation || undefined
  }
  return newBody
}

Host.methods.getSortingAttr = function () {
  return 'name'
}

Host.methods.getRefs = function () {
  return ['Afiliation']
}

Host.plugin(autopopulate)

mongoose.model('Host', Host)
