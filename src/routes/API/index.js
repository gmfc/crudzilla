import { Router } from 'express'
import mongoose from 'mongoose'
const routes = Router()

const entitys = {
  Afiliation: mongoose.model('Afiliation'),
  Conference: mongoose.model('Conference'),
  Event: mongoose.model('Event'),
  Host: mongoose.model('Host'),
  Local: mongoose.model('Local'),
  LocalCategory: mongoose.model('LocalCategory'),
  News: mongoose.model('News'),
  Role: mongoose.model('Role'),
  Session: mongoose.model('Session'),
  SessionCategory: mongoose.model('SessionCategory'),
  Work: mongoose.model('Work'),
  WorkCategory: mongoose.model('WorkCategory'),
  Hotel: mongoose.model('Hotel')
}

/**
 * List All
 */
routes.get('/:entityName', async (req, res, next) => {
  let entityName = req.params.entityName
  let list = await entitys[entityName].find({}).exec()
  res.json(list)
})

/**
 * READ
 */
routes.get('/:entityName/:id', async (req, res) => {
  let entityName = req.params.entityName
  let id = req.params.id
  let entity = await entitys[entityName].findOne({_id: id}).exec()
  res.json(entity)
})

// TODO: esplicar essa coisa
const flatMap = async (f, arr) => arr.reduce((x, y) => [...x, ...f(y)], [])

/*
 * obtém todos os trabalhos de uma dada conferência
 */
routes.get('/Conference/:confID/Works', async (req, res) => {
  let confID = req.params.confID // Id da conferencia
  let eventList = await entitys.Event.find({conference: confID}).exec() // pega todos os eventos da conferencia
  let sessList = await entitys.Session.find({event: eventList}, 'works').exec() // pega todas as sessoes de todos os eventos, retornando somente o attr 'works'
  let workListIds = await flatMap(x => x, sessList.map(e => e.works)) // FlatMap a patriz de works
  let workList = await entitys.Work.find({_id: workListIds}).exec() // seleciona todos os works que estao na lista de workIds
  res.json(workList)
})

/*
 * obtém todos os trabalhos de um dado evento
 */
routes.get('/Event/:eventID/Works', async (req, res) => {
  let eventID = req.params.eventID
  let sessList = await entitys.Session.find({event: eventID}, 'works').exec()
  let workListIds = await flatMap(x => x, sessList.map(e => e.works))
  let workList = await entitys.Work.find({_id: workListIds}).exec()
  res.json(workList)
})

/*
 * obtém todas as sessões de dada conferência
 */
routes.get('/Conference/:confID/Sessions', async (req, res) => {
  let confID = req.params.confID
  let eventList = await entitys.Event.find({conference: confID}).exec()
  let sessList = await entitys.Session.find({event: eventList}).sort({dateStart: 1, timeStart: 1}).exec()
  res.json(sessList)
})

/*
 * obtém todas as sessões de dado evento
 */
routes.get('/Event/:eventID/Sessions', async (req, res) => {
  let eventID = req.params.eventID
  let sessList = await entitys.Session.find({event: eventID}).sort({dateStart: 1, timeStart: 1}).exec()
  res.json(sessList)
})

/*
 * obtém todos os eventos de dada conferência
 */
routes.get('/Conference/:confID/Events', async (req, res) => {
  let confID = req.params.confID
  let eventList = await entitys.Event.find({conference: confID}).exec()
  res.json(eventList)
})

/*
 * obtém todos os locais de dada conferência usados em sessões
 */
routes.get('/Conference/:confID/Locals', async (req, res) => {
  let confID = req.params.confID // Id da conferencia
  let eventList = await entitys.Event.find({conference: confID}).exec() // pega todos os eventos da conferencia
  let sessList = await entitys.Session.find({event: eventList}, 'local').exec() // pega todas as sessoes de todos os eventos, retornando somente o attr 'works'
  let localIdList = await sessList.map(e => e.local)
  let localList = await entitys.Local.find({_id: localIdList}).exec()
  res.json(localList)
})

/*
 * obtém todas as mensagens de dada conferência
 */
routes.get('/Conference/:confID/News', async (req, res) => {
  let confID = req.params.confID
  let newsList = await entitys.News.find({conference: confID}).exec()
  res.json(newsList)
})

export default routes
