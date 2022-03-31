import { Strategy } from 'passport-local';
import otpModel from '../models/otp';
import user from '../models/users';
import { sign } from 'jsonwebtoken';

var OtpStrategy = new Strategy(async function verify(mobile, otp, cb) {
    try {
        // Get the otp from OTPs collection
        const OTPdata = await otpModel.findOne({ mobileNumber: mobile });
        // Throw is you cant find the entry in OTPs collections
        // Either the TTL has expired or the client sent wrong details
        if (OTPdata === null) {
            throw new Error("Invalid mobile number.");
        } else if (OTPdata.OTPValue !== otp) {
            throw new Error("Wrong OTP.");
        }
        // Find if the user already exists
        const foundUser = await user.findOne({
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
        if( foundUser !== null) {
            const jwt = sign(foundUser, "SuperSecretKey", {algorithm: "HS256", expiresIn: "4d"});
            return cb(null, {foundUser, jwt});
        }
    } catch (error) {
        console.log(error);
    }
});

export default OtpStrategy;