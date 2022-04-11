import { Request, Response } from 'express';
import handyman from '../models/handyman';


export const verifyHandyman = async (req: Request, res: Response) => {
    try {
        const verified = await handyman.findByIdAndUpdate(req.query.id, req.body); //TODO: change the model from customer to handyman
        res.send(`handyman verified status changed to ${req.body.isVerified}`);
    } catch (error: any) {
        res.sendStatus(400);
    }
};