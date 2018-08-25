import mongoose from 'mongoose'

import './Afiliation'
import './Conference'
import './Event'
import './Host'
import './Hotel'
import './Local'
import './LocalCategory'
import './News'
import './Role'
import './Session'
import './SessionCategory'
import './WorkCategory'
import './Work'
import './User'
// 32772
mongoose.connect('mongodb://192.168.0.13:32783/eguide')

const db = mongoose.connection

db.on('error', (err) => {
  // throw new Error('unable to connect to database at db', err)
  throw err // new Error('unable to connect to database at db', err)
})
