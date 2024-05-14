import express from 'express';
import uploadCloudinary from '../utils/cloudinary.js';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { ProfileSchema } from '../utils/schemaValidation.js';


const profileRouter = express();

profileRouter.get('/', async (req,res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const response = await prisma.user.findMany({})
    return res.json({data: response})
})

profileRouter.get('/:id', async (req,res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())
console.log(parseInt(req.params.id))
    const response = await prisma.user.findFirst({
        where:{
            id: parseInt(req.params.id)
        }
    })
    if (!response){
        return res.status(404).json({message: "User not found"})
    }
    return res.json({data: response})
})

export default profileRouter
