import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { generateOTPController } from './../controllers/otp-controller';

const OTPRouter: Router = Router();

OTPRouter.post('/generate-otp', generateOTPController);

OTPRouter.get('/login', passport.authenticate('otp', { session: false, failWithError: true }),
    async (req: Request, res: Response, next: NextFunction) => {
        return res.json({ user: req.user })
    },
    async (error: any, req: Request, res: Response, next: NextFunction) => {
        console.error(error);
        if (error) {
            res.json({ message: error.message });
            return;
        }
        res.send(req.user);
    }
);

export default OTPRouter;