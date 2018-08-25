import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const Schema = mongoose.Schema

const Hotel = new Schema({
  name: String,
  description: [String],
  distance: String,
  individual: String,
  duplo: String,
  triplo: String,
  quadruplo: String
})

Hotel.methods.validateBody = function (body) {
  return (body.name)
}

Hotel.methods.getSortingAttr = function () {
  return 'name'
}

Hotel.methods.newBody = function (body) {
  let newBody = {
    name: body.name || undefined,
    description: body.description || undefined,
    distance: body.distance || undefined,
    individual: body.individual || undefined,
    duplo: body.uplo || undefined,
    triplo: body.triplo || undefined,
    quadruplo: body.quadruplo || undefined
  }
  return (newBody)
}

Hotel.methods.getRefs = function () {
  return []
}

Hotel.plugin(autopopulate)
mongoose.model('Hotel', Hotel)
