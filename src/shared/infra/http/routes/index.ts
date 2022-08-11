import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { authenticateRoutes } from './authenticate.routes';
import { usersRouter } from './users.routes';
import { carRoutes } from './cars.routes';

const router = Router();

router.get('/', (req, res) =>
  res.status(200).json({ message: 'The API is running properly!' })
);
router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRouter);
router.use('/cars', carRoutes);
router.use(authenticateRoutes);

export { router };
