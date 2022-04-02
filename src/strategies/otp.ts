import { Strategy } from 'passport-local';
import otpModel from '../models/otp';
import userModel from '../models/users';
import { sign } from 'jsonwebtoken';
import logger from '../utils/logger';
import { ErrorCode, HandyManError } from '../utils/error';

var OtpStrategy = new Strategy(async function verify(mobile, otp, cb) {
    try {
        // Get the otp from OTPs collection
        const OTPdata = await otpModel.findOne({ mobileNumber: mobile });

        // Throw is you cant find the entry in OTPs collections
        // Either the TTL has expired or the client sent wrong details
        if (OTPdata === null) {
            throw new HandyManError( ErrorCode.BAD_DATA,`Invalid mobile number ${mobile}` );
        } else if (OTPdata.OTPValue !== otp) {
            throw new Error("Wrong OTP.");
        }

        // Find if the user already exists
        const foundUser = await userModel.findOne({
            providers: {
                '$elemMatch': {
                    provider: "MOBILE",
                    uid: mobile
                }
            }
        }, {
            providers: 0
        }).lean();

        // If the user already exists, issue a token to user
        if (foundUser !== null) {
            const jwt = sign(foundUser, "SuperSecretKey", { algorithm: "HS256", expiresIn: "4d" });
            return cb(null, { user: foundUser, token: jwt });
        }

        //If the user doesn't exist, create a new user
        const newUser = new userModel({
            providers: [
                {
                    provider: "MOBILE",
                    uid: mobile
                }
            ]
        });

        const savedUser = await newUser.save();
        if (savedUser !== null) {
            const jwt = sign(savedUser.lean(), "SuperSecretKey", { algorithm: "HS256", expiresIn: "4d" });
            return cb(null, { user: savedUser.lean(), token: jwt });
        }
    } catch (error: any) {
        logger.error(error);
        cb(error, null);
    }
});

export default OtpStrategy;