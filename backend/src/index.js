import epxress from 'express'
import cookieParser from 'cookie-parser'
import consoleStamp from 'console-stamp'
import cors from 'cors'
import { config } from 'dotenv'

import { errorHandler } from './middleware/errorHandler.js'
import { connectDB } from './lib/db.js'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { app, server } from './lib/socket.js'

config()
consoleStamp(console, { format: ':date(mm/dd/yyyy HH:MM:ss):label' })

const PORT = process.env.PORT

app.use(epxress.json({ limit: '3mb' }))
app.use(epxress.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

app.use(errorHandler)

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
  await connectDB()
})