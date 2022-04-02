import { Request, Response } from 'express';
import OTPUtils from './../utils/otp-utils';

export const generateOTPController = async (req: Request, res: Response) => {
    try {
        const { mobileNumber } = req.body;
        const message = await OTPUtils.generateAndSendOtp(mobileNumber)
        res.json({
            status: "SUCCESS",
            message: message
        });
    } catch (error: any) {
        res.status(500).json({
            status: "FAIL",
            message: error.message
        })
    }
};