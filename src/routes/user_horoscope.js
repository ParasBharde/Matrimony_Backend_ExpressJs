import express from 'express';
import { config } from 'dotenv';
import multer, { diskStorage } from 'multer';
import { mkdirSync } from 'fs';
import uploadCloudinary from '../utils/cloudinary.js';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { error } from 'console';

config();

const profileHoroscopeRouter = express();

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
profileHoroscopeRouter.post('/', upload.array('file'), async (req, res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const localFilePath = req.files;
    const id = Number(req.body.id)
    const uploadedImages = [];
    try {
        for (const file of localFilePath) {
            const { path } = file;
            const newPath = await uploadCloudinary(path);
            uploadedImages.push(newPath);
        }
        const createdDatas = [];
        for (const pu of uploadedImages) {
            const data = await prisma.horoscopic_Image.create({
                data: {
                    horoscope_img_url: pu?.url,
                    horoscope_img_publicId: pu?.public_id,
                    userHoroscopeImgId: id
                }
            });
            createdDatas.push(data);
        }

        if (createdDatas.length > 0) {
            res.status(200).json({
                message: 'success',
                data: createdDatas
            });
        } else {
            res.status(500).json({
                error: 'Failed to create horoscopic images'
            });
        }

    } catch (e) {
        console.log(e)
    }
});

export default profileHoroscopeRouter




