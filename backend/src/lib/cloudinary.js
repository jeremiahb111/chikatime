import { v2 as cloudinary } from 'cloudinary'
import { config } from 'dotenv'

config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImage = async (file, folder) => {
  const res = await cloudinary.uploader.upload(file, {
    folder: `chat-app/${folder}`
  })

  return res.secure_url
}

export const deleteImage = async (fileName, folder) => {
  await cloudinary.uploader.destroy(`chat-app/${folder}/${fileName}`)
}