import { Router } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validateRequest.js";
import { loginSchema, signupSchema, updateProfileSchema } from "../schema/auth.schema.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.post('/signup', validate(signupSchema), catchAsync(signup))
router.post('/login', validate(loginSchema), catchAsync(login))
router.post('/logout', catchAsync(logout))

router.put('/update-profile', protectRoute, validate(updateProfileSchema), catchAsync(updateProfile))
router.get('/check', protectRoute, catchAsync(checkAuth))

export default router;