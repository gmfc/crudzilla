import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const Schema = mongoose.Schema

const Event = new Schema({
  initials: String,
  description: [String],
  title: [String],
  conference: {
    type: Schema.Types.ObjectId,
    autopopulate: true,
    ref: 'Conference'
  }
})

Event.methods.validateBody = function (body) {
  return (body.initials && body.title)
}

Event.methods.newBody = function (body) {
  let newBody = {
    initials: body.initials || undefined,
    description: body.description || undefined,
    title: body.title || undefined,
    conference: body.conference || undefined
  }
  return newBody
}

Event.methods.getSortingAttr = function () {
  return 'initials'
}

Event.methods.getRefs = function () {
  return ['Conference']
}

Event.plugin(autopopulate)

mongoose.model('Event', Event)
