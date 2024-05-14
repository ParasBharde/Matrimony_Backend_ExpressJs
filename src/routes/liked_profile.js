import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const likedProfileRouter = express()

likedProfileRouter.post('/', authMiddleware, async (req, res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const userDetails = req.user
    const { likedProfileId } = req.body
    if (userDetails === likedProfileId){
        res.status(400).json({
            message: "You can't like your own profile"
        })
        return 
    }
    const response = await prisma.liked_Profile.create({
        data: {
            user_id: userDetails,
            liked_profile_id: Number(likedProfileId)
        }
    })

    if (response) {
        res.status(200).json({
            message: "liked"
        })
    } else {
        res.status(400).json({
            message: "not liked"
        })
    }
})

likedProfileRouter.get('/', authMiddleware, async (req, res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const userDetails = req.user;
        console.log(userDetails)
        const getLikedProfile = await prisma.liked_Profile.findMany({
            where: {
                user_id: userDetails
            },
            select: {
                liked_profile_id: true,
            }
        })
        if (getLikedProfile.length === 0) {
            res.status(400).json({
                message: "no liked profile"
            })
        } else {
            const getProfile = await prisma.user.findMany({
                where: {
                    id: {
                        in: getLikedProfile.map(item => item.liked_profile_id)
                    }
                }
            })
            res.json({ getProfile });
        }
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }

})

export default likedProfileRouter

