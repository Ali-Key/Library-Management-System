// import express from 'express';
// import prisma from './lib/index.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import "dotenv/config.js";

// const SECRET_KEY = "secret_Key";
// const router = express.Router();

// router.post('/signup', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const existingCustomer = await prisma.Customer.findUnique({
//             where: {
//                 email: email,
//             }
//         });

//         if (existingCustomer) {
//             return res.status(409).json({ status: 409, message: "Customer already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newCustomer = await prisma.Customer.create({
//             data: {
//                 name: name,
//                 email: "alikey@gmail.com",
//                 password: hashedPassword
//             }
//         });

//         res.status(201).json({ status: 201, message: "Customer created successfully", newCustomer });

//     } catch (error) {
//         res.status(500).json({ status: 500, message: "Something went wrong", error: error.message });
//     }
// });

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const existingCustomer = await prisma.Customer.findUnique({
//             where: {
//                 email: email
//             }
//         });

//         if (!existingCustomer) {
//             return res.status(404).json({ status: 404, message: "Customer not found" });
//         }

//         const isCorrectPassword = await bcrypt.compare(password, existingCustomer.password);

//         if (!isCorrectPassword) {
//             return res.status(401).json({ status: 401, message: "Password is not correct" });
//         }

//         const token = jwt.sign(
//             { id: existingCustomer.id, email: existingCustomer.email },
//             SECRET_KEY,
//             { expiresIn: "1h" }
//         );

//         res.status(200).json({ status: 200, message: "Customer logged in successfully", token });

//     } catch (error) {
//         res.status(500).json({ status: 500, message: "Something went wrong", error: error.message });
//     }
// });

// export default router;
