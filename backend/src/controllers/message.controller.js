import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import { StatusCodes } from "http-status-codes"
import { uploadImage } from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js"

export const getUsersForSidebar = async (req, res, next) => {
  const user = req.user

  const users = await User.find({ _id: { $ne: user._id } }).select('-password')

  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'Users fetched successfully',
    data: users
  })
}

export const getMessages = async (req, res, next) => {
  const { id } = req.params
  const user = req.user

  const messages = await Message.find({
    $or: [{ senderId: user._id, receiverId: id }, { senderId: id, receiverId: user._id }]
  })

  return res.status(StatusCodes.OK).json({
    success: true,
    message: 'Messages fetched successfully',
    data: messages
  })
}

export const sendMessage = async (req, res, next) => {
  const user = req.user
  const { id } = req.params
  const { text, image } = req.body

  const newMessage = new Message({ senderId: user._id, receiverId: id, text })

  if (image) {
    const img = await uploadImage(image, "message-pic")
    newMessage.image = img
  }

  await newMessage.save()

  const receiverSocketId = getReceiverSocketId(id)

  if (receiverSocketId) {
    // Send message to receiver
    io.to(receiverSocketId).emit("newMessage", newMessage)
  }

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Message sent successfully',
    data: newMessage
  })
} 