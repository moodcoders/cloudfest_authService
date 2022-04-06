import { Strategy } from 'passport-local';
import otpModel from '../models/otp';
import userModel from '../models/users';
import handymanModel from '../models/handyman'
import { sign } from 'jsonwebtoken';
import logger from '../utils/logger';
import { ErrorCode, HandyManError } from '../utils/error';

const UserOtpStrategy = new Strategy(async function verify(mobile, otp, cb) {
    console.log('user verified')

    try {
        // Get the otp from OTPs collection
        const OTPdata = await otpModel.findOne({ mobileNumber: mobile });

        // Throw error if you cant find the entry in OTPs collections
        // Either the TTL has expired or the client sent wrong details
        if (OTPdata === null) {
            throw new HandyManError(ErrorCode.BAD_DATA, `Invalid mobile number ${mobile}`);
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
                    name: "MOBILE",
                    uid: mobile
                }
            ]
        });

        const savedUser = await newUser.save();
        if (savedUser !== null) {
            const jwt = sign(savedUser.toObject(), "SuperSecretKey", { algorithm: "HS256", expiresIn: "4d" });
            return cb(null, { user: savedUser.toObject(), token: jwt });
        }
    } catch (error: any) {
        logger.error(error.stack);
        cb(error, null);
    }
});

const HandymanOtpStrategy = new Strategy(async function verify(mobile, otp, cb) {
    console.log('handyman verified')

    try {
        //Get the otp from OTP collection
        const OTPdata = await otpModel.findOne({ mobileNumber: mobile });

        // Throw error if you cant find the entry in OTPs collections
        // Either the TTL has expired or the client sent wrong details
        if (OTPdata === null) {
            throw new HandyManError(ErrorCode.BAD_DATA, `Invalid mobile number ${mobile}`);
        } else if (OTPdata.OTPValue !== otp) {
            throw new Error("Wrong OTP.");
        }

        //find if the handyman already exist
        const foundHandyman = await handymanModel.findOne({
            providers: {
                '$elemMatch': {
                    provider: "MOBILE",
                    uid: mobile
                }
            }
        }, {
            providers: 0
        }).lean();

        //If the handyman already exist, issue a token to the handyman
        if (foundHandyman !== null) {
            const jwt = sign(foundHandyman, "SuperSecretKey", { algorithm: "HS256", expiresIn: "4d" });
            return cb(null, { handyman: foundHandyman, token: jwt });
        }

        //If the handyman doesn't exist, create a new handyman
        const newHandyman = new handymanModel({
            providers: [
                {
                    name: "MOBILE",
                    uid: mobile
                }
            ]
        });

        const savedHandyman = await newHandyman.save();
        if (savedHandyman !== null) {
            const jwt = sign(savedHandyman.toObject(), "SuperSecretKey", { algorithm: "HS256", expiresIn: "4d" });
            return cb(null, { handyman: savedHandyman.toObject(), token: jwt });
        }

    } catch (error: any) {
        logger.error(error.stack);
        cb(error, null);
    }
})

export { UserOtpStrategy, HandymanOtpStrategy };