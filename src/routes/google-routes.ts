import { Router, Request, Response } from 'express';
import passport from 'passport'

const googleAuthRouter: Router = Router();

googleAuthRouter.get('/login', passport.authenticate('google', { scope: ['email', 'profile'], session: false }) );


googleAuthRouter.get('/callback', passport.authenticate('google', {failureRedirect: '/auth/google/login',  session: false}),
    async (req: Request, res: Response) => {
        res.redirect("handyman://192.168.1.12:19000/--/root?token=abc");
    }
);

export default googleAuthRouter;