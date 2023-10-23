import express,  {json} from 'express';

import adminsRouter from './admin.js'

const server = express();
server.use(json());


server.use('/api/admins', adminsRouter);

export default server;