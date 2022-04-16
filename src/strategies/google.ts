import { sign } from 'jsonwebtoken';
import passport from 'passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import userModel from '../models/users';

const verify = async (accessToken:string, refreshToken: string, profile: Profile, cb: VerifyCallback): Promise<void> => {

    try {
        const foundUser = await userModel.findOne({
            providers: {
                '$elemMatch': {
                    provider: "MOBILE",
                    uid: profile.id
                }
            }
        }, {
            providers: 0
        }).lean();

        if (foundUser === null) {
            const newUser = new userModel({
                name: profile.displayName,
                email: profile.emails ? profile.emails[0].value : '',
                providers: [{
                    name: profile.provider.toUpperCase(),
                    uid: profile.id,
                }]
            })
            const savedUser = await newUser.save();
            const jwt = sign(savedUser.toObject(), "SuperSecretKey", { algorithm: "HS256", expiresIn: "4d" });
            return cb(null, { user: savedUser.toObject(), token: jwt });
        } else {
            //the user already exists in db
            const jwt = sign(foundUser, "SuperSecretKey", { algorithm: "HS256", expiresIn: "4d" });
            return cb(null, { user: foundUser, token: jwt });        }
    } catch (error: any) {
        console.log(error)
        cb(error)
    }
}

const googleStrategy: Strategy = new Strategy(
    {
        clientID: '363336576338-cdn32827l9fthvubbhpenn98eb649lsd.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://192.168.1.12.xip.io:4000/auth/google/callback'
    },
    verify
);

export default googleStrategy;