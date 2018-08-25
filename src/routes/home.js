import { Router } from 'express'
import AUTH from '../AUTH'
import mongoose from 'mongoose'

const User = mongoose.model('User')
const routes = Router()

/**
 * GET home page
 */
routes.get('/', AUTH, (req, res) => {
  res.render('index', {
    sess: req.session,
    title: 'Home'
  })
})

/**
 * GET login page
 */
routes.get('/login', (req, res) => {
  res.render('login', { sess: req.session, title: 'Login' })
}).post('/login', async (req, res, next) => {
  let username = req.body.username
  let password = req.body.pws

  try {
    let user = await User.findOne({
      username: username
    }).exec()
    if (user && user.checkPassword(password)) {
      req.session.logged = true
      // req.session.user = user.getSessionData()
      req.session.save()
      res.redirect('/')
    } else {
      res.render('login', {
        sess: req.session,
        titulo: 'Index',
        msg: 'Nao foi possivel logar'
      })
    }
  } catch (err) {
    next(err)
  }
})

/**
 * GET register page
 */
routes.get('/register', async (req, res) => {
  res.render('register', { sess: req.session, title: 'Registro' })
}).post('/register', async (req, res, next) => {
  let body = req.body
  let username = body.username
  let token = body.token
  if (token !== 'lfs12345!@#$%') {
    res.render('register', { sess: req.session, title: 'Registro', msg: 'Token errado' })
  } else {
    let password = (body.pws && (body.pws === body.pws2)) ? body.pws : undefined
    let user = new User({
      username: username,
      password: password
    })
    try {
      await user.save()
      res.redirect('/')
    } catch (err) {
      res.render('register', { sess: req.session, title: 'Registro', msg: 'Dados invalidos' })
    }
  }
})

routes.get('/logout', AUTH, (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err)
    }
    res.redirect('/')
  })
})

export default routes
