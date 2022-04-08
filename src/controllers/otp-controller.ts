import { Request, Response } from 'express';

import { generateOtpSchema } from '../joi-schemas/requestSchema';
import OTPUtils from './../utils/otp-utils';

export const generateOTPController = async (req: Request, res: Response) => {
    try {
        const request = await generateOtpSchema.validateAsync(req.body)
        const { mobileNumber } = request;
        const message = await OTPUtils.generateAndSendOtp(mobileNumber)
        res.json({
            status: "SUCCESS",
            message: message
        });
    } catch (error: any) {
        if (error.isJoi === true) {
            res.status(400).send(error.message)
            return
        }
        res.status(500).json({
            status: "FAIL",
            message: error.message
        })
    }
};