import { Router } from 'express';
import { updateCustomer, updateHandyman } from '../controllers/profile-controllers';

export const customerRouter: Router = Router();
customerRouter.patch('/update', updateCustomer);

export const handymanRouter: Router = Router();
handymanRouter.patch('/update', updateHandyman);
