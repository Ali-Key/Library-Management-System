import express, { json } from "express";

import adminsRouter from "./admin.js";
import staffsRouter from "./staff.js"; 
// import customersRouter from "./customers.js";
import booksRouter from "./books.js";


const server = express();
server.use(json());

server.use("/api/admins", adminsRouter);
server.use("/api/staffs", staffsRouter);
// server.use("/api/customers", customersRouter);
server.use("/api/books", booksRouter);

export default server;

