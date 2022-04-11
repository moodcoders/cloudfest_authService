import { Router } from 'express';

import { updateCustomer, updateHandyman } from '../controllers/profile-controllers';
import { requestSchemaCheck } from '../joi-schemas/requestMiddleware';
import { verifyHandyman } from '../controllers/handymanControllers';


export const customerRouter: Router = Router();
customerRouter.patch('/update', updateCustomer);

export const handymanRouter: Router = Router();
handymanRouter.patch('/update',requestSchemaCheck, updateHandyman);
handymanRouter.patch('/verify', verifyHandyman);
