require('dotenv').config()
const models = require('./models/models') // Import models to create tables in db
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json()) // Parse JSON bodies


const start = async () => {
  try {
    await sequelize.authenticate() //conect to db
    await sequelize.sync()
    console.log('Connection has been established successfully.')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

start()
