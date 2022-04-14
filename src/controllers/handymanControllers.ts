import { Request, Response } from 'express';
import handyman from '../models/handyman';
import logger from '../utils/logger';


export const verifyHandyman = async (req: Request, res: Response) => {
    try {
        const verified = await handyman.findByIdAndUpdate(req.query.id, req.body);
        res.send({
            message: `handyman verified status changed to ${req.body.isVerified}`
        });
    } catch (error: any) {
        logger.error(error);
        res.status(400).send({
            message: error.message
        })
    }
};