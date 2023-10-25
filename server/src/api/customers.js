// import express from "express";
// import prisma from "./lib/index.js";
// import authenticate from "./middleware/index.js";

// const router = express.Router();

// // get all customers

// router.get("/", async (req, res) => {
//   try {
//     const customers = await prisma.customer.findMany();
//     if (customers.length === 0) {
//       return res
//         .status(404)
//         .json({ status: 404, message: "Customers not found!" });
//     }

//     res.json(customers);
//   } catch (error) {
//     res.status(500).json({ status: 500, error: error.message });
//   }
// });

// // get customer by id
// router.get("/id", authenticate, async (req, res) => {
//   try {
//     const { id } = req.params;

//     const customer = await prisma.customer.findUnique({
//       where: {
//         id: Number(id),
//       },
//     });

//     if (!customer) {
//       return res
//         .status(404)
//         .json({ status: 404, message: "Customer not found" });
//     }

//     res.json(customer);
//   } catch (error) {
//     res.status(500).json({ status: 500, message: error.message });
//   }
// });

// // create new customer
// router.post("/", authenticate, async (req, res) => {
//   const { name, username, adminId, staffId } = req.body;

//   try {
//     const newCustomer = await prisma.customer.create({
//       data: {
//         name: name,
//         username: username,
//         adminId: adminId,
//         staffId: staffId,
//       },
//     });

//     if (!newCustomer) {
//       return res
//         .status(400)
//         .json({ status: 400, message: "Customer was not created!" });
//     }

//     res
//       .status(200)
//       .json({ status: 200, message: "Customer created successfully" });
//   } catch (error) {
//     res.status(500).json({ status: 500, message: error.message });
//   }
// });

// // update customer 
// router.put("/:id", authenticate, async (req, res) => {
//   const { id } = req.params;
//   const { name, username, adminId, staffId } = req.body;

//   try {
//     const updatedCustomer = await prisma.customer.update({
//       where: {
//         id: Number(id),
//       },
//       data: {
//         name: name,
//         username: username,
//         adminId: adminId,
//         staffId: staffId,
//       },
//     });

//     if (!updatedCustomer) {
//       return res
//         .status(400)
//         .json({ status: 400, message: "Customer was not updated!" });
//     }

//     res
//       .status(200)
//       .json({ status: 200, message: "Customer updated successfully" });
//   } catch (error) {
//     res.status(500).json({ status: 500, message: error.message });
//   }
// });

// // delete customer
// router.delete("/:id", authenticate, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedCustomer = await prisma.customer.delete({
//       where: {
//         id: Number(id),
//       },
//     });

//     if (!deletedCustomer) {
//       return res
//         .status(400)
//         .json({ status: 400, message: "Customer was not deleted!" });
//     }

//     res
//       .status(200)
//       .json({ status: 200, message: "Customer deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ status: 500, message: error.message });
//   }
// });

// export default router;

