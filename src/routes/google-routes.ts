import { Router, Request, Response } from 'express';
import passport from 'passport'

const googleAuthRouter: Router = Router();

googleAuthRouter.get('/login', passport.authenticate('google', { scope: ['email', 'profile'], session: false }) );

googleAuthRouter.get('/callback', passport.authenticate('google', {failureRedirect: '/auth/google/login',  session: false}),
    async (req: Request, res: Response) => {
        const user: any = req.user;
        if(process.env.NODE_ENV === 'development') {
            res.redirect(`exp://192.168.1.12:19000/--/OauthVerification?token=${user.token}`);
        } else {
            res.redirect(`myapp:///OauthVerification?token=${user.token}`);
        }
    }
);

export default googleAuthRouter;