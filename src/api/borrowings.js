// Create endpoints for books, make sure to use the middleware to authenticateAdmin the token
import express from "express";
import prisma from "./lib/index.js";
import authenticateAdmin from "./middleware/admin.js";


const router = express.Router();

// get all borrowing customer or books
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const borrowing = await prisma.borrowing.findMany();
    if (borrowing.length === 0) {
      return res.status(404).json({ status: 404, message: "Borrowing not found!" });
    }

    res.json(borrowing);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

// get by id
router.get("/:id" , authenticateAdmin,async (req, res) => {
  try {
    const { id } = req.params;

    const borrowing = await prisma.borrowing.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!borrowing) {
      return res.status(404).json({ status: 404, message: "Borrowing not found" });
    }

    res.json(borrowing);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

// create a new borrowing
router.post("/", authenticateAdmin, async (req, res) => {
  const {
    bookId     ,
    customerId ,
    borrowedAt ,
    returnedAt } = req.body;

  try {
    const newBorrowing = await prisma.borrowing.create({
      data: {
        bookId:  bookId  ,
        customerId: customerId ,
        borrowedAt: borrowedAt ,
        returnedAt: returnedAt,
      },
    });

    if (!newBorrowing) {
      return res
        .status(400)
        .json({ status: 400, message: "Borrowing was not created!" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Borrowing successfully created!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.put("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { bookId, customerId, borrowedAt, returnedAt  } = req.body;

  try {
    const updatedBorrowing = await prisma.borrowing.update({
      where: {
        id: Number(id),
      },
      data: {
        bookId:  bookId  ,
        customerId: customerId ,
        borrowedAt: borrowedAt ,
        returnedAt: returnedAt,
      },
    });

    if (!updatedBorrowing) {
      return res
        .status(400)
        .json({ status: 400, message: "Borrowing was not updated!" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Borrowing successfully updated!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.delete("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBorrowing = await prisma.borrowing.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedBorrowing) {
      return res
        .status(400)
        .json({ status: 400, message: "Borrowing was not deleted!" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Borrowing successfully deleted!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

export default router;
