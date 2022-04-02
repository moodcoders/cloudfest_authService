/**
 * Schema for document represeting an otp used in mobile verification
 */
import { model, Schema } from 'mongoose';

const OtpSchema = new Schema({
    mobileNumber: {
        type: String,
        required: true,
    },
    OTPValue:{
        type: String,
        required: true
    }
},{
    timestamps: true,
});

// This will ensure that Opt are auto deleted after 5 minutes
OtpSchema.index({ createdAt:1 }, { expireAfterSeconds: 300 });

export default model('otp', OtpSchema)