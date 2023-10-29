import express, { json } from "express";

import adminsRouter from "./admin.js";
import customersRouter from "./customers.js";
import booksRouter from "./books.js";


const server = express();
server.use(json());

server.use("/api/admin", adminsRouter);
server.use("/api/customers", customersRouter);
server.use("/api/book", booksRouter);

export default server;

