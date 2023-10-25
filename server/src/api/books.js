// Create endpoints for books, make sure to use the middleware to authenticate the token
import express from "express";
import prisma from "./lib/index.js";
import authenticate from "./middleware/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    if (books.length === 0) {
      return res.status(404).json({ status: 404, message: "Books not found!" });
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!book) {
      return res.status(404).json({ status: 404, message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.post("/", authenticate, async (req, res) => {
  const { title, author, isAvailable, dueDate } = req.body;

  try {
    const newBook = await prisma.book.create({
      data: {
        title: title,
        author: author,
        is_available: isAvailable,
        due_date: dueDate,
      },
    });

    if (!newBook) {
      return res
        .status(400)
        .json({ status: 400, message: "Book was not created!" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Book successfully created!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});


router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, author, isAvailable, dueDate } = req.body;

  try {
    const updatedBook = await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        author: author,
        is_available: isAvailable,
        due_date: dueDate,
      },
    });

    if (!updatedBook) {
      return res
        .status(400)
        .json({ status: 400, message: "Book was not updated!" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Book successfully updated!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}
);


router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await prisma.book.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedBook) {
      return res
        .status(400)
        .json({ status: 400, message: "Book was not deleted!" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Book successfully deleted!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});










export default router;
