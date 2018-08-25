import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const Schema = mongoose.Schema

const Conference = new Schema({
  start: String,
  finish: String,
  initials: String,
  description: [String],
  title: [String],
  local: {
    type: Schema.Types.ObjectId,
    autopopulate: true,
    ref: 'Local'
  }
})

Conference.methods.validateBody = function (body) {
  return (body.initials && body.title)
}

Conference.methods.newBody = function (body) {
  let newBody = {
    start: body.start || undefined,
    finish: body.finish || undefined,
    initials: body.initials || undefined,
    description: body.description || undefined,
    title: body.title || undefined,
    local: body.local || undefined
  }
  return newBody
}

Conference.methods.getSortingAttr = function () {
  return 'initials'
}

Conference.methods.getRefs = function () {
  return ['Local']
}

Conference.plugin(autopopulate)

mongoose.model('Conference', Conference)
