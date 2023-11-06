import express from "express";
import prisma from "./lib/index.js";
import authenticateCustomer from "./middleware/customer.js";

const router = express.Router();



router.put("/:id", authenticateCustomer, async (req, res) => {
    try {
      const { id } = req.params;
      const {borrowingId , amount  , status } = req.body;
  
      const paidCharge = await prisma.transaction.update({
        where: {
          id: Number(id),
        },
  
        data: {
            borrowingId: borrowingId,
            amount: amount,
            status: status,
        },
      });
  
      if (!paidCharge) {
        return res
          .status(400)
          .json({ status: 400, message: "Book was not updated!" });
      }
  
      res.status(200).json({ status: 200, message: "Book successFully update" , updateBook });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  });

export default router;