import { z } from 'zod'

export const signupSchema = z.object({
  fullName: z.string().min(6, { message: 'Full name must be at least 6 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
})

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email({ message: 'Please enter a valid email address.' }),
  password: z
    .string({ required_error: 'Password is required.' })
    .min(1, { message: 'Password is required.' }),
})

export const updateProfileSchema = z.object({ profilePic: z.string() })