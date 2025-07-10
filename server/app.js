import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'

dotenv.config()
const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/carbooking')

app.use('/api/auth', authRoutes)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
