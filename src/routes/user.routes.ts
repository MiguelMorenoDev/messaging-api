import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateSchema } from '../middlewares/validate.middleware';
import { paramsIdSchema } from '../validations/user.validation';
import { authMiddleware } from '../middlewares/auth.middleware';

const userRouter = Router();
const userController = new UserController();

// Ruta para traer todos
userRouter.get('/',
    authMiddleware,
     (req, res) => userController.getAll(req, res));

// Ruta para traer uno por ID y aplicamos el schema
userRouter.get('/:id',
    authMiddleware,
    validateSchema(paramsIdSchema), (req, res) => userController.getOne(req, res));

export default userRouter;