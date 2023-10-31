import express from "express";
import prisma from "./lib/index.js";

const router = express.Router();

// get all transactions

router.get("/", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany();
    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "Transactions not found!" });
    }

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// get transaction by id
router.get("/id", async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ status: 404, message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

// create new transaction

router.post("/", async (req, res) => {
  const { borrowingId, amount } = req.body;

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        borrowingId: borrowingId,
        amount: amount,
      },
    });

    if (!newTransaction) {
      return res
        .status(400)
        .json({ status: 400, message: "transaction was not created!" , newTransaction });
    }

    res
      .status(200)
      .json({ status: 200, message: "Transaction created successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

// update transaction
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { borrowingId, amount } = req.body;

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: Number(id),
      },
      data: {
        borrowingId: borrowingId,
        amount: amount,
      },
    });

    if (!updatedTransaction) {
      return res
        .status(400)
        .json({ status: 400, message: "Transaction was not updated!" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Transaction updated successfully" , updatedTransaction });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

// delete transaction
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await prisma.transaction.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedTransaction) {
      return res
        .status(400)
        .json({ status: 400, message: "Transaction was not deleted!" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

export default router;
