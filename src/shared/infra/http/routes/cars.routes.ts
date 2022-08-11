import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController';

const carRoutes = Router();

let createCarController = new CreateCarController();

carRoutes.post('/', createCarController.handle);

export { carRoutes };
