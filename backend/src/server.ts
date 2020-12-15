import express from 'express'
import router from './routes'
import cors from 'cors'
import db from './database/connection'
import path from 'path'

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
});

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.listen(3000, () => console.log('running on localhost:3000'))