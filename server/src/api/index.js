import express,  {json} from 'express';

import adminsRouter from './admin.js'
import booksRouter from './books.js'
const server = express();
server.use(json());


server.use('/api/admins', adminsRouter);
server.use('/api/books', booksRouter);

export default server;