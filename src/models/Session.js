import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const Schema = mongoose.Schema

const Session = new Schema({
  title: [String],
  description: [String],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'SessionCategory',
    autopopulate: true
  },
  local: {
    type: Schema.Types.ObjectId,
    autopopulate: true,
    ref: 'Local'
  },
  localDetail: [String],
  dateStart: String,
  timeStart: String,
  dateFinish: String,
  timeFinish: String,
  event: {
    type: Schema.Types.ObjectId,
    autopopulate: true,
    ref: 'Event'
  },
  hosts: [{
    host: {
      type: Schema.Types.ObjectId,
      autopopulate: true,
      ref: 'Host'
    },
    role: {
      type: Schema.Types.ObjectId,
      autopopulate: true,
      ref: 'Role'
    }
  }],
  works: [{
    type: Schema.Types.ObjectId,
    autopopulate: true,
    ref: 'Work'
  }]
})

Session.methods.getSortingAttr = function () {
  return 'title.0'
}

Session.methods.validateBody = function (body) {
  return (body.title && body.dateStart && body.dateFinish && body.event)
}

Session.methods.newBody = function (body) {
  let hosts = false
  if (body.hostsList && body.rolesList) {
    let hostsList = body.hostsList instanceof Array ? body.hostsList : [body.hostsList]
    let rolesList = body.rolesList instanceof Array ? body.rolesList : [body.rolesList]
    hosts = []
    for (let i = 0; i < hostsList.length; i++) {
      hosts.push({
        host: hostsList[i],
        role: rolesList[i]
      })
    }
  }

  let newBody = {
    title: body.title || undefined,
    description: body.description || undefined,
    category: body.category || undefined,
    local: body.local || undefined,
    localDetail: body.localDetail || undefined,
    dateStart: body.dateStart || undefined,
    timeStart: body.timeStart || undefined,
    dateFinish: body.dateFinish || undefined,
    timeFinish: body.timeFinish || undefined,
    event: body.event || undefined,
    hosts: hosts || undefined,
    works: body.works || undefined
  }
  return newBody
}

Session.methods.getRefs = function () {
  return ['SessionCategory', 'Local', 'Event', 'Host', 'Role', 'Work']
}

Session.plugin(autopopulate)

mongoose.model('Session', Session)
