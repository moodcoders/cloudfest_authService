import passport from 'passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import UserModel from '../models/users';

const verify = async (accessToken:string, refreshToken: string, profile: Profile, cb: VerifyCallback): Promise<void> => {

    try {
        const user = await UserModel.findOne({
            'providers.name': profile.provider.toUpperCase(),
            'providers.uid': profile.id
        });

        if (user === null) {
            const newUser = new UserModel({
                name: profile.displayName,
                email: profile.emails ? profile.emails[0].value : '',
                providers: [{
                    name: profile.provider.toUpperCase(),
                    uid: profile.id,
                }]
            })
            const savedUser = await newUser.save();
            cb(null, savedUser);
        } else {
            //the user already exists in db
            cb(null, user);
        }
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