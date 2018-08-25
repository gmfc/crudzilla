import express from 'express'
import session from 'express-session'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import hbs from 'hbs'
import cors from 'cors'

import './models'

// routes
import home from './routes/home'
import CRUD from './routes/CRUD'
import API from './routes/API'

// helper
import langHelper from './views/helpers/lang'
import equals from './views/helpers/equals'
// import dateFormat from './views/helpers/dateFormat'
// hbs.registerHelper('dateFormat', dateFormat)
hbs.registerHelper('lang', langHelper)
hbs.registerHelper('equals', equals)
hbs.registerPartials(path.join(__dirname, './views/partials'))

const app = express()
app.disable('x-powered-by')
app.use(helmet())
app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// View engine setup
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(express.static(path.join(__dirname, '../public')))

//CORS
app.use(cors())

// Routes
app.use('/', home)
app.use('/crud', CRUD)
app.use('/api', API)

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    })
})

export default app
