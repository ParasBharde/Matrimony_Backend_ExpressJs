import express from 'express';
import { config } from 'dotenv';
import multer, { diskStorage } from 'multer';
import { mkdirSync } from 'fs';
import uploadCloudinary from '../utils/cloudinary.js';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

config();

const profileImgRouter = express();

const storage = diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = "./uploads";
        mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-")
            + file.originalname);
    }
});

const upload = multer({ storage });
profileImgRouter.post('/upload', upload.single('file'), async (req, res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())
    try {
        const localFilePath = req.file.path;
        const response = await uploadCloudinary(localFilePath);
        const id = req.body.id
        console.log('response',response)
        const datas = await prisma.profile_Image.create({
            data: {
                profile_img_url: response?.url,
                profile_img_publicId: response?.public_id,
                userProfileId: Number(id)
            }
        })
        if (!datas) {
            throw new Error("Failed to upload image")
        } else {
            res.json({
                message: "Image Upload Successfully",
                url: response.url
            });
        }

    } catch (e) {
        console.log(e)
    }
});

export default profileImgRouter
