import { Request, Response } from 'express';
import customer from '../models/users';
import handyman from '../models/handyman';

export const updateCustomer = async (req: Request, res: Response, ) => {
    try {
        console.log(req.body.filter);
        const update = await customer.findOneAndUpdate(req.body.filter, req.body.update);
        res.json(update);
    } catch (error: any) {
         res.sendStatus(400);
    }
};

export const updateHandyman = async (req: Request, res: Response) => {
    try {
        const update = await handyman.findOneAndUpdate(req.body.filter, req.body.update); //TODO: change the model from customer to handyman
        res.json(update);
    } catch (error: any) {
        res.sendStatus(400);
    }
};