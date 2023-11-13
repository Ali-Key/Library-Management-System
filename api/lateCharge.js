// Create endpoints for lateCharge, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticateAdmin from "./middleware/admin.js";

const router = express.Router();

// GET all lateCharges
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const lateCharges = await prisma.transaction.findMany();
    if (lateCharges.length === 0) {
      return res.status(404).json({ status: 404, message: "lateCharges not found!" });
    }

    res.json(lateCharges);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// GET a single lateCharge
router.get("/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const lateCharge = await prisma.transaction.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!lateCharge) {
      return res.status(404).json({ status: 404, message: "lateCharge not found" });
    }

    res.json(lateCharge);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});


// Create a new lateCharge
router.post("/", authenticateAdmin, async (req, res) => {
  try {
    const { borrowingId, amount , status } = req.body;

    const newLateCharge = await prisma.transaction.create({
      data: {
        borrowingId: borrowingId,
        amount: amount,
        status: status,
      },
    });
    if (!newLateCharge) {
      return res
        .status(400)
        .json({ status: 400, messsage: "lateCharge was not created!"  });
    }
    res
      .status(200)
      .json({ status: 200, message: "lateCharge successFully created!"  });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});





export default router;
