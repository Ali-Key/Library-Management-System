// Setup Sign up and Login API for Admin
import express from 'express'
import prisma from './lib/index.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import "dotenv/config.js"

const SECRET_KEY = "secret_Key";
const router = express.Router();

// sign up admin 
router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body

    try {
        
        const existingAdmin = await prisma.admin.findUnique({
            where: {
                email: email,
            }
        })

        if(existingAdmin) {
            return res.status(409).json({status: 409, message: "Admin already exists"})
        }

        const hashePassword = await bcrypt.hash(password, 10)

        const newAdmin = await prisma.admin.create({
            data: {
                name: name,
                email: email,
                password: hashePassword
            }
        })

        res.status(201).json({status: 201, message: "Admin created successFully", newAdmin})

    } catch (error) {
        res.status(500).json({status: 500, message: "Something went wrong", error: error.message})
    }
})


// login admin
router.post("/login", async (req, res) => {
    const {email, password} = req.body

    try {
        
        const existingAdmin = await prisma.admin.findUnique({
            where: {
                email: email
            }
        })

        if(!existingAdmin) {
            return res.status(404).json({status: 404, message: "Admin not found"})
        }

        const isCorrectPassword =  bcrypt.compare(password, existingAdmin.password)

        if(!isCorrectPassword) {
            return res.status(401).json({status: 401, message: "Password is not correct"})
        }

        const token = jwt.sign(
            {id: existingAdmin.id, email: existingAdmin.email},
            SECRET_KEY,


            {expiresIn: "7d"}
         
        )

        res.status(200).json({status: 200, message: "Admin logged in successfully", token})

    } catch (error) {
        res.status(500).json({status: 500, message: "Something went wrong", error: error.message})
    }
})

export default router