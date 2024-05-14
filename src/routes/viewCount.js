import express from 'express'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import authMiddleware from '../middleware/authMiddleware.js';

const viewCountRouter = express()

viewCountRouter.post('/', authMiddleware, async (req, res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const userDetails = req.user
        const { view_profileId } = req.body

        let count = 0

        const findData = await prisma.view_Count.findFirst({
            where: {
                userId: userDetails
            }
        })

        if (findData?.userId === userDetails && findData?.view_profileId === view_profileId) {
            return res.status(200).json({
                message: "Already Viewed"
            })

        } else if (userDetails === view_profileId) {
            return res.status(200).json({
                message: "Not liked"
            })
        }
        else {
            const response = await prisma.view_Count.create({
                data: {
                    count: count + 1,
                    userId: userDetails,
                    view_profileId: parseInt(view_profileId),
                }
            })
            if (response) {
                return res.status(200).json({
                    message: "View count increased"
                })
            } else {
                return res.status(400).json({
                    message: "Failed to increase view count"
                })
            }
        }

    } catch (error) {
        console.error('Error updating view count:', error);
        return res.status(500).json({
            message: "Internal server error"
        });
    } finally {
        await prisma.$disconnect();
    }
})

// how many profile viewed by user
viewCountRouter.get('/', authMiddleware, async (req, res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const userDetails = req.user
   

    const response = await prisma.view_Count.findMany({
        where: {
            userId: userDetails
        },
        select: {
            count: true
        }
    })

    const totalCount = response.reduce((acc, obj) => acc + obj.count, 0);
    console.log('response', totalCount)
    res.send({ totalCount: totalCount })
})

// For profiled viewed count
viewCountRouter.get('/:id', async (req, res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const userDetails = req.user
    const { id } = req.params
    console.log('id', id)

    const response = await prisma.view_Count.findMany({
        where: {
            view_profileId: parseInt(id)
        },
        select:{
            view_profileId: true
        }
    })
    res.send({ totalCount: response.length })

})

export default viewCountRouter

