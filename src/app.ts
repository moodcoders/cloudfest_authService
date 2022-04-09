import express, { Express } from 'express';
import passport from 'passport';
import morgan from 'morgan';

import googleRoutes from './routes/google-routes';
import exampleRoutes from './routes/example-routes';
import OTPRoutes from './routes/otp-routes';
import { customerRouter, handymanRouter } from './routes/profile-routes';
import googleStrategy from './strategies/google';
import { UserOtpStrategy, HandymanOtpStrategy } from './strategies/otp';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/handyman-spec.json';
import logger from './utils/logger';

const app: Express = express();

passport.use('google', googleStrategy);
passport.use('userOtp', UserOtpStrategy)
passport.use('handymanOtp', HandymanOtpStrategy)


if (process.env.NODE_ENV === 'development') {
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerDocument, {
        explorer: true,
    }));
    app.set('view engine', 'ejs');
    app.use('/static', exampleRoutes);
}

app.use(express.json());
app.use(morgan('dev'));

app.use('/auth/customer', customerRouter);
app.use('/auth/google',  googleRoutes);
app.use('/auth/userOtp/', OTPRoutes);
app.use('/auth/handyman', handymanRouter);
app.use('/auth/handymanOtp/', OTPRoutes);

export default async () => {
    try {
        app.listen(4000, () => {
            logger.info('Application listening on http://localhost:4000')
        });
    } catch (error) {
        logger.error('An error occured while starting the server');
        throw new Error('An error occured while starting the server');
    }
};