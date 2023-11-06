// Create endpoints for books, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticateCustomer from "./middleware/customer.js";

const router = express.Router();



router.post("/", authenticateCustomer, async (req, res) => {
  try {
    const { borrowingId, amount , status } = req.body;

    const lateCharge = await prisma.transaction.create({
      data: {
        borrowingId: borrowingId,
        amount: amount,
        status: status,
      },
    });

    if (!lateCharge) {
      return res
        .status(400)
        .json({ status: 400, messsage: "lateCharge was not created!" });
    }

    res
      .status(200)
      .json({ status: 200, message: "lateCharge successFully created!" , newBook });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});





export default router;
