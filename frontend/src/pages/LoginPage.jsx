import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"
import AuthImagePattern from "../components/AuthImagePattern"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { login, isLoggingIn } = useAuthStore()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => {
      return { ...prevData, [name]: value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  return <div className="h-screen grid lg:grid-cols-2">
    {/* Left Side - Form */}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
            >
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60">Sign in to your account</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10`}
                placeholder="you@example.com"
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center hover:cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>

    {/* Right Side - Image/Pattern */}
    <AuthImagePattern
      title={"Welcome back!"}
      subtitle={"Sign in to continue your conversations and catch up with your messages."}
    />
  </div>
}
export default LoginPage