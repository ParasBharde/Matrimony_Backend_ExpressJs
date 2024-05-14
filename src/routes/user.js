import express from 'express'
import { UserLoginSchema } from '../utils/schemaValidation.js'
import { UserSchema } from '../utils/schemaValidation.js'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import hashPassword from '../utils/hashPassword.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express()

userRouter.post('/signup', async (req, res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await req.body;
    const response = UserSchema.safeParse(body)
    console.log(response)
    const { success } = UserSchema.safeParse(body);
    if (!success) {
        return res.json({ message: 'Invalid Output' })
    } else {
        const checkUsername = await prisma?.user.findUnique({ where: { username: body.username } });
        if (checkUsername) {
            res.status(409)
            return res.json({ message: 'Email ALready  Exists.' })
        } else {
            const hashedPassword = await hashPassword(body.password);
            const fromData = await prisma.user.create({
                data: {
                    username: body.username,
                    password: hashedPassword,
                    isAdmin: body.isAdmin,
                    first_name: body.first_name,
                    middle_name: body.middle_name,
                    last_name: body.last_name,
                    gender: body.gender,
                    dob: body.dob,
                    age: body.age,
                    contact_number: body.contact_number,
                    address_1: body.address_1,
                    address_2: body.address_2,
                    city: body.city,
                    height: body.height,
                    weight: body.weight,
                    color: body.color,
                    religion: body.religion,
                    cast_or_community: body.cast_or_community,
                    mother_tongue: body.mother_tongue,
                    marital_status: body.marital_status,
                    dietary_preference: body.dietary_preference,
                    occupation: body.occupation,
                    income: body.income,
                    father_name: body.father_name,
                    mother_name: body.mother_name,
                    mother_occupation: body.mother_occupation,
                    father_occupation: body.father_occupation,
                    mother_native: body.mother_native,
                    father_native: body.father_native,
                    family_contact_no: body.family_contact_no,
                    number_of_siblings: body.number_of_siblings,
                    brother: body.brother,
                    sister: body.sister,
                    father: body.father,
                    mother: body.mother,
                    zodiac_sign: body.zodiac_sign,
                    birth_time: body.birth_time,
                    birth_place: body.birth_place
                }
            })
            if (!fromData) {
                throw new Error("Failed to create user")
            }
            else {
                return res.json({ data: fromData })
            }
        }

    }
})

userRouter.post('/signin', async (req, res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await req.body
    const { success } = UserLoginSchema.safeParse(body)
    if (!success) {
        res.status(401)
        return res.json("Input worngs")
    } else {
        try {
            const checkUser = await prisma.user.findUnique({
                where: {
                    username: body.username,
                }
            })
            if (!checkUser) {
                return res.json({ message: "Username not found" })
            }
            const isPasswordValid = await bcrypt.compare(body.password, checkUser.password);

            if (isPasswordValid) {
                const jwtoken = jwt.sign({ id: checkUser?.id, username: checkUser?.username }, process.env?.JWT_SECRET, { expiresIn: '1h' })
                return res.json({
                    message: "Login Successfully",
                    token: jwtoken
                })
            } else {
                res.status(403)
                return res.json({ message: "Password  wrong" })
            }
        } catch (e) {
            return res.json(e)
        }
    }

})

userRouter.get('/userDetails', authMiddleware, async (req, res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())
    const userDetails = req.user;
    console.log('userDetails', userDetails)

    const data = await prisma.user.findFirst({
        where: {
            id: userDetails
        },
        include: {
            liked_profile: true,
            download_profile: true,
            profile_img: true,
            horoscope_img: true
        },
 
    })

    res.json({ data });
});

userRouter.get('/all', async (req,res) => {
    const prisma = new PrismaClient({
        datasourceUrl: process.env?.DATABASE_URL
    }).$extends(withAccelerate())

    const response = await prisma.user.findMany({
        include:{
            profile_img:true,
            horoscope_img:true,
            liked_profile: true,
            download_profile: true
        }
    })
    res.send({data:response})
})


export default userRouter