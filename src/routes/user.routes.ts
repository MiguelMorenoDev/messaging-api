import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateSchema } from '../middlewares/validate.middleware';
import { paramsIdSchema } from '../validations/user.validation';

const userRouter = Router();
const userController = new UserController();

// Ruta para traer todos
userRouter.get('/', (req, res) => userController.getAll(req, res));

// Ruta para traer uno por ID (Aquí aplicas el schema)
userRouter.get('/:id', validateSchema(paramsIdSchema), (req, res) => userController.getOne(req, res));

export default userRouter;