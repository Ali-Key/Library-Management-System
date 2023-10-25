// Setup Sign up and Login API for Admin
import express from "express";
import prisma from "./lib/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const SECRET_KEY = "secret_Key";
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingStaff = await prisma.staff.findUnique({
      where: {
        email: email,
      },
    });

    if (existingStaff) {
      return res
        .status(409)
        .json({ status: 409, message: "Staff already exists" });
    }

    const hashePassword = await bcrypt.hash(password, 10);

    const newOwner = await prisma.staff.create({
      data: {
        name: name,
        email: email,
        adminId: adminId,
        password: hashePassword,
      },
    });

    res
      .status(201)
      .json({ status: 201, message: "Staff created successFully", newOwner });
  } catch (error) {
    res
      .status(500)
      .json({
        status: 500,
        message: "Something went wrong",
        error: error.message,
      });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingStaff = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingStaff) {
      return res.status(404).json({ status: 404, message: "Staff not found" });
    }

    const isCorrectPassword = bcrypt.compare(password, existingStaff.password);

    if (!isCorrectPassword) {
      return res
        .status(401)
        .json({ status: 401, message: "Password is not correct" });
    }

    const token = jwt.sign(
      { id: existingStaff.id, email: existingStaff.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ status: 200, message: "Staff logged in successfully", token });
  } catch (error) {
    res
      .status(500)
      .json({
        status: 500,
        message: "Something went wrong",
        error: error.message,
      });
  }
});

export default router;
