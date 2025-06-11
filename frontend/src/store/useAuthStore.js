import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client"

const BASE_URL = "/"

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningup: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check")
      set({ authUser: res.data.data, isCheckingAuth: false })
      get().connectSocket()
    } catch (error) {
      console.log(error.message)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  signup: async (formData) => {
    set({ isSigningup: true })
    try {
      const res = await axiosInstance.post("/auth/signup", formData)
      set({ authUser: res.data.data })
      toast.success(res.data.message)
    } catch (error) {
      set({ authUser: null })
      const errorCount = error?.response.data?.errors?.length
      let message = ""
      if (errorCount) {
        if (errorCount === 3) {
          message = 'All fields are required'
        } else {
          message = error.response.data.errors[0].message
        }
      } else {
        message = error.response.data.message
      }
      toast.error(message)
    } finally {
      set({ isSigningup: false })
    }
  },
  login: async (formData) => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post("/auth/login", formData)
      set({ authUser: res.data.data })
      get().connectSocket()
      toast.success(res.data.message)
    } catch (error) {
      set({ authUser: null })
      console.log(error.response.data)
      const errorCount = error?.response.data?.errors?.length
      let message = ""
      if (errorCount) {
        if (errorCount === 2) {
          message = 'All fields are required'
        } else {
          message = error.response.data.errors[0].message
        }
      } else {
        message = error.response.data.message
      }
      toast.error(message)
    } finally {
      set({ isLoggingIn: false })
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout")
      set({ authUser: null })
      get().disconnectSocket()
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.message)
    }
  },
  updateProfile: async (profilePic) => {
    set({ isUpdatingProfile: true })
    try {
      const res = await axiosInstance.put("/auth/update-profile", profilePic)
      set({ authUser: res.data.data })
      toast.success(res.data.message)
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message)
    } finally {
      set({ isUpdatingProfile: false })
    }
  },
  connectSocket: () => {
    const { authUser } = get()
    if (!authUser || get().socket?.connected) return

    const socket = io(BASE_URL, {
      reconnectionAttempts: 5,
      timeout: 2000,
      query: {
        userId: authUser._id
      }
    })
    socket.connect()
    set({ socket })

    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users })
    })
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect()
  }
}))