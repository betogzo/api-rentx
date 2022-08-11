import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import createConnection from '../typeorm';
import '../../container';
import { router } from './routes';
import { AppError } from '../../errors/AppError';

createConnection();
const app = express();
const port: number = 3333;

app.use(express.json());

app.use(router);

//error middleware
app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ): Response => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ error: error.message });
    } else {
      return response.status(500).json({ error: 'Internal Error' });
    }
  }
);

app.listen(port, () => console.log(`Server is runing on port ${port}`));
