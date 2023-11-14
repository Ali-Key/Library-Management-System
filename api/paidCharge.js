import express from "express";
import prisma from "./lib/index.js";
import authenticateCustomer from "./middleware/customer.js";

const router = express.Router();

// GET all paidCharges
router.get("/", authenticateCustomer, async (req, res) => {
  try {
    const paidCharges = await prisma.transaction.findMany();
    if (paidCharges.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "paidCharges not found!" });
    }

    res.json(paidCharges);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// GET a single paidCharge

router.get("/:id", authenticateCustomer, async (req, res) => {
  try {
    const { id } = req.params;

    const paidCharge = await prisma.transaction.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!paidCharge) {
      return res
        .status(404)
        .json({ status: 404, message: "paidCharge not found" });
    }

    res.json(paidCharge);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});


// Update paid charges for customer
router.put("/:id", authenticateCustomer, async (req, res) => {
  try {
    const {id} = req.params;
    const { borrowingId, amount, status } = req.body;

    const updatePaidCharge = await prisma.transaction.update({
      where: {
        id: Number(id),
      },
      data: {
        borrowingId: borrowingId,
        amount: amount,
        status: status,
      },
    });

    if (!updatePaidCharge) {
      return res
        .status(400)
        .json({ status: 400, messsage: "paidCharge was not updated!" , updatePaidCharge });
    }

    res
      .status(200)
      .json({ status: 200, message: "paidCharge updated" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

export default router;
