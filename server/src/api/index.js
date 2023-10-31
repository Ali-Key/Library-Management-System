import express, { json } from "express";

import adminsRouter from "./admin.js";
import customersRouter from "./customers.js";
import booksRouter from "./books.js";
import borrowingsRouter from "./borrowings.js";
import transactionsRouter from "./transactions.js";

const server = express();
server.use(json());

server.use("/api/admin", adminsRouter);
server.use("/api/customers", customersRouter);
server.use("/api/books", booksRouter);
server.use("/api/borrowings", borrowingsRouter);
server.use("/api/transactions", transactionsRouter);



export default server;
