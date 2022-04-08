import { Request, Response } from 'express';
import customer from '../models/users';
import handyman from '../models/handyman';
import { customerUpdateSchema, handymanUpdateSchema } from '../joi-schemas/requestSchema';

export const updateCustomer = async (req: Request, res: Response) => {
    try {
        const request = await customerUpdateSchema.validateAsync(req.body)
        console.log(request.filter)
        const update = await customer.findOneAndUpdate(request.filter, request.update)
        res.json(update)
    } catch (error: any) {
        if (error.isJoi === true) {
            res.status(400).send(error.message)
            return
        }
        else res.sendStatus(400)
    }
};

export const updateHandyman = async (req: Request, res: Response) => {
    try {
        const request = await handymanUpdateSchema.validateAsync(req.body)
        const update = await handyman.findOneAndUpdate(request.filter, request.update) //TODO: change the model from customer to handyman
        res.json(update)
    } catch (error: any) {
        if (error.isJoi === true) {
            res.status(400).send(error.message)
            return 
        }
        res.sendStatus(400)
    }
};