import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const Schema = mongoose.Schema

const News = new Schema({
  title: [String],
  message: [String],
  conference: {
    type: Schema.Types.ObjectId,
    autopopulate: true,
    ref: 'Conference'
  }
})

News.methods.validateBody = function (body) {
  return (body.title && body.message)
}

News.methods.newBody = function (body) {
  let newBody = {
    title: body.title || undefined,
    conference: body.conference || undefined,
    message: body.message || undefined
  }
  return newBody
}

News.methods.getSortingAttr = function () {
  return 'title.0'
}

News.methods.getRefs = function () {
  return ['Conference']
}

News.plugin(autopopulate)

mongoose.model('News', News)
