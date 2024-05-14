import express from 'express'
import profileRouter from './profile.js'
import userRouter from './user.js'
import authMiddleware from '../middleware/authMiddleware.js'
import profileImgRouter from './user_profileImg.js'
import profileHoroscopeRouter from './user_horoscope.js'
import subscriptionPlanRouter from './sub_plan.js'
import likedProfileRouter from './liked_profile.js'
import downloadProfileRouter from './download_profile.js'
import viewCountRouter from './viewCount.js'

 const mainRouter = express()


mainRouter.use('/profile',authMiddleware, profileRouter)
mainRouter.use('/user-cred', userRouter)
mainRouter.use('/profile-img',authMiddleware, profileImgRouter)
mainRouter.use('/horoscope-img', profileHoroscopeRouter)
mainRouter.use('/sub-plan', subscriptionPlanRouter)
mainRouter.use('/liked-profile', likedProfileRouter)
mainRouter.use('/download-profile', downloadProfileRouter)
mainRouter.use('/view-count', viewCountRouter)




export default mainRouter