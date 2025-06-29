import { use, useEffect, useRef } from "react"
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import MessageSkeleton from "./skeletons/MessageSkeleton"
import { useAuthStore } from "../store/useAuthStore"
import { format } from "date-fns"

const ChatContainer = () => {
  const { getMessages, messages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeToMessages } = useChatStore()
  const { authUser } = useAuthStore()
  const messagesRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages()

    return () => {
      unsubscribeToMessages()
    }
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessages])

  useEffect(() => {
    const container = messagesRef.current
    container.scrollTop = container.scrollHeight
  }, [messages])

  if (isMessagesLoading) {
    return <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" ref={messagesRef}>
        {messages.map(message => (
          <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={message.senderId === authUser._id ? authUser.profilePic : selectedUser.profilePic} alt="Profile" />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{format(message.createdAt, 'hh:mm a')}</time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-mb mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}
export default ChatContainer