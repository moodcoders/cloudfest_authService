import { Router, Request, Response, NextFunction } from 'express';

import passport from 'passport';
import { ErrorCode, HandyManError } from '../utils/error';
import logger from '../utils/logger';
import { generateOTPController } from './../controllers/otp-controller';
import { validateOtpSchema } from '../joi-schemas/requestSchema';

const OTPRouter: Router = Router();

OTPRouter.post('/generate-otp', generateOTPController);

OTPRouter.post('/userlogin', passport.authenticate('userOtp', { session: false, failWithError: true }),
    async (req: Request, res: Response, next: NextFunction) => {
        const request = await validateOtpSchema.validateAsync(req.body)
        return res.json({ user: request.user })
    },
    async (error: any, req: Request, res: Response, next: NextFunction) => {
        const request = await validateOtpSchema.validateAsync(req.body)
        logger.error(error.message);
        if (error instanceof HandyManError && error.code === ErrorCode.BAD_DATA) {
            res.status(400).json({ message: error.message });
            return;
        } else if (error.isJoi === true) {
            res.status(400).send(error.message)
            return;
        };
        res.status(500).json({
            message: 'Server Error'     //TODO: Write a method to process all errors
        })
        res.send(request.user);
    }
);

OTPRouter.post('/handymanlogin', passport.authenticate('handymanOtp', { session: false, failWithError: true }),
    async (req: Request, res: Response, next: NextFunction) => {
        return res.json({ user: req.user })
    },
    async (error: any, req: Request, res: Response, next: NextFunction) => {
        logger.error(error.message);
        if (error instanceof HandyManError && error.code === ErrorCode.BAD_DATA) {
            res.status(400).json({ message: error.message });
            return;
        } else {
            res.status(500).json({
                message: 'Server Error'     //TODO: Write a method to process all errors
            });
        }
        res.send(req.user);
    }
);

export default OTPRouter;