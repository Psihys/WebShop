require('dotenv').config()
const models = require('./models/models') // Import models to create tables in db
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(cors({
  origin: 'http://localhost:3000', // Укажите адрес вашего фронтенда
}));
app.use(express.json()) // Parse JSON bodies
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // максимальний розмір файлу 50MB
    createParentPath: true, // створює батьківську папку для файлів
  })
)
app.use('/api', router)

app.use(errorHandler) // Error handling middleware

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
