import { Router, Request, Response } from 'express';
import passport from 'passport'

const googleAuthRouter: Router = Router();

googleAuthRouter.get('/login', passport.authenticate('google', { scope: 'openid', session: false }) );

googleAuthRouter.get('/callback', passport.authenticate('google', {failureRedirect: '/auth/google/login',  session: false}),
    async (req: Request, res: Response) => {
        res.send(req.user)
    }
);

export default googleAuthRouter;