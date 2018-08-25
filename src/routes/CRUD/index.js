/*
 * CRUD
 */

// TODO: colocar os populates em cada Model, no evento onFind

import { Router } from 'express'
import mongoose from 'mongoose'
import AUTH from '../../AUTH'

const routes = Router()

const entitys = {
  Afiliation: mongoose.model('Afiliation'),
  Conference: mongoose.model('Conference'),
  Event: mongoose.model('Event'),
  Host: mongoose.model('Host'),
  Local: mongoose.model('Local'),
  LocalCategory: mongoose.model('LocalCategory'),
  WorkCategory: mongoose.model('WorkCategory'),
  News: mongoose.model('News'),
  Role: mongoose.model('Role'),
  Session: mongoose.model('Session'),
  SessionCategory: mongoose.model('SessionCategory'),
  Work: mongoose.model('Work'),
  Hotel: mongoose.model('Hotel')
}

/**
 * List All
 */
routes.get('/l/:entityName', AUTH, async (req, res, next) => {
  let entityName = req.params.entityName
  let list = await entitys[entityName].find({})
    .exec()
  res.render('CRUD/lists/list_' + entityName, {
    sess: req.session,
    title: 'Listagem de ' + entityName,
    entityName: entityName,
    list: list
  })
})

/**
 * CREATE
 */
routes.get('/c/:entityName', AUTH, async (req, res) => {
  let entityName = req.params.entityName
  let refData = {}
  for (let i = 0; i < new entitys[entityName]().getRefs().length; i++) {
    const entityToQuery = new entitys[entityName]().getRefs()[i]
    const sortingAttr = new entitys[entityToQuery]().getSortingAttr()
    refData[entityToQuery] = await entitys[entityToQuery].find({})
      .sort(sortingAttr)
      .exec()
  }
  res.render('CRUD/forms/' + entityName, {
    sess: req.session,
    title: 'Criar ' + entityName,
    entityName: entityName,
    refData: refData
  })
}).post('/c/:entityName', AUTH, async (req, res) => {
  let body = req.body
  let entityName = req.params.entityName
  let valid = new entitys[entityName]().validateBody(body)
  if (valid) {
    let newEntity = new entitys[entityName](body)
    await newEntity.save()
    res.redirect('/crud/l/' + entityName)
  } else {
    res.render('CRUD/forms/' + entityName, {
      sess: req.session,
      title: 'Criar ' + entityName,
      entityName: entityName,
      msg: 'nao valido'
    })
  }
})

/**
 * READ
 */
routes.get('/r/:entityName/:id', AUTH, async (req, res) => {
  let entityName = req.params.entityName
  let id = req.params.id
  let refData = {}
  for (let i = 0; i < new entitys[entityName]().getRefs().length; i++) {
    const entityToQuery = new entitys[entityName]().getRefs()[i]
    const sortingAttr = new entitys[entityToQuery]().getSortingAttr()
    refData[entityToQuery] = await entitys[entityToQuery].find({})
      .sort(sortingAttr)
      .exec()
  }
  let entity = await entitys[entityName]
    .findOne({
      _id: id
    })
    .exec()
  res.render('CRUD/forms/' + entityName, {
    sess: req.session,
    title: 'Detalhes de ' + entityName,
    entityName: entityName,
    refData: refData,
    entity: entity
  })
})

/**
 * UPDATE
 */
routes.post('/u/:entityName/:id', AUTH, async (req, res) => {
  let body = req.body
  let entityName = req.params.entityName
  let id = req.params.id
  let valid = new entitys[entityName]().validateBody(body)
  if (valid) {
    let newBody = new entitys[entityName]().newBody(body)
    await entitys[entityName].update({
      _id: id
    }, newBody).exec()
    res.redirect('/crud/r/' + entityName + '/' + id)
  } else {
    let entity = await entitys[entityName]
      .findOne({
        _id: id
      })
      .exec()
    res.render('CRUD/forms/' + entityName, {
      sess: req.session,
      title: 'Criar ' + entityName,
      entityName: entityName,
      entity: entity,
      msg: 'nao valido'
    })
  }
})

/**
 * DELETE
 */
routes.post('/d/:entityName/:id', AUTH, async (req, res) => {
  let entityName = req.params.entityName
  let id = req.params.id
  await entitys[entityName].deleteOne({
    _id: id
  }).exec()
  res.redirect('/crud/l/' + entityName)
})

export default routes
