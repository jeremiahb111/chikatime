import { Router } from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { catchAsync } from '../utils/catchAsync.js'
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js'

const router = Router()

router.use(protectRoute)

router.get('/users', catchAsync(getUsersForSidebar))
router.get('/:id', catchAsync(getMessages))
router.post('/:id/send', catchAsync(sendMessage))

export default router