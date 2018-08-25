import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const Schema = mongoose.Schema

const Work = new Schema({
  title: String,
  abstract: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'WorkCategory',
    autopopulate: true
  },
  hosts: [{
    type: Schema.Types.ObjectId,
    ref: 'Host',
    autopopulate: true
  }]
})

Work.methods.validateBody = function (body) {
  return (body.title)
}

Work.methods.getSortingAttr = function () {
  return 'title'
}

Work.methods.newBody = function (body) {
  let newBody = {
    title: body.title || undefined,
    abstract: body.abstract || undefined,
    hosts: body.hosts || undefined,
    category: body.category || undefined
  }
  return (newBody)
}

Work.methods.getRefs = function () {
  return ['Host', 'WorkCategory']
}

Work.plugin(autopopulate)
mongoose.model('Work', Work)
