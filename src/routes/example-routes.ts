import { Router, Request, Response } from 'express';
import path from 'path'

const exampleRouter: Router = Router();

exampleRouter.get('/login', (req: Request, res: Response) => {
    res.render(path.join(__dirname+ '/../views/pages/login.ejs'))
})

export default exampleRouter;