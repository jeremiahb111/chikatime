import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Eye, EyeClosed, EyeOff, Loader, Lock, Mail, MessageSquare, User } from "lucide-react"
import { Link } from "react-router-dom"
import AuthImagePattern from "../components/AuthImagePattern"
import toast from "react-hot-toast"

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const { signup, isSigningup } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full name is required')
    if (!formData.email.trim()) return toast.error('Email is required')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error('Please enter a valid email address')
    if (!formData.password.trim()) return toast.error('Password is required')
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters long')

    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => {
      return { ...prevData, [name]: value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = validateForm()

    if (success === true) {
      signup(formData)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">Get started with your free account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                  value={formData.fullName}
                  placeholder="John Doe"
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="john.doe@gmail.com"
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            <div className="form-control space-y-1">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="******"
                  className="input input-bordered w-full pl-10"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-10" onClick={() => setShowPassword(!showPassword)} >
                  {
                    !showPassword ? (
                      <EyeOff className="size-5 text-base-content/40 hover:cursor-pointer" />
                    ) : (
                      <Eye className="size-5 text-base-content/40 hover:cursor-pointer" />
                    )}
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSigningup}>
              {isSigningup ? (
                <>
                  <Loader className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                'Create Accout'
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account? {' '}
              <Link to="/login" className="link link-primary">Login</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments and stay in touch with your loved ones."
      />
    </div>
  )
}
export default SignupPage