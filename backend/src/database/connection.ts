import mongoose from 'mongoose'
import config from '../utils/config'

mongoose.connect("mongodb://localhost/jsamazona", {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
export default db