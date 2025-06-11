import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'chat_db'
    })

    console.log(`MongoDB Connected: ${connect.connection.host}`)
  } catch (error) {
    console.log(`Error while connecting to DB: ${error}`)
    process.exit(1)
  }
}