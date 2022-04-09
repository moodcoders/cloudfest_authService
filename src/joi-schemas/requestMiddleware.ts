import { NextFunction, Request, Response } from 'express';

import { customerUpdateSchema, handymanUpdateSchema } from './requestSchema';
import { validateOtpSchema } from './requestSchema';
import { generateOtpSchema } from './requestSchema';


export const requestSchemaCheck = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        await customerUpdateSchema.validateAsync(req.body);
        next();
    }
    catch (error: any) {
        if (error.isJoi === true) {
            res.status(400).send(error.message);
            return ;
        }
        else {
            res.send(error);
        }
    }
};

export const requestSchemaOTP = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        await validateOtpSchema.validateAsync(req.body);
        next();
    }
    catch (error: any) {
        if (error.isJoi === true) {
            res.status(400).send(error.message);
            return ;
        }
        else {
            res.send(error);
        }
    }
};

export const generateOTPSchema = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        await generateOtpSchema.validateAsync(req.body);
        next();
    }
    catch (error: any) {
        if (error.isJoi === true) {
            res.status(400).send(error.message);
            return ;
        }
        else {
            res.send(error);
        }
    }
};

