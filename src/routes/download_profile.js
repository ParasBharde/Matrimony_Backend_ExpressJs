import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
const downloadProfileRouter = express()


downloadProfileRouter.post('/',authMiddleware, async(req,res)=>{
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const userDetails = req.user
    const { downloadProfileId } = req.body
    
    const response = await prisma.download_Profile.create({
        data: {
            userId: userDetails,
            download_profile_id: Number(downloadProfileId)
        }
    })

    if (response) {
        res.status(200).json({
            message: "Dowload Successfully"
        })
    } else {
        res.status(400).json({
            message: "not download"
        })
    }
})

downloadProfileRouter.get('/',authMiddleware, async(req,res)=> {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const userDetails = req.user;
        const getDownloadProfile = await prisma.download_Profile.findMany({
            where: {
                user_id: userDetails
            },
            select: {
                download_profile_id: true,
            }
        })
        if (getDownloadProfile.length === 0) {
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

export default downloadProfileRouter