import express, { json } from "express";

import adminsRouter from "./admin.js";
import customersRouter from "./customers.js";
import booksRouter from "./books.js";
import borrowingsRouter from "./borrowings.js";
import transactionsRouter from "./transactions.js";
import latechargesRouter from "./lateCharge.js";
import paidchargesRouter from "./paidCharge.js";

const server = express();
server.use(json());

// endpoints
server.use("/api/admin", adminsRouter);
server.use("/api/customers", customersRouter);
server.use("/api/books", booksRouter);
server.use("/api/borrowings", borrowingsRouter);
server.use("/api/transactions", transactionsRouter);
server.use("/api/latecharges", latechargesRouter);
server.use("/api/paidcharges", paidchargesRouter);




export default server;
